"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

type Portfolio = {
  id: string;
  username: string;
  fullName: string;
  bio: string;
  imageUrl: string;
};

export default function DashboardPage() {
  const [portfolios, setPortfolios] = useState<Portfolio[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/portfolio/get")
      .then((res) => res.json())
      .then((data) => {
        if (data.portfolios) setPortfolios(data.portfolios);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Chargement...</p>;
  if (!portfolios.length) return <p>Aucun portfolio trouvé</p>;

  return (
    <div className="space-y-4">
      {portfolios.map((p) => (
        <div key={p.id} className="p-4 border rounded-lg flex items-center justify-between">
          <div className="flex items-center gap-4">
            {p.imageUrl && <img src={p.imageUrl} alt={p.fullName} className="w-16 h-16 rounded-full object-cover" />}
            <div>
              <p className="font-bold">{p.fullName}</p>
              <p className="text-sm text-gray-500">{p.bio}</p>
            </div>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => window.open(`/portfolio/${p.username}`, "_blank")}>
              Aperçu
            </Button>
            <Button onClick={() => window.location.href = `/dashboard/edit-portfolio/${p.id}`}>
              Modifier
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
}
