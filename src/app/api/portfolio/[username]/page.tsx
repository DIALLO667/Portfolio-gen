import { prisma } from "@/lib/prisma";
import Link from "next/link";

interface PortfolioProps {
  params: {
    username: string;
  };
}

export default async function PortfolioPage({ params }: PortfolioProps) {
  // ⚡ Récupère le portfolio depuis la DB
  const portfolio = await prisma.portfolio.findUnique({
    where: { username: params.username },
  });

  if (!portfolio) {
    return <p className="text-red-500">Aucun portfolio trouvé</p>;
  }

  // Parse les champs JSON de manière sécurisée
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
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">{portfolio.fullName}</h1>
        <div className="flex gap-2">
          <Link
            href={`/portfolio/${portfolio.username}`}
            target="_blank"
            className="px-3 py-1 bg-blue-500 hover:bg-blue-600 text-white rounded"
          >
            Aperçu
          </Link>
          <Link
            href={`/dashboard/edit-portfolio/${portfolio.id}`}
            className="px-3 py-1 bg-green-500 hover:bg-green-600 text-white rounded"
          >
            Modifier
          </Link>
        </div>
      </div>

      {/* Bio */}
      <p className="text-gray-700 dark:text-gray-300">{portfolio.bio}</p>

      {/* Contact */}
      <div className="flex flex-wrap gap-4 mt-4">
        <p>Email: {portfolio.email}</p>
        <p>Adresse: {portfolio.address}</p>
      </div>

      {/* Skills */}
      {skills.length > 0 && (
        <div>
          <h2 className="font-semibold">Compétences</h2>
          <div className="flex flex-wrap gap-2 mt-2">
            {skills.map((skill: string, idx: number) => (
              <span
                key={idx}
                className="px-2 py-1 bg-gray-200 dark:bg-gray-700 rounded-full text-sm"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Experience */}
      {experience.length > 0 && (
        <div>
          <h2 className="font-semibold mt-4">Expérience</h2>
          <ul className="list-disc ml-5 mt-2">
            {experience.map((exp: any, idx: number) => (
              <li key={idx}>
                {exp.title} @ {exp.company} ({exp.startDate} - {exp.endDate})
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Education */}
      {education.length > 0 && (
        <div>
          <h2 className="font-semibold mt-4">Éducation</h2>
          <ul className="list-disc ml-5 mt-2">
            {education.map((edu: any, idx: number) => (
              <li key={idx}>
                {edu.institution} - {edu.diploma} ({edu.year})
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Projects */}
      {projects.length > 0 && (
        <div>
          <h2 className="font-semibold mt-4">Projets</h2>
          <ul className="list-disc ml-5 mt-2">
            {projects.map((proj: any, idx: number) => (
              <li key={idx}>{proj.name}</li>
            ))}
          </ul>
        </div>
      )}

      {/* Social Links */}
      {socialLinks && Object.keys(socialLinks).length > 0 && (
        <div className="mt-4 flex gap-3">
          {socialLinks.twitter && (
            <a href={socialLinks.twitter} target="_blank" className="text-blue-400">
              Twitter
            </a>
          )}
          {socialLinks.linkedin && (
            <a href={socialLinks.linkedin} target="_blank" className="text-blue-700">
              LinkedIn
            </a>
          )}
          {socialLinks.github && (
            <a href={socialLinks.github} target="_blank" className="text-gray-900 dark:text-white">
              GitHub
            </a>
          )}
        </div>
      )}
    </div>
  );
}
