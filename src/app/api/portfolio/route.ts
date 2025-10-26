import { prisma } from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const user = await currentUser();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Upsert user dans la table User
    await prisma.user.upsert({
      where: { clerkId: user.id },
      update: {},
      create: {
        clerkId: user.id,
        email: user.emailAddresses[0]?.emailAddress || "unknown@example.com",
        fullName: `${user.firstName || ""} ${user.lastName || ""}`.trim(),
      },
    });

    const body = await req.json();
    const {
      username,
      fullName,
      bio,
      email,
      address,
      imageUrl,
      socialLinks,
      skills,
      theme,
      projects,
      education,
      experience,
    } = body;

    if (!username || !fullName || !bio || !email) {
      return NextResponse.json({ error: "Champs obligatoires manquants" }, { status: 400 });
    }

    // Vérifie si le portfolio existe
    const existingPortfolio = await prisma.portfolio.findFirst({
      where: { userId: user.id },
    });

    let portfolio;
    if (existingPortfolio) {
      portfolio = await prisma.portfolio.update({
        where: { id: existingPortfolio.id },
        data: {
          username,
          fullName,
          bio,
          email,
          address,
          imageUrl,
          socialLinks,
          skills,
          theme,
          projects,
          education,
          experience,
        },
      });
    } else {
      portfolio = await prisma.portfolio.create({
        data: {
          userId: user.id,
          username,
          fullName,
          bio,
          email,
          address,
          imageUrl,
          socialLinks,
          skills,
          theme,
          projects,
          education,
          experience,
        },
      });
    }

    return NextResponse.json({ success: true, portfolio });
  } catch (err: any) {
    console.error("Erreur API /api/portfolio:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
