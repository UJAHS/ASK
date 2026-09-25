import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";
import {
  ContactPreference,
  MaritalStatus,
  MatrimonialGender,
  ProfileVisibility,
} from "@prisma/client";

type MatrimonialStatus =
  | "PENDING"
  | "APPROVED"
  | "REJECTED"
  | "BLOCKED";

async function checkAdmin() {
  const session = await auth();

  const role = String(session?.user?.role || "");

  if (
    !session?.user ||
    (role !== "ADMIN" && role !== "SUPER_ADMIN")
  ) {
    return null;
  }

  return session;
}

function isMatrimonialGender(
  value: unknown
): value is MatrimonialGender {
  return (
    typeof value === "string" &&
    Object.values(MatrimonialGender).includes(
      value as MatrimonialGender
    )
  );
}

function isMaritalStatus(
  value: unknown
): value is MaritalStatus {
  return (
    typeof value === "string" &&
    Object.values(MaritalStatus).includes(
      value as MaritalStatus
    )
  );
}

function isContactPreference(
  value: unknown
): value is ContactPreference {
  return (
    typeof value === "string" &&
    Object.values(ContactPreference).includes(
      value as ContactPreference
    )
  );
}

function isProfileVisibility(
  value: unknown
): value is ProfileVisibility {
  return (
    typeof value === "string" &&
    Object.values(ProfileVisibility).includes(
      value as ProfileVisibility
    )
  );
}

function isProfileStatus(
  value: unknown
): value is MatrimonialStatus {
  return (
    value === "PENDING" ||
    value === "APPROVED" ||
    value === "REJECTED" ||
    value === "BLOCKED"
  );
}

function optionalString(value: unknown): string | null {
  if (typeof value !== "string") {
    return null;
  }

  const trimmed = value.trim();

  return trimmed || null;
}

function requiredString(value: unknown): string {
  return typeof value === "string"
    ? value.trim()
    : "";
}

