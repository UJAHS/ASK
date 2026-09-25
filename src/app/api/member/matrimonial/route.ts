import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import {
  ContactPreference,
  MaritalStatus,
  MatrimonialGender,
  ProfileVisibility,
} from "@prisma/client";

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

function optionalString(value: unknown): string | null {
  if (typeof value !== "string") {
    return null;
  }

  const trimmed = value.trim();

  return trimmed || null;
}

export async function POST(req: Request) {
  try {
    const session = await auth();

    if (!session?.user?.email) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const user = await prisma.user.findUnique({
      where: {
        email: session.user.email,
      },
      select: {
        id: true,
        role: true,
        status: true,
      },
    });

    if (!user) {
      return NextResponse.json(
        { error: "User not found" },
        { status: 404 }
      );
    }

    if (user.role !== "MEMBER") {
      return NextResponse.json(
        {
          error:
            "Only members can create a matrimonial profile",
        },
        { status: 403 }
      );
    }

    if (user.status !== "APPROVED") {
      return NextResponse.json(
        {
          error:
            "Your membership must be approved first",
        },
        { status: 403 }
      );
    }

    const existingProfile =
      await prisma.matrimonialProfile.findUnique({
        where: {
          userId: user.id,
        },
        select: {
          id: true,
        },
      });

    if (existingProfile) {
      return NextResponse.json(
        {
          error:
            "You already have a matrimonial profile",
        },
        { status: 409 }
      );
    }

    const body = await req.json();

    if (
      !body ||
      typeof body !== "object" ||
      Array.isArray(body)
    ) {
      return NextResponse.json(
        { error: "Invalid request body" },
        { status: 400 }
      );
    }

    const firstName =
      typeof body.firstName === "string"
        ? body.firstName.trim()
        : "";

    const lastName =
      typeof body.lastName === "string"
        ? body.lastName.trim()
        : "";

    const gender = body.gender;

    if (!firstName || !gender) {
      return NextResponse.json(
        {
          error:
            "First name and gender are required",
        },
        { status: 400 }
      );
    }

    if (!isMatrimonialGender(gender)) {
      return NextResponse.json(
        { error: "Invalid gender" },
        { status: 400 }
      );
    }

    let dateOfBirth: Date | null = null;

    if (
      body.dateOfBirth !== undefined &&
      body.dateOfBirth !== null &&
      body.dateOfBirth !== ""
    ) {
      if (typeof body.dateOfBirth !== "string") {
        return NextResponse.json(
          { error: "Invalid date of birth" },
          { status: 400 }
        );
      }

      const parsedDate = new Date(
        body.dateOfBirth
      );

      if (Number.isNaN(parsedDate.getTime())) {
        return NextResponse.json(
          { error: "Invalid date of birth" },
          { status: 400 }
        );
      }

      dateOfBirth = parsedDate;
    }

    const maritalStatus =
      body.maritalStatus === undefined ||
      body.maritalStatus === null ||
      body.maritalStatus === ""
        ? MaritalStatus.NEVER_MARRIED
        : body.maritalStatus;

    if (!isMaritalStatus(maritalStatus)) {
      return NextResponse.json(
        { error: "Invalid marital status" },
        { status: 400 }
      );
    }

    const contactPreference =
      body.contactPreference === undefined ||
      body.contactPreference === null ||
      body.contactPreference === ""
        ? ContactPreference.ADMIN_ONLY
        : body.contactPreference;

    if (!isContactPreference(contactPreference)) {
      return NextResponse.json(
        { error: "Invalid contact preference" },
        { status: 400 }
      );
    }

    const profileVisibility =
      body.profileVisibility === undefined ||
      body.profileVisibility === null ||
      body.profileVisibility === ""
        ? ProfileVisibility.PRIVATE
        : body.profileVisibility;

    if (!isProfileVisibility(profileVisibility)) {
      return NextResponse.json(
        { error: "Invalid profile visibility" },
        { status: 400 }
      );
    }

    const profile =
      await prisma.matrimonialProfile.create({
        data: {
          userId: user.id,

          firstName,
          lastName: lastName || null,
          gender,

          dateOfBirth,

          height: optionalString(body.height),

          maritalStatus,

          education: optionalString(body.education),
          profession: optionalString(body.profession),
          occupation: optionalString(body.occupation),
          company: optionalString(body.company),

          city: optionalString(body.city),
          state: optionalString(body.state),
          country:
            optionalString(body.country) || "India",
          pincode: optionalString(body.pincode),

          religion: optionalString(body.religion),
          community: optionalString(body.community),
          subCommunity:
            optionalString(body.subCommunity),
          gotra: optionalString(body.gotra),

          familyDetails:
            optionalString(body.familyDetails),
          fatherName:
            optionalString(body.fatherName),
          motherName:
            optionalString(body.motherName),
          siblings:
            optionalString(body.siblings),

          aboutMe: optionalString(body.aboutMe),
          partnerExpectation:
            optionalString(
              body.partnerExpectation
            ),

          profileImage:
            optionalString(body.profileImage),

          contactPreference,
          profileVisibility,

          status: "PENDING",
        },
      });

    return NextResponse.json(
      {
        success: true,
        profile: {
          id: profile.id,
          status: profile.status,
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error(
      "Member matrimonial create error:",
      error
    );

    return NextResponse.json(
      {
        error:
          "Failed to create matrimonial profile",
      },
      { status: 500 }
    );
  }
}