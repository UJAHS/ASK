import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { NewsStatus } from "@prisma/client";

const VALID_LOCALES = ["en", "hi", "gu"] as const;

type Locale = (typeof VALID_LOCALES)[number];

type TranslationInput = {
  title?: unknown;
  excerpt?: unknown;
  content?: unknown;
  location?: unknown;
};

function cleanString(value: unknown): string {
  if (typeof value !== "string") {
    return "";
  }

  return value.trim();
}

function isNewsStatus(
  value: unknown
): value is NewsStatus {
  return (
    typeof value === "string" &&
    Object.values(NewsStatus).includes(
      value as NewsStatus
    )
  );
}

function buildTranslations(
  input: unknown
): Array<{
  locale: Locale;
  title: string;
  excerpt: string | null;
  content: string;
  location: string | null;
}> {
  if (
    !input ||
    typeof input !== "object" ||
    Array.isArray(input)
  ) {
    return [];
  }

  const translations: Array<{
    locale: Locale;
    title: string;
    excerpt: string | null;
    content: string;
    location: string | null;
  }> = [];

  const translationMap =
    input as Record<
      string,
      TranslationInput | undefined
    >;

  for (const locale of VALID_LOCALES) {
    const translation =
      translationMap[locale];

    if (
      !translation ||
      typeof translation !== "object"
    ) {
      continue;
    }

    const title = cleanString(
      translation.title
    );

    const content = cleanString(
      translation.content
    );

    const excerpt = cleanString(
      translation.excerpt
    );

    const location = cleanString(
      translation.location
    );

    if (!title || !content) {
      continue;
    }

    translations.push({
      locale,
      title,
      excerpt: excerpt || null,
      content,
      location: location || null,
    });
  }

  return translations;
}

async function requireAdmin() {
  const session = await auth();

  const role = String(
    session?.user?.role || ""
  );

  if (
    role !== "ADMIN" &&
    role !== "SUPER_ADMIN"
  ) {
    return false;
  }

  return true;
}

export async function GET() {
  try {
    const isAdmin =
      await requireAdmin();

    if (!isAdmin) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const news =
      await prisma.news.findMany({
        include: {
          translations: {
            orderBy: {
              locale: "asc",
            },
          },
        },
        orderBy: {
          createdAt: "desc",
        },
      });

    return NextResponse.json({
      success: true,
      news,
    });
  } catch (error) {
    console.error(
      "GET /api/admin/news error:",
      error
    );

    return NextResponse.json(
      {
        error:
          "Unable to fetch news.",
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
    const isAdmin =
      await requireAdmin();

    if (!isAdmin) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const body = await request.json();

    const slug = cleanString(
      body?.slug
    );

    const image = cleanString(
      body?.image
    );

    const statusValue =
      cleanString(body?.status) ||
      "DRAFT";

    if (!slug) {
      return NextResponse.json(
        {
          error:
            "Slug is required.",
        },
        {
          status: 400,
        }
      );
    }

    if (!isNewsStatus(statusValue)) {
      return NextResponse.json(
        {
          error:
            "Invalid news status.",
        },
        {
          status: 400,
        }
      );
    }

    const translations =
      buildTranslations(
        body?.translations
      );

    if (translations.length === 0) {
      return NextResponse.json(
        {
          error:
            "At least one complete language translation is required.",
        },
        {
          status: 400,
        }
      );
    }

    const existingNews =
      await prisma.news.findUnique({
        where: {
          slug,
        },
      });

    if (existingNews) {
      return NextResponse.json(
        {
          error:
            "A news article with this slug already exists.",
        },
        {
          status: 409,
        }
      );
    }

    let publishedAt: Date | null = null;

    if (body?.publishedAt) {
      const parsedDate = new Date(
        body.publishedAt
      );

      if (
        Number.isNaN(
          parsedDate.getTime()
        )
      ) {
        return NextResponse.json(
          {
            error:
              "Invalid published date.",
          },
          {
            status: 400,
          }
        );
      }

      publishedAt = parsedDate;
    } else if (
      statusValue === "PUBLISHED"
    ) {
      publishedAt = new Date();
    }

    const news =
      await prisma.news.create({
        data: {
          slug,

          image:
            image || null,

          status:
            statusValue,

          publishedAt,

          translations: {
            create:
              translations.map(
                (translation) => ({
                  locale:
                    translation.locale,

                  title:
                    translation.title,

                  excerpt:
                    translation.excerpt,

                  content:
                    translation.content,

                  location:
                    translation.location,
                })
              ),
          },
        },

        include: {
          translations: true,
        },
      });

    return NextResponse.json(
      {
        success: true,
        news,
      },
      {
        status: 201,
      }
    );
  } catch (error) {
    console.error(
      "POST /api/admin/news error:",
      error
    );

    return NextResponse.json(
      {
        error:
          "Unable to create news.",
      },
      {
        status: 500,
      }
    );
  }
}