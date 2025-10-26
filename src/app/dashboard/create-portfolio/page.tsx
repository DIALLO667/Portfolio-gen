"use client"

import { useState } from "react"
import { useForm, FormProvider } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { PersonalInfoForm } from "@/components/forms/PersonalInfoForm"
import { ProjectsForm } from "@/components/forms/ProjectsForm"
import { EducationForm } from "@/components/forms/EducationForm"
import { ExperienceForm } from "@/components/forms/ExperienceForm"
import { BottomNavBar } from "@/components/BottomNavBar"
import { PortfolioPreview } from "@/components/PortfolioPreview"

const projectSchema = z.object({
  title: z.string().min(1, "Le titre est requis"),
  description: z.string().min(1, "La description est requise"),
  link: z.string().url("L'URL du projet doit être valide"),
  thumbnail: z.string().url("L'URL de la vignette doit être valide"),
})

const educationSchema = z.object({
  institution: z.string().min(1, "L'institution est requise"),
  diploma: z.string().min(1, "Le diplôme est requis"),
  year: z.string().min(1, "L'année est requise"),
  location: z.string().min(1, "Le lieu est requis"),
})

const experienceSchema = z.object({
  title: z.string().min(1, "Le titre du poste est requis"),
  company: z.string().min(1, "L'entreprise est requise"),
  description: z.string().min(1, "La description est requise"),
  startDate: z.string().min(1, "La date de début est requise"),
  endDate: z.string().min(1, "La date de fin est requise"),
})

const portfolioSchema = z.object({
  username: z.string().min(3, "Le nom d'utilisateur doit contenir au moins 3 caractères"),
  fullName: z.string().min(1, "Le nom complet est requis"),
  bio: z.string().min(10, "La biographie doit contenir au moins 10 caractères"),
  email: z.string().email("L'email doit être valide"),
  address: z.string().min(1, "L'adresse est requise"),
  imageUrl: z.string().url("L'URL de l'image doit être valide"),
  socialLinks: z
    .object({
      x: z.string().url("L'URL Twitter doit être valide").optional(),
      linkedin: z.string().url("L'URL LinkedIn doit être valide").optional(),
      github: z.string().url("L'URL GitHub doit être valide").optional(),
      facebook: z.string().url("L'URL Facebook doit être valide").optional(),
      instagram: z.string().url("L'URL Instagram doit être valide").optional(),
    })
    .optional(),
  skills: z.array(z.string()).min(1, "Au moins une compétence est requise"),
  theme: z.object({
    font: z.enum(["inter", "roboto", "poppins"]),
  }),
  projects: z.array(projectSchema),
  education: z.array(educationSchema).optional(),
  experience: z.array(experienceSchema).optional(),
})

type PortfolioData = z.infer<typeof portfolioSchema>

export default function CreatePortfolio() {
  const [activeSections, setActiveSections] = useState(["personal", "projects"])

  const methods = useForm<PortfolioData>({
    resolver: zodResolver(portfolioSchema),
    defaultValues: {
      theme: { font: "inter" },
      skills: [],
      projects: [],
      education: [],
      experience: [],
    },
  })

  const onSubmit = (data: PortfolioData) => {
    console.log("Données du formulaire soumises :", data)
    // Ici, vous enverriez les données à votre backend
  }

  const removeSection = (section: string) => {
    setActiveSections(activeSections.filter((s) => s !== section))
  }

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)} className="space-y-8 pb-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-8 overflow-y-auto max-h-[calc(100vh-200px)]">
            <Card>
              <CardHeader>
                <CardTitle>Informations personnelles</CardTitle>
              </CardHeader>
              <CardContent>
                <PersonalInfoForm />
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Projets</CardTitle>
              </CardHeader>
              <CardContent>
                <ProjectsForm />
              </CardContent>
            </Card>
            {activeSections.includes("education") && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex justify-between items-center">
                    Éducation
                    <Button variant="destructive" size="sm" onClick={() => removeSection("education")}>
                      Supprimer
                    </Button>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <EducationForm />
                </CardContent>
              </Card>
            )}
            {activeSections.includes("experience") && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex justify-between items-center">
                    Expérience
                    <Button variant="destructive" size="sm" onClick={() => removeSection("experience")}>
                      Supprimer
                    </Button>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ExperienceForm />
                </CardContent>
              </Card>
            )}
          </div>
          <div className="hidden md:block sticky top-0 h-screen overflow-hidden">
            <div className="h-full overflow-y-auto pr-4">
              <PortfolioPreview />
            </div>
          </div>
        </div>
        {/* <BottomNavBar
          onAddEducation={() => setActiveSections([...activeSections, "education"])}
          onAddExperience={() => setActiveSections([...activeSections, "experience"])}
        /> */}
      </form>
    </FormProvider>
  )
}

