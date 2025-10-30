import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import PortfolioForm from "@/components/forms/PortfolioForm";

interface PageProps {
  params: { id: string };
}

export default async function EditPortfolioPage({ params }: PageProps) {
  const portfolio = await prisma.portfolio.findUnique({
    where: { id: params.id },
  });

  if (!portfolio) return <p>Portfolio non trouvé</p>;

  // Parser les champs JSON
  const education = Array.isArray(portfolio.education)
    ? portfolio.education
    : JSON.parse(portfolio.education as string || "[]");

  const experience = Array.isArray(portfolio.experience)
    ? portfolio.experience
    : JSON.parse(portfolio.experience as string || "[]");

  const projects = Array.isArray(portfolio.projects)
    ? portfolio.projects
    : JSON.parse(portfolio.projects as string || "[]");

  const theme = typeof portfolio.theme === "object"
    ? portfolio.theme
    : JSON.parse(portfolio.theme as string || "{}");

  const socialLinks = typeof portfolio.socialLinks === "object"
    ? portfolio.socialLinks
    : JSON.parse(portfolio.socialLinks as string || "{}");

  const skills = Array.isArray(portfolio.skills)
    ? portfolio.skills
    : [];

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-6 bg-white dark:bg-gray-800 rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-4">Modifier le portfolio : {portfolio.fullName}</h1>

      {/* Formulaire réutilisable */}
      <PortfolioForm
        portfolio={{
          id: portfolio.id,
          username: portfolio.username,
          fullName: portfolio.fullName,
          bio: portfolio.bio,
          email: portfolio.email,
          address: portfolio.address,
          imageUrl: portfolio.imageUrl,
          skills,
          education,
          experience,
          projects,
          theme,
          socialLinks,
        }}
      />
    </div>
  );
}
