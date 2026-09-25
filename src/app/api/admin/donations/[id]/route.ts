import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import {
  DonationPaymentMethod,
  DonationStatus,
} from "@prisma/client";
import { auth } from "@/auth";
import type { Session } from "next-auth";

type Context = {
  params: Promise<{
    id: string;
  }>;
};

function getRole(
  session: Session | null
): string {
  return String(
    (
      session?.user as {
        role?: string;
      } | undefined
    )?.role || ""
  );
}

function cleanString(
  value: unknown
): string {
  return typeof value === "string"
    ? value.trim()
    : "";
}

function isDonationStatus(
  value: unknown
): value is DonationStatus {
  return (
    typeof value === "string" &&
    Object.values(
      DonationStatus
    ).includes(
      value as DonationStatus
    )
  );
}

function isDonationPaymentMethod(
  value: unknown
): value is DonationPaymentMethod {
  return (
    typeof value === "string" &&
    Object.values(
      DonationPaymentMethod
    ).includes(
      value as DonationPaymentMethod
    )
  );
}

export async function GET(
  _request: Request,
  context: Context
) {
  try {
    const session = await auth();
    const role = getRole(session);

    if (
      role !== "ADMIN" &&
      role !== "SUPER_ADMIN"
    ) {
      return NextResponse.json(
        {
          error: "Unauthorized",
        },
        {
          status: 401,
        }
      );
    }

    const { id } =
      await context.params;

    const donation =
      await prisma.donation.findUnique({
        where: {
          id,
        },
      });

    if (!donation) {
      return NextResponse.json(
        {
          error:
            "Donation not found.",
        },
        {
          status: 404,
        }
      );
    }

    return NextResponse.json(
      donation
    );
  } catch (error) {
    console.error(
      "GET donation:",
      error
    );

    return NextResponse.json(
      {
        error:
          "Unable to load donation.",
      },
      {
        status: 500,
      }
    );
  }
}

export async function PUT(
  request: Request,
  context: Context
) {
  try {
    const session = await auth();
    const role = getRole(session);

    if (
      role !== "ADMIN" &&
      role !== "SUPER_ADMIN"
    ) {
      return NextResponse.json(
        {
          error: "Unauthorized",
        },
        {
          status: 401,
        }
      );
    }

    const { id } =
      await context.params;

    const existingDonation =
      await prisma.donation.findUnique({
        where: {
          id,
        },
      });

    if (!existingDonation) {
      return NextResponse.json(
        {
          error:
            "Donation not found.",
        },
        {
          status: 404,
        }
      );
    }

    const body =
      await request.json();

    const donorName =
      cleanString(
        body?.donorName
      );

    const email =
      cleanString(
        body?.email
      );

    const phone =
      cleanString(
        body?.phone
      );

    const currency =
      cleanString(
        body?.currency
      ) || "INR";

    const paymentMethod =
      cleanString(
        body?.paymentMethod
      ) || "OTHER";

    const referenceNumber =
      cleanString(
        body?.referenceNumber
      );

    const notes =
      cleanString(
        body?.notes
      );

    const status =
      cleanString(
        body?.status
      ) || "PENDING";

    const amount =
      Number(body?.amount);

    if (!donorName) {
      return NextResponse.json(
        {
          error:
            "Donor name is required.",
        },
        {
          status: 400,
        }
      );
    }

    if (
      !Number.isFinite(amount) ||
      amount <= 0
    ) {
      return NextResponse.json(
        {
          error:
            "A valid donation amount is required.",
        },
        {
          status: 400,
        }
      );
    }

    if (
      !isDonationPaymentMethod(
        paymentMethod
      )
    ) {
      return NextResponse.json(
        {
          error:
            "Invalid payment method.",
        },
        {
          status: 400,
        }
      );
    }

    if (
      !isDonationStatus(status)
    ) {
      return NextResponse.json(
        {
          error:
            "Invalid donation status.",
        },
        {
          status: 400,
        }
      );
    }

    if (!currency) {
      return NextResponse.json(
        {
          error:
            "Currency is required.",
        },
        {
          status: 400,
        }
      );
    }

    let donationDate =
      new Date();

    if (
      body?.donationDate
    ) {
      donationDate =
        new Date(
          body.donationDate
        );

      if (
        Number.isNaN(
          donationDate.getTime()
        )
      ) {
        return NextResponse.json(
          {
            error:
              "Invalid donation date.",
          },
          {
            status: 400,
          }
        );
      }
    }

    const donation =
      await prisma.donation.update({
        where: {
          id,
        },

        data: {
          donorName,

          email:
            email || null,

          phone:
            phone || null,

          amount,

          currency,

          donationDate,

          paymentMethod,

          referenceNumber:
            referenceNumber ||
            null,

          status,

          notes:
            notes || null,
        },
      });

    return NextResponse.json(
      donation
    );
  } catch (error) {
    console.error(
      "PUT donation:",
      error
    );

    return NextResponse.json(
      {
        error:
          "Unable to update donation.",
      },
      {
        status: 500,
      }
    );
  }
}

export async function DELETE(
  _request: Request,
  context: Context
) {
  try {
    const session = await auth();
    const role = getRole(session);

    if (
      role !== "ADMIN" &&
      role !== "SUPER_ADMIN"
    ) {
      return NextResponse.json(
        {
          error: "Unauthorized",
        },
        {
          status: 401,
        }
      );
    }

    const { id } =
      await context.params;

    const existingDonation =
      await prisma.donation.findUnique({
        where: {
          id,
        },
      });

    if (!existingDonation) {
      return NextResponse.json(
        {
          error:
            "Donation not found.",
        },
        {
          status: 404,
        }
      );
    }

    await prisma.donation.delete({
      where: {
        id,
      },
    });

    return NextResponse.json({
      success: true,
    });
  } catch (error) {
    console.error(
      "DELETE donation:",
      error
    );

    return NextResponse.json(
      {
        error:
          "Unable to delete donation.",
      },
      {
        status: 500,
      }
    );
  }
}