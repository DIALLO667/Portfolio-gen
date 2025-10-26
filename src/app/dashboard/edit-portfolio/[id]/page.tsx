import { prisma } from "@/lib/prisma";

interface PageProps {
  params: { id: string };
}

export default async function EditPortfolioPage({ params }: PageProps) {
  const portfolio = await prisma.portfolio.findUnique({
    where: { id: params.id },
  });

  if (!portfolio) return <p>Portfolio non trouvé</p>;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Modifier le portfolio : {portfolio.fullName}</h1>
      {/* Ici tu peux mettre ton formulaire réutilisable */}
      <p>Formulaire à remplir pour modifier le portfolio...</p>
    </div>
  );
}
