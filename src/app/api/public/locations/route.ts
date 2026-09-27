import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);

    const type = searchParams.get("type");
    const locale = searchParams.get("locale") || "en";
    const countryId = searchParams.get("countryId");
    const stateId = searchParams.get("stateId");

    if (type === "countries") {
      const countries = await prisma.country.findMany({
        where: {
          isActive: true,
        },
        include: {
          translations: {
            where: {
              locale,
            },
          },
        },
        orderBy: {
          name: "asc",
        },
      });

      return NextResponse.json({
        success: true,
        items: countries.map((country) => ({
          id: country.id,
          name: country.name || "",
          displayName:
            country.translations[0]?.name ||
            country.name ||
            "",
        })),
      });
    }

    if (type === "states") {
      if (!countryId) {
        return NextResponse.json({
          success: true,
          items: [],
        });
      }

      const states = await prisma.state.findMany({
        where: {
          isActive: true,
          countryId,
        },
        orderBy: {
          name: "asc",
        },
      });

      return NextResponse.json({
        success: true,
        items: states.map((state) => ({
          id: state.id,
          name: state.name,
          displayName: state.name,
        })),
      });
    }

    if (type === "cities") {
      if (!stateId) {
        return NextResponse.json({
          success: true,
          items: [],
        });
      }

      const cities = await prisma.city.findMany({
        where: {
          isActive: true,
          stateId,
        },
        orderBy: {
          name: "asc",
        },
      });

      return NextResponse.json({
        success: true,
        items: cities.map((city) => ({
          id: city.id,
          name: city.name,
          displayName: city.name,
        })),
      });
    }

    return NextResponse.json(
      {
        success: false,
        message: "Invalid location type.",
      },
      { status: 400 }
    );
  } catch (error) {
    console.error("Public locations API error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Unable to load location data.",
      },
      { status: 500 }
    );
  }
}