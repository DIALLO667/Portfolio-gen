"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

type Portfolio = {
  id: string;
  username: string;
  fullName: string;
  bio: string;
  imageUrl?: string;
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
            {p.imageUrl ? (
              <img src={p.imageUrl} alt={p.fullName} className="w-16 h-16 rounded-full object-cover" />
            ) : (
              <div className="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center text-gray-500">
                U
              </div>
            )}
            <div>
              <p className="font-bold">{p.fullName}</p>
              <p className="text-sm text-gray-500">{p.bio}</p>
            </div>
          </div>
          <div className="flex gap-2">
            <Link href={`/portfolio/${p.username}`} target="_blank">
              <Button variant="outline">Aperçu</Button>
            </Link>
            <Link href={`/dashboard/edit-portfolio/${p.id}`}>
              <Button>Modifier</Button>
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
}
