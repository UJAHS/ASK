import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const {
      firstName,
      lastName,
      fatherFullName,
      motherFullName,
      email,
      password,
      phone,
      whatsappNumber,
      gender,
      dateOfBirth,
      address,
      city,
      state,
      country,
      pincode,
    } = body;

    const missingFields: string[] = [];

    if (!firstName) missingFields.push("First Name");
    if (!lastName) missingFields.push("Last Name");
    if (!fatherFullName) missingFields.push("Father's Full Name");
    if (!motherFullName) missingFields.push("Mother's Full Name");
    if (!email) missingFields.push("Email");
    if (!password) missingFields.push("Password");
    if (!phone) missingFields.push("Phone Number");
    if (!gender) missingFields.push("Gender");
    if (!dateOfBirth) missingFields.push("Date of Birth");
    if (!address) missingFields.push("Address");
    if (!city) missingFields.push("City");
    if (!state) missingFields.push("State");
    if (!country) missingFields.push("Country");
    if (!pincode) missingFields.push("Pincode");

    if (missingFields.length > 0) {
      console.log("REGISTRATION MISSING FIELDS:", missingFields);

      return NextResponse.json(
        {
          success: false,
          message: `Please complete: ${missingFields.join(", ")}`,
          missingFields,
        },
        { status: 400 }
      );
    }

    if (password.length < 8) {
      return NextResponse.json(
        {
          success: false,
          message: "Password must be at least 8 characters long.",
        },
        { status: 400 }
      );
    }

    const normalizedEmail = String(email).trim().toLowerCase();

    const existingUser = await prisma.user.findUnique({
      where: {
        email: normalizedEmail,
      },
    });

    if (existingUser) {
      return NextResponse.json(
        {
          success: false,
          message: "An account with this email already exists.",
        },
        { status: 409 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const user = await prisma.user.create({
      data: {
        email: normalizedEmail,
        password: hashedPassword,
        role: "MEMBER",
        status: "PENDING",
      },
    });

    await prisma.memberProfile.create({
      data: {
        userId: user.id,
        firstName: String(firstName).trim(),
        lastName: String(lastName).trim(),
        fatherFullName: String(fatherFullName).trim(),
        motherFullName: String(motherFullName).trim(),
        phone: String(phone).trim(),
        whatsappNumber: whatsappNumber
          ? String(whatsappNumber).trim()
          : null,
        gender: String(gender).trim(),
        dateOfBirth: new Date(dateOfBirth),
        address: String(address).trim(),
        city: String(city).trim(),
        state: String(state).trim(),
        country: String(country).trim(),
        pincode: String(pincode).trim(),
      },
    });

    return NextResponse.json(
      {
        success: true,
        message:
          "Registration successful. Your account is pending approval.",
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Registration error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Something went wrong during registration.",
      },
      { status: 500 }
    );
  }
}