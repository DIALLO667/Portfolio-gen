import { useFieldArray, useFormContext, FieldErrors } from "react-hook-form"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Trash2 } from "lucide-react"

// 👉 On définit le type des données du formulaire
type EducationItem = {
  institution: string
  diploma: string
  year: string
  location: string
}

type FormValues = {
  education: EducationItem[]
}

export function EducationForm() {
  const {
    control,
    register,
    formState: { errors },
  } = useFormContext<FormValues>() // ✅ On précise le type ici

  const { fields, append, remove } = useFieldArray({
    control,
    name: "education",
  })

  // Cast utile pour éviter les erreurs d'accès (TypeScript n'aime pas les index dynamiques)
  const educationErrors = errors.education as
    | FieldErrors<EducationItem>[]
    | undefined

  return (
    <div className="space-y-6">
      {fields.map((field, index) => (
        <div key={field.id} className="space-y-4 p-4 border rounded-lg">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold">Formation {index + 1}</h3>
            <Button type="button" variant="ghost" size="icon" onClick={() => remove(index)}>
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>

          <div>
            <Label htmlFor={`education.${index}.institution`}>Institution</Label>
            <Input {...register(`education.${index}.institution`)} placeholder="Université XYZ" />
            {educationErrors?.[index]?.institution && (
              <p className="text-red-500">
                {educationErrors[index]?.institution?.message as string}
              </p>
            )}
          </div>

          <div>
            <Label htmlFor={`education.${index}.diploma`}>Diplôme</Label>
            <Input {...register(`education.${index}.diploma`)} placeholder="Master en Informatique" />
            {educationErrors?.[index]?.diploma && (
              <p className="text-red-500">
                {educationErrors[index]?.diploma?.message as string}
              </p>
            )}
          </div>

          <div>
            <Label htmlFor={`education.${index}.year`}>Année</Label>
            <Input {...register(`education.${index}.year`)} placeholder="2023" />
            {educationErrors?.[index]?.year && (
              <p className="text-red-500">
                {educationErrors[index]?.year?.message as string}
              </p>
            )}
          </div>

          <div>
            <Label htmlFor={`education.${index}.location`}>Lieu</Label>
            <Input {...register(`education.${index}.location`)} placeholder="Paris, France" />
            {educationErrors?.[index]?.location && (
              <p className="text-red-500">
                {educationErrors[index]?.location?.message as string}
              </p>
            )}
          </div>
        </div>
      ))}

      <Button
        type="button"
        onClick={() =>
          append({ institution: "", diploma: "", year: "", location: "" })
        }
      >
        Ajouter une formation
      </Button>
    </div>
  )
}
