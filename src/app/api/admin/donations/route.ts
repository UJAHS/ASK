import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import {
  DonationPaymentMethod,
  DonationStatus,
} from "@prisma/client";
import { auth } from "@/auth";
import type { Session } from "next-auth";

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
  request: Request
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

    const { searchParams } =
      new URL(request.url);

    const search = cleanString(
      searchParams.get("search")
    );

    const status = cleanString(
      searchParams.get("status")
    );

    const paymentMethod =
      cleanString(
        searchParams.get(
          "paymentMethod"
        )
      );

    if (
      status &&
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

    if (
      paymentMethod &&
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

    const donations =
      await prisma.donation.findMany({
        where: {
          ...(search
            ? {
                OR: [
                  {
                    donorName: {
                      contains: search,
                      mode: "insensitive",
                    },
                  },
                  {
                    email: {
                      contains: search,
                      mode: "insensitive",
                    },
                  },
                  {
                    phone: {
                      contains: search,
                      mode: "insensitive",
                    },
                  },
                  {
                    referenceNumber: {
                      contains: search,
                      mode: "insensitive",
                    },
                  },
                ],
              }
            : {}),

          ...(status
            ? {
                status:
                  status as DonationStatus,
              }
            : {}),

          ...(paymentMethod
            ? {
                paymentMethod:
                  paymentMethod as DonationPaymentMethod,
              }
            : {}),
        },

        orderBy: {
          donationDate: "desc",
        },
      });

    return NextResponse.json(
      donations
    );
  } catch (error) {
    console.error(
      "GET /api/admin/donations:",
      error
    );

    return NextResponse.json(
      {
        error:
          "Unable to load donations.",
      },
      {
        status: 500,
      }
    );
  }
}

export async function POST(
  request: Request
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

    const body =
      await request.json();

    const donorName =
      cleanString(
        body?.donorName
      );

    const email =
      cleanString(body?.email);

    const phone =
      cleanString(body?.phone);

    const currency =
      cleanString(
        body?.currency
      ) || "INR";

    const paymentMethodValue =
      cleanString(
        body?.paymentMethod
      ) || "OTHER";

    const referenceNumber =
      cleanString(
        body?.referenceNumber
      );

    const notes =
      cleanString(body?.notes);

    const statusValue =
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
        paymentMethodValue
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
      !isDonationStatus(
        statusValue
      )
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
      await prisma.donation.create({
        data: {
          donorName,

          email:
            email || null,

          phone:
            phone || null,

          amount,

          currency,

          donationDate,

          paymentMethod:
            paymentMethodValue,

          referenceNumber:
            referenceNumber ||
            null,

          status:
            statusValue,

          notes:
            notes || null,
        },
      });

    return NextResponse.json(
      donation,
      {
        status: 201,
      }
    );
  } catch (error) {
    console.error(
      "POST /api/admin/donations:",
      error
    );

    return NextResponse.json(
      {
        error:
          "Unable to create donation.",
      },
      {
        status: 500,
      }
    );
  }
}