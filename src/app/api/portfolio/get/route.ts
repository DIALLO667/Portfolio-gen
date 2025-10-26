import { prisma } from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const user = await currentUser();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const portfolios = await prisma.portfolio.findMany({
      where: { userId: user.id },
      select: { id: true, username: true, fullName: true, bio: true, imageUrl: true },
    });

    return NextResponse.json({ portfolios });
  } catch (err: any) {
    console.error("Erreur API GET /portfolio:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
