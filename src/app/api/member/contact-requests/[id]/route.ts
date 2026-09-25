import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

type Action = "ACCEPT" | "REJECT" | "CANCEL";

async function getCurrentMember() {
  const session = await auth();

  if (!session?.user?.email) {
    return null;
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
    return null;
  }

  if (user.role !== "MEMBER" || user.status !== "APPROVED") {
    return null;
  }

  return user;
}

export async function PATCH(
  req: Request,
  context: {
    params: Promise<{
      id: string;
    }>;
  },
) {
  try {
    const user = await getCurrentMember();

    if (!user) {
      return NextResponse.json(
        {
          error: "Unauthorized",
        },
        {
          status: 401,
        },
      );
    }

    const { id } = await context.params;

    if (!id) {
      return NextResponse.json(
        {
          error: "Request ID is required.",
        },
        {
          status: 400,
        },
      );
    }

    const body = await req.json();

    const action = String(body?.action || "").toUpperCase() as Action;

    if (!["ACCEPT", "REJECT", "CANCEL"].includes(action)) {
      return NextResponse.json(
        {
          error: "Invalid action.",
        },
        {
          status: 400,
        },
      );
    }

    const request = await prisma.connectionRequest.findUnique({
      where: {
        id,
      },
      select: {
        id: true,
        senderId: true,
        receiverId: true,
        status: true,
      },
    });

    if (!request) {
      return NextResponse.json(
        {
          error: "Contact request not found.",
        },
        {
          status: 404,
        },
      );
    }

    /*
     * ACCEPT and REJECT can only be performed
     * by the person who received the request.
     */
    if (
      (action === "ACCEPT" || action === "REJECT") &&
      request.receiverId !== user.id
    ) {
      return NextResponse.json(
        {
          error:
            "You are not authorized to respond to this contact request.",
        },
        {
          status: 403,
        },
      );
    }

    /*
     * CANCEL can only be performed by the
     * person who originally sent the request.
     */
    if (
      action === "CANCEL" &&
      request.senderId !== user.id
    ) {
      return NextResponse.json(
        {
          error:
            "You are not authorized to cancel this contact request.",
        },
        {
          status: 403,
        },
      );
    }

    if (request.status !== "PENDING") {
      return NextResponse.json(
        {
          error:
            "This contact request is no longer pending.",
          status: request.status,
        },
        {
          status: 409,
        },
      );
    }

    let newStatus:
      | "ACCEPTED"
      | "REJECTED"
      | "CANCELLED";

    if (action === "ACCEPT") {
      newStatus = "ACCEPTED";
    } else if (action === "REJECT") {
      newStatus = "REJECTED";
    } else {
      newStatus = "CANCELLED";
    }

    const updated =
      await prisma.connectionRequest.update({
        where: {
          id: request.id,
        },
        data: {
          status: newStatus,
        },
        select: {
          id: true,
          senderId: true,
          receiverId: true,
          status: true,
          message: true,
          createdAt: true,
          updatedAt: true,
        },
      });

    return NextResponse.json({
      success: true,
      request: updated,
    });
  } catch (error) {
    console.error(
      "[CONTACT REQUEST ACTION ERROR]",
      error,
    );

    return NextResponse.json(
      {
        error: "Unable to process request.",
      },
      {
        status: 500,
      },
    );
  }
}