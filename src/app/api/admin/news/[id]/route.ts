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

  return (
    role === "ADMIN" ||
    role === "SUPER_ADMIN"
  );
}

export async function GET(
  _request: Request,
  {
    params,
  }: {
    params: Promise<{ id: string }>;
  }
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

    const { id } = await params;

    const news =
      await prisma.news.findUnique({
        where: {
          id,
        },
        include: {
          translations: {
            orderBy: {
              locale: "asc",
            },
          },
        },
      });

    if (!news) {
      return NextResponse.json(
        {
          error:
            "News article not found.",
        },
        {
          status: 404,
        }
      );
    }

    return NextResponse.json({
      success: true,
      news,
    });
  } catch (error) {
    console.error(
      "GET /api/admin/news/[id] error:",
      error
    );

    return NextResponse.json(
      {
        error:
          "Unable to fetch news article.",
      },
      {
        status: 500,
      }
    );
  }
}

export async function PATCH(
  request: Request,
  {
    params,
  }: {
    params: Promise<{ id: string }>;
  }
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

    const { id } = await params;

    const body = await request.json();

    const existingNews =
      await prisma.news.findUnique({
        where: {
          id,
        },
      });

    if (!existingNews) {
      return NextResponse.json(
        {
          error:
            "News article not found.",
        },
        {
          status: 404,
        }
      );
    }

    const slug = cleanString(
      body?.slug
    );

    const image = cleanString(
      body?.image
    );

    const statusValue =
      cleanString(body?.status);

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

    const duplicate =
      await prisma.news.findFirst({
        where: {
          slug,
          NOT: {
            id,
          },
        },
      });

    if (duplicate) {
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

    let publishedAt:
      | Date
      | null
      | undefined;

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
      statusValue === "PUBLISHED" &&
      !existingNews.publishedAt
    ) {
      publishedAt = new Date();
    } else if (
      statusValue !== "PUBLISHED"
    ) {
      publishedAt = null;
    }

    const news =
      await prisma.$transaction(
        async (tx) => {
          await tx.newsTranslation.deleteMany({
            where: {
              newsId: id,
            },
          });

          return tx.news.update({
            where: {
              id,
            },

            data: {
              slug,

              image:
                image || null,

              status:
                statusValue,

              ...(publishedAt !==
              undefined
                ? {
                    publishedAt,
                  }
                : {}),

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
        }
      );

    return NextResponse.json({
      success: true,
      news,
    });
  } catch (error) {
    console.error(
      "PATCH /api/admin/news/[id] error:",
      error
    );

    return NextResponse.json(
      {
        error:
          "Unable to update news article.",
      },
      {
        status: 500,
      }
    );
  }
}

export async function DELETE(
  _request: Request,
  {
    params,
  }: {
    params: Promise<{ id: string }>;
  }
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

    const { id } = await params;

    const existingNews =
      await prisma.news.findUnique({
        where: {
          id,
        },
      });

    if (!existingNews) {
      return NextResponse.json(
        {
          error:
            "News article not found.",
        },
        {
          status: 404,
        }
      );
    }

    await prisma.news.delete({
      where: {
        id,
      },
    });

    return NextResponse.json({
      success: true,
      message:
        "News article deleted successfully.",
    });
  } catch (error) {
    console.error(
      "DELETE /api/admin/news/[id] error:",
      error
    );

    return NextResponse.json(
      {
        error:
          "Unable to delete news article.",
      },
      {
        status: 500,
      }
    );
  }
}