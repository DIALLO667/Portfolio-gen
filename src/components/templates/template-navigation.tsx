"use client";
import { Briefcase, Code, GraduationCap, User, Save } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";

export default function TemplateNavigation() {
  const [activeSection, setActiveSection] = useState("about");
  const { getValues } = useFormContext(); // permet de récupérer les valeurs du formulaire

  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll("section[id]");
      const scrollPosition = window.scrollY + window.innerHeight / 2;

      sections.forEach((section) => {
        const sectionTop = (section as HTMLElement).offsetTop;
        const sectionHeight = (section as HTMLElement).offsetHeight;
        const sectionId = section.getAttribute("id") || "";

        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
          setActiveSection(sectionId);
        }
      });
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // ⚡ Fonction pour sauvegarder le portfolio
  const handleSave = async () => {
    try {
      const values = getValues();

      // Fournir des valeurs par défaut pour les champs obligatoires
      const payload = {
        username: values.username || "defaultUsername",
        fullName: values.fullName || "Nom Complet",
        bio: values.bio || "Bio par défaut",
        email: values.email || "example@example.com",
        address: values.address || "Adresse par défaut",
        imageUrl: values.imageUrl || "https://via.placeholder.com/150",
        socialLinks: values.socialLinks || {},
        skills: values.skills || [],
        theme: values.theme || {},
        projects: values.projects || [],
        education: values.education || [],
        experience: values.experience || [],
      };

      const res = await fetch("/api/portfolio", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Erreur serveur");

      alert("✅ Enregistrement réussi !");
    } catch (err: any) {
      alert(`❌ ${err.message}`);
      console.error("Erreur lors de l'enregistrement :", err);
    }
  };

  return (
    <nav className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-white dark:bg-gray-800 rounded-full shadow-lg border border-gray-100 dark:border-gray-700 px-2 py-2 flex items-center gap-1 transition-all duration-300 hover:scale-105 z-10">
      {[
        { id: "about", icon: User, label: "A propos", color: "blue" },
        { id: "projects", icon: Code, label: "Projects", color: "purple" },
        { id: "experience", icon: Briefcase, label: "Experience", color: "orange" },
        { id: "education", icon: GraduationCap, label: "Education", color: "green" },
      ].map(({ id, icon: Icon, label, color }) => (
        <a
          key={id}
          href={`#${id}`}
          className={`p-2 md:p-3 rounded-full transition-all duration-300 flex items-center gap-2 group ${
            activeSection === id
              ? `bg-${color}-50 dark:bg-${color}-900 text-${color}-600 dark:text-${color}-300`
              : "text-gray-500 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
          }`}
        >
          <Icon className="w-5 h-5" />
          <span
            className={`text-sm font-medium transition-all duration-300 ${
              activeSection === id
                ? "opacity-100 max-w-[100px]"
                : "opacity-0 max-w-0 hidden md:inline-block"
            }`}
          >
            {label}
          </span>
        </a>
      ))}

      {/* Bouton Enregistrer */}
      <button
        onClick={handleSave}
        className="p-2 md:p-3 rounded-full bg-blue-500 hover:bg-blue-600 text-white flex items-center gap-2"
      >
        <Save className="w-5 h-5" />
        <span className="hidden md:inline-block text-sm font-medium">
          Enregistrer
        </span>
      </button>
    </nav>
  );
}
