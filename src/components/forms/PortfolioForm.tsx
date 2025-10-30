"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";

interface PortfolioFormProps {
  portfolio?: any; // Tu peux typer plus précisément
}

export default function PortfolioForm({ portfolio }: PortfolioFormProps) {
  const [fullName, setFullName] = useState(portfolio?.fullName || "");
  const [bio, setBio] = useState(portfolio?.bio || "");
  const [email, setEmail] = useState(portfolio?.email || "");
  const [address, setAddress] = useState(portfolio?.address || "");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await fetch(`/api/portfolio/update/${portfolio?.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ fullName, bio, email, address }),
    });

    if (res.ok) {
      alert("Portfolio mis à jour !");
    } else {
      alert("Erreur lors de la mise à jour");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        type="text"
        placeholder="Nom complet"
        value={fullName}
        onChange={(e) => setFullName(e.target.value)}
        className="w-full border p-2 rounded"
      />
      <textarea
        placeholder="Bio"
        value={bio}
        onChange={(e) => setBio(e.target.value)}
        className="w-full border p-2 rounded"
      />
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="w-full border p-2 rounded"
      />
      <input
        type="text"
        placeholder="Adresse"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
        className="w-full border p-2 rounded"
      />
      <Button type="submit">Enregistrer</Button>
    </form>
  );
}