export async function GET(
  _request: Request,
  context: {
    params: Promise<{ id: string }>;
  }
) {
  try {
    const session = await checkAdmin();

    if (!session) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const { id } = await context.params;

    const profile =
      await prisma.matrimonialProfile.findUnique({
        where: { id },
        include: {
          user: {
            select: {
              id: true,
              email: true,
              memberNumber: true,
              status: true,
              role: true,
              createdAt: true,
            },
          },
        },
      });

    if (!profile) {
      return NextResponse.json(
        {
          error:
            "Matrimonial profile not found",
        },
        { status: 404 }
      );
    }

    return NextResponse.json(profile);
  } catch (error) {
    console.error(
      "Matrimonial GET [id] error:",
      error
    );

    return NextResponse.json(
      {
        error:
          "Failed to fetch matrimonial profile",
      },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: Request,
  context: {
    params: Promise<{ id: string }>;
  }
) {
  try {
    const session = await checkAdmin();

    if (!session) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const { id } = await context.params;
    const body = await request.json();

    const existing =
      await prisma.matrimonialProfile.findUnique({
        where: { id },
      });

    if (!existing) {
      return NextResponse.json(
        {
          error:
            "Matrimonial profile not found",
        },
        { status: 404 }
      );
    }

    const firstName = requiredString(
      body?.firstName
    );

    const genderValue = body?.gender;

    if (!firstName || !genderValue) {
      return NextResponse.json(
        {
          error:
            "firstName and gender are required",
        },
        { status: 400 }
      );
    }

    if (!isMatrimonialGender(genderValue)) {
      return NextResponse.json(
        { error: "Invalid gender" },
        { status: 400 }
      );
    }

    let parsedDateOfBirth: Date | null = null;

    if (body?.dateOfBirth) {
      const date = new Date(
        body.dateOfBirth
      );

      if (Number.isNaN(date.getTime())) {
        return NextResponse.json(
          {
            error: "Invalid date of birth",
          },
          { status: 400 }
        );
      }

      parsedDateOfBirth = date;
    }

    const maritalStatusValue =
      body?.maritalStatus ||
      "NEVER_MARRIED";

    if (
      !isMaritalStatus(
        maritalStatusValue
      )
    ) {
      return NextResponse.json(
        {
          error: "Invalid marital status",
        },
        { status: 400 }
      );
    }

    const contactPreferenceValue =
      body?.contactPreference ||
      "ADMIN_ONLY";

    if (
      !isContactPreference(
        contactPreferenceValue
      )
    ) {
      return NextResponse.json(
        {
          error:
            "Invalid contact preference",
        },
        { status: 400 }
      );
    }

    const profileStatusValue =
      body?.status || "PENDING";

    if (
      !isProfileStatus(
        profileStatusValue
      )
    ) {
      return NextResponse.json(
        {
          error: "Invalid profile status",
        },
        { status: 400 }
      );
    }

    const profileVisibilityValue =
      body?.profileVisibility ||
      "PRIVATE";

    if (
      !isProfileVisibility(
        profileVisibilityValue
      )
    ) {
      return NextResponse.json(
        {
          error:
            "Invalid profile visibility",
        },
        { status: 400 }
      );
    }

    const profile =
      await prisma.matrimonialProfile.update({
        where: { id },
        data: {
          firstName,

          lastName: optionalString(
            body?.lastName
          ),

          gender: genderValue,

          dateOfBirth:
            parsedDateOfBirth,

          height: optionalString(
            body?.height
          ),

          maritalStatus:
            maritalStatusValue,

          education: optionalString(
            body?.education
          ),

          profession: optionalString(
            body?.profession
          ),

          occupation: optionalString(
            body?.occupation
          ),

          company: optionalString(
            body?.company
          ),

          city: optionalString(
            body?.city
          ),

          state: optionalString(
            body?.state
          ),

          country:
            optionalString(
              body?.country
            ) || "India",

          pincode: optionalString(
            body?.pincode
          ),

          religion: optionalString(
            body?.religion
          ),

          community: optionalString(
            body?.community
          ),

          subCommunity:
            optionalString(
              body?.subCommunity
            ),

          gotra: optionalString(
            body?.gotra
          ),

          familyDetails:
            optionalString(
              body?.familyDetails
            ),

          fatherName: optionalString(
            body?.fatherName
          ),

          motherName: optionalString(
            body?.motherName
          ),

          siblings: optionalString(
            body?.siblings
          ),

          aboutMe: optionalString(
            body?.aboutMe
          ),

          partnerExpectation:
            optionalString(
              body?.partnerExpectation
            ),

          profileImage:
            optionalString(
              body?.profileImage
            ),

          contactPreference:
            contactPreferenceValue,

          status:
            profileStatusValue,

          profileVisibility:
            profileVisibilityValue,
        },
      });

    return NextResponse.json(profile);
  } catch (error) {
    console.error(
      "Matrimonial PUT error:",
      error
    );

    return NextResponse.json(
      {
        error:
          "Failed to update matrimonial profile",
      },
      { status: 500 }
    );
  }
}

export async function DELETE(
  _request: Request,
  context: {
    params: Promise<{ id: string }>;
  }
) {
  try {
    const session = await checkAdmin();

    if (!session) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const { id } = await context.params;

    const existing =
      await prisma.matrimonialProfile.findUnique({
        where: { id },
      });

    if (!existing) {
      return NextResponse.json(
        {
          error:
            "Matrimonial profile not found",
        },
        { status: 404 }
      );
    }

    await prisma.matrimonialProfile.delete({
      where: { id },
    });

    return NextResponse.json({
      success: true,
      message:
        "Matrimonial profile deleted",
    });
  } catch (error) {
    console.error(
      "Matrimonial DELETE error:",
      error
    );

    return NextResponse.json(
      {
        error:
          "Failed to delete matrimonial profile",
      },
      { status: 500 }
    );
  }
}