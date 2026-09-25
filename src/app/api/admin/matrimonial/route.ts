import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
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

function isAdminSession(session: {
  user?: { role?: string | null } | null;
}) {
  const role = String(session.user?.role || "");

  return role === "ADMIN" || role === "SUPER_ADMIN";
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
  return typeof value === "string" ? value.trim() : "";
}

export async function GET(request: Request) {
  try {
    const session = await auth();

    if (!session?.user || !isAdminSession(session)) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const { searchParams } = new URL(request.url);

    const search =
      searchParams.get("search")?.trim() || "";

    const gender =
      searchParams.get("gender")?.trim() || "";

    const maritalStatus =
      searchParams.get("maritalStatus")?.trim() || "";

    const status =
      searchParams.get("status")?.trim() || "";

    const where: {
      gender?: MatrimonialGender;
      maritalStatus?: MaritalStatus;
      status?: MatrimonialStatus;
      OR?: Array<Record<string, unknown>>;
    } = {};

    if (gender) {
      if (!isMatrimonialGender(gender)) {
        return NextResponse.json(
          { error: "Invalid gender" },
          { status: 400 }
        );
      }

      where.gender = gender;
    }

    if (maritalStatus) {
      if (!isMaritalStatus(maritalStatus)) {
        return NextResponse.json(
          { error: "Invalid marital status" },
          { status: 400 }
        );
      }

      where.maritalStatus = maritalStatus;
    }

    if (status) {
      if (!isProfileStatus(status)) {
        return NextResponse.json(
          { error: "Invalid profile status" },
          { status: 400 }
        );
      }

      where.status = status;
    }

    if (search) {
      where.OR = [
        {
          firstName: {
            contains: search,
            mode: "insensitive",
          },
        },
        {
          lastName: {
            contains: search,
            mode: "insensitive",
          },
        },
        {
          city: {
            contains: search,
            mode: "insensitive",
          },
        },
        {
          state: {
            contains: search,
            mode: "insensitive",
          },
        },
        {
          profession: {
            contains: search,
            mode: "insensitive",
          },
        },
        {
          user: {
            email: {
              contains: search,
              mode: "insensitive",
            },
          },
        },
      ];
    }

    const profiles =
      await prisma.matrimonialProfile.findMany({
        where,
        include: {
          user: {
            select: {
              id: true,
              email: true,
              memberNumber: true,
              status: true,
            },
          },
        },
        orderBy: {
          createdAt: "desc",
        },
      });

    return NextResponse.json(profiles);
  } catch (error) {
    console.error("Matrimonial GET error:", error);

    return NextResponse.json(
      {
        error:
          "Failed to fetch matrimonial profiles",
      },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const session = await auth();

    if (!session?.user || !isAdminSession(session)) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const body = await request.json();

    const userId = requiredString(body?.userId);
    const firstName = requiredString(body?.firstName);
    const lastName = optionalString(body?.lastName);
    const genderValue = body?.gender;

    if (!userId || !firstName || !genderValue) {
      return NextResponse.json(
        {
          error:
            "userId, firstName and gender are required",
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

    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
      select: {
        id: true,
      },
    });

    if (!user) {
      return NextResponse.json(
        { error: "Member not found" },
        { status: 404 }
      );
    }

    const existing =
      await prisma.matrimonialProfile.findUnique({
        where: {
          userId,
        },
      });

    if (existing) {
      return NextResponse.json(
        {
          error:
            "A matrimonial profile already exists for this member",
        },
        { status: 409 }
      );
    }

    let parsedDateOfBirth: Date | null = null;

    if (body?.dateOfBirth) {
      const date = new Date(body.dateOfBirth);

      if (Number.isNaN(date.getTime())) {
        return NextResponse.json(
          { error: "Invalid date of birth" },
          { status: 400 }
        );
      }

      parsedDateOfBirth = date;
    }

    const maritalStatusValue =
      body?.maritalStatus || "NEVER_MARRIED";

    if (!isMaritalStatus(maritalStatusValue)) {
      return NextResponse.json(
        { error: "Invalid marital status" },
        { status: 400 }
      );
    }

    const contactPreferenceValue =
      body?.contactPreference || "ADMIN_ONLY";

    if (!isContactPreference(contactPreferenceValue)) {
      return NextResponse.json(
        { error: "Invalid contact preference" },
        { status: 400 }
      );
    }

    const profileStatusValue =
      body?.status || "PENDING";

    if (!isProfileStatus(profileStatusValue)) {
      return NextResponse.json(
        { error: "Invalid profile status" },
        { status: 400 }
      );
    }

    const profileVisibilityValue =
      body?.profileVisibility || "PRIVATE";

    if (!isProfileVisibility(profileVisibilityValue)) {
      return NextResponse.json(
        { error: "Invalid profile visibility" },
        { status: 400 }
      );
    }

    const profile =
      await prisma.matrimonialProfile.create({
        data: {
          userId,
          firstName,
          lastName,
          gender: genderValue,
          dateOfBirth: parsedDateOfBirth,
          height: optionalString(body?.height),
          maritalStatus: maritalStatusValue,
          education: optionalString(body?.education),
          profession: optionalString(body?.profession),
          occupation: optionalString(body?.occupation),
          company: optionalString(body?.company),
          city: optionalString(body?.city),
          state: optionalString(body?.state),
          country:
            optionalString(body?.country) || "India",
          pincode: optionalString(body?.pincode),
          religion: optionalString(body?.religion),
          community: optionalString(body?.community),
          subCommunity: optionalString(
            body?.subCommunity
          ),
          gotra: optionalString(body?.gotra),
          familyDetails: optionalString(
            body?.familyDetails
          ),
          fatherName: optionalString(
            body?.fatherName
          ),
          motherName: optionalString(
            body?.motherName
          ),
          siblings: optionalString(body?.siblings),
          aboutMe: optionalString(body?.aboutMe),
          partnerExpectation: optionalString(
            body?.partnerExpectation
          ),
          profileImage: optionalString(
            body?.profileImage
          ),
          contactPreference:
            contactPreferenceValue,
          status: profileStatusValue,
          profileVisibility:
            profileVisibilityValue,
        },
      });

    return NextResponse.json(profile, {
      status: 201,
    });
  } catch (error) {
    console.error("Matrimonial POST error:", error);

    return NextResponse.json(
      {
        error:
          "Failed to create matrimonial profile",
      },
      { status: 500 }
    );
  }
}