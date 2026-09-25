import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

type ProfileData = {
  firstName: string | null;
  lastName: string | null;
  profileImage: string | null;
  profession: string | null;
  education: string | null;
  city: string | null;
  state: string | null;
  country: string | null;
};

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

async function getProfilesByUserIds(userIds: string[]) {
  if (userIds.length === 0) {
    return new Map<string, ProfileData>();
  }

  const profiles = await prisma.memberProfile.findMany({
    where: {
      userId: {
        in: userIds,
      },
    },
    select: {
      userId: true,
      firstName: true,
      lastName: true,
      profileImage: true,
      profession: true,
      education: true,
      city: true,
      state: true,
      country: true,
    },
  });

  return new Map(
    profiles.map((profile) => [
      profile.userId,
      {
        firstName: profile.firstName,
        lastName: profile.lastName,
        profileImage: profile.profileImage,
        profession: profile.profession,
        education: profile.education,
        city: profile.city,
        state: profile.state,
        country: profile.country,
      },
    ]),
  );
}

function buildMember(
  user: {
    id: string;
    memberNumber: number;
  },
  profiles: Map<string, ProfileData>,
) {
  const profile = profiles.get(user.id);

  return {
    id: user.id,
    memberNumber: user.memberNumber,
    firstName: profile?.firstName ?? null,
    lastName: profile?.lastName ?? null,
    profileImage: profile?.profileImage ?? null,
    profession: profile?.profession ?? null,
    education: profile?.education ?? null,
    city: profile?.city ?? null,
    state: profile?.state ?? null,
    country: profile?.country ?? null,
  };
}

export async function GET() {
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

    const [incoming, outgoing] = await Promise.all([
      prisma.connectionRequest.findMany({
        where: {
          receiverId: user.id,
        },
        orderBy: {
          createdAt: "desc",
        },
        select: {
          id: true,
          status: true,
          message: true,
          createdAt: true,
          updatedAt: true,
          sender: {
            select: {
              id: true,
              memberNumber: true,
            },
          },
        },
      }),

      prisma.connectionRequest.findMany({
        where: {
          senderId: user.id,
        },
        orderBy: {
          createdAt: "desc",
        },
        select: {
          id: true,
          status: true,
          message: true,
          createdAt: true,
          updatedAt: true,
          receiver: {
            select: {
              id: true,
              memberNumber: true,
            },
          },
        },
      }),
    ]);

    const profileUserIds = [
      ...incoming.map((request) => request.sender.id),
      ...outgoing.map((request) => request.receiver.id),
    ];

    const profiles = await getProfilesByUserIds(profileUserIds);

    return NextResponse.json({
      incoming: incoming.map((request) => ({
        id: request.id,
        status: request.status,
        message: request.message,
        createdAt: request.createdAt,
        updatedAt: request.updatedAt,
        member: buildMember(request.sender, profiles),
      })),

      outgoing: outgoing.map((request) => ({
        id: request.id,
        status: request.status,
        message: request.message,
        createdAt: request.createdAt,
        updatedAt: request.updatedAt,
        member: buildMember(request.receiver, profiles),
      })),
    });
  } catch (error) {
    console.error(
      "[CONTACT REQUESTS GET ERROR]",
      error,
    );

    return NextResponse.json(
      {
        error: "Unable to load contact requests.",
      },
      {
        status: 500,
      },
    );
  }
}

export async function POST(req: Request) {
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

    const body = await req.json();

    const memberNumber = Number(body?.memberNumber);

    const message =
      typeof body?.message === "string"
        ? body.message.trim()
        : null;

    if (!Number.isInteger(memberNumber) || memberNumber <= 0) {
      return NextResponse.json(
        {
          error: "Invalid member number.",
        },
        {
          status: 400,
        },
      );
    }

    const receiver = await prisma.user.findFirst({
      where: {
        memberNumber,
        role: "MEMBER",
        status: "APPROVED",
      },
      select: {
        id: true,
        memberNumber: true,
      },
    });

    if (!receiver) {
      return NextResponse.json(
        {
          error: "Member not found.",
        },
        {
          status: 404,
        },
      );
    }

    if (receiver.id === user.id) {
      return NextResponse.json(
        {
          error: "You cannot send a contact request to yourself.",
        },
        {
          status: 400,
        },
      );
    }

    /*
     * IMPORTANT:
     * MemberProfile is linked using MemberProfile.userId.
     * Do not rely on User.memberProfile here.
     */
    const receiverProfile = await prisma.memberProfile.findUnique({
      where: {
        userId: receiver.id,
      },
      select: {
        id: true,
      },
    });

    if (!receiverProfile) {
      return NextResponse.json(
        {
          error: "This member does not have a profile.",
        },
        {
          status: 400,
        },
      );
    }

    const existing = await prisma.connectionRequest.findUnique({
      where: {
        senderId_receiverId: {
          senderId: user.id,
          receiverId: receiver.id,
        },
      },
      select: {
        id: true,
        status: true,
      },
    });

    if (existing) {
      if (
        existing.status === "REJECTED" ||
        existing.status === "CANCELLED"
      ) {
        const updated =
          await prisma.connectionRequest.update({
            where: {
              id: existing.id,
            },
            data: {
              status: "PENDING",
              message,
            },
            select: {
              id: true,
              status: true,
              message: true,
              createdAt: true,
              updatedAt: true,
            },
          });

        return NextResponse.json(
          {
            success: true,
            request: updated,
            reactivated: true,
          },
          {
            status: 200,
          },
        );
      }

      return NextResponse.json(
        {
          error:
            existing.status === "PENDING"
              ? "A contact request is already pending."
              : "This contact request has already been accepted.",
        },
        {
          status: 409,
        },
      );
    }

    const reverseRequest =
      await prisma.connectionRequest.findUnique({
        where: {
          senderId_receiverId: {
            senderId: receiver.id,
            receiverId: user.id,
          },
        },
        select: {
          id: true,
          status: true,
        },
      });

    if (reverseRequest?.status === "PENDING") {
      return NextResponse.json(
        {
          error:
            "This member has already sent you a contact request. Please check your incoming requests.",
        },
        {
          status: 409,
        },
      );
    }

    const request =
      await prisma.connectionRequest.create({
        data: {
          senderId: user.id,
          receiverId: receiver.id,
          message: message || null,
          status: "PENDING",
        },
        select: {
          id: true,
          status: true,
          message: true,
          createdAt: true,
          updatedAt: true,
        },
      });

    return NextResponse.json(
      {
        success: true,
        request,
      },
      {
        status: 201,
      },
    );
  } catch (error) {
    console.error(
      "[CONTACT REQUESTS POST ERROR]",
      error,
    );

    return NextResponse.json(
      {
        error: "Unable to send contact request.",
      },
      {
        status: 500,
      },
    );
  }
}