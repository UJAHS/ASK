import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

async function getCurrentMember() {
  const session = await auth();

  if (!session?.user) {
    return null;
  }

  if (String(session.user.role || "") !== "MEMBER") {
    return null;
  }

  const email = session.user.email;

  if (!email) {
    return null;
  }

  const user = await prisma.user.findUnique({
    where: {
      email,
    },
    select: {
      id: true,
      email: true,
      role: true,
      status: true,
      createdAt: true,
    },
  });

  if (!user) {
    return null;
  }

  if (
    user.role !== "MEMBER" ||
    user.status !== "APPROVED"
  ) {
    return null;
  }

  return user;
}

export async function GET() {
  try {
    const user = await getCurrentMember();

    if (!user) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const profile =
      await prisma.memberProfile.findUnique({
        where: {
          userId: user.id,
        },
      });

    return NextResponse.json({
      user: {
        id: user.id,
        email: user.email,
        status: user.status,
        createdAt: user.createdAt,
      },
      profile,
    });
  } catch (error) {
    console.error(
      "GET PROFILE ERROR:",
      error
    );

    return NextResponse.json(
      { error: "Failed to load profile" },
      { status: 500 }
    );
  }
}

export async function PUT(request: Request) {
  try {
    const user = await getCurrentMember();

    if (!user) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const body = await request.json();

    const {
      firstName,
      lastName,
      phone,
      gender,
      dateOfBirth,
      address,
      city,
      state,
      country,
      pincode,
      gotra,
      education,
      occupation,
      profession,
      profileImage,
    } = body;

    let parsedDateOfBirth: Date | null = null;

    if (dateOfBirth) {
      const date = new Date(dateOfBirth);

      if (isNaN(date.getTime())) {
        return NextResponse.json(
          { error: "Invalid date of birth" },
          { status: 400 }
        );
      }

      parsedDateOfBirth = date;
    }

    const profile =
      await prisma.memberProfile.upsert({
        where: {
          userId: user.id,
        },

        update: {
          firstName:
            typeof firstName === "string"
              ? firstName.trim() || null
              : null,

          lastName:
            typeof lastName === "string"
              ? lastName.trim() || null
              : null,

          phone:
            typeof phone === "string"
              ? phone.trim() || null
              : null,

          gender:
            typeof gender === "string"
              ? gender.trim() || null
              : null,

          dateOfBirth:
            parsedDateOfBirth,

          address:
            typeof address === "string"
              ? address.trim() || null
              : null,

          city:
            typeof city === "string"
              ? city.trim() || null
              : null,

          state:
            typeof state === "string"
              ? state.trim() || null
              : null,

          country:
            typeof country === "string"
              ? country.trim() || "India"
              : "India",

          pincode:
            typeof pincode === "string"
              ? pincode.trim() || null
              : null,

          gotra:
            typeof gotra === "string"
              ? gotra.trim() || null
              : null,

          education:
            typeof education === "string"
              ? education.trim() || null
              : null,

          occupation:
            typeof occupation === "string"
              ? occupation.trim() || null
              : null,

          profession:
            typeof profession === "string"
              ? profession.trim() || null
              : null,

          profileImage:
            typeof profileImage === "string"
              ? profileImage.trim() || null
              : null,
        },

        create: {
          userId: user.id,

          firstName:
            typeof firstName === "string"
              ? firstName.trim() || null
              : null,

          lastName:
            typeof lastName === "string"
              ? lastName.trim() || null
              : null,

          phone:
            typeof phone === "string"
              ? phone.trim() || null
              : null,

          gender:
            typeof gender === "string"
              ? gender.trim() || null
              : null,

          dateOfBirth:
            parsedDateOfBirth,

          address:
            typeof address === "string"
              ? address.trim() || null
              : null,

          city:
            typeof city === "string"
              ? city.trim() || null
              : null,

          state:
            typeof state === "string"
              ? state.trim() || null
              : null,

          country:
            typeof country === "string"
              ? country.trim() || "India"
              : "India",

          pincode:
            typeof pincode === "string"
              ? pincode.trim() || null
              : null,

          gotra:
            typeof gotra === "string"
              ? gotra.trim() || null
              : null,

          education:
            typeof education === "string"
              ? education.trim() || null
              : null,

          occupation:
            typeof occupation === "string"
              ? occupation.trim() || null
              : null,

          profession:
            typeof profession === "string"
              ? profession.trim() || null
              : null,

          profileImage:
            typeof profileImage === "string"
              ? profileImage.trim() || null
              : null,
        },
      });

    return NextResponse.json({
      success: true,
      message: "Profile updated successfully",
      profile,
    });
  } catch (error) {
    console.error(
      "UPDATE PROFILE ERROR:",
      error
    );

    return NextResponse.json(
      { error: "Failed to update profile" },
      { status: 500 }
    );
  }
}