import { prisma } from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const user = await currentUser();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Vérifie / crée l'utilisateur si besoin
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

    // 🧩 Vérifie si un autre portfolio a déjà ce username
    const usernameExists = await prisma.portfolio.findUnique({
      where: { username },
    });

    if (usernameExists) {
      return NextResponse.json({ error: "Ce nom d'utilisateur est déjà utilisé" }, { status: 400 });
    }

    // ✅ Crée un nouveau portfolio à chaque fois
    const portfolio = await prisma.portfolio.create({
      data: {
        userId: user.id,
        username,
        fullName,
        bio,
        email,
        address,
        imageUrl,
        socialLinks: JSON.stringify(socialLinks || {}),
        skills,
        theme: JSON.stringify(theme || {}),
        projects: JSON.stringify(projects || []),
        education: JSON.stringify(education || []),
        experience: JSON.stringify(experience || []),
      },
    });

    return NextResponse.json({ success: true, portfolio });
  } catch (err: any) {
    console.error("Erreur API /api/portfolio:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
