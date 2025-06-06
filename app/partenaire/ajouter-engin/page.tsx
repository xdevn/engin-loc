"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { ArrowLeft, Upload, Zap, Sun } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"

export default function AjouterEnginPage() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    nom: "",
    type: "",
    modele: "",
    puissance: "",
    description: "",
    disponibilite: true,
    prix: "",
    categorie: "energie",
    sousCategorie: "",
  })
  const [images, setImages] = useState<File[]>([])
  const [previewUrls, setPreviewUrls] = useState<string[]>([])
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSwitchChange = (checked: boolean) => {
    setFormData((prev) => ({ ...prev, disponibilite: checked }))
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files)
      setImages((prevImages) => [...prevImages, ...filesArray])

      // Créer des URLs pour la prévisualisation
      const newPreviewUrls = filesArray.map((file) => URL.createObjectURL(file))
      setPreviewUrls((prevUrls) => [...prevUrls, ...newPreviewUrls])
    }
  }

  const removeImage = (index: number) => {
    setImages((prevImages) => prevImages.filter((_, i) => i !== index))

    // Libérer l'URL de prévisualisation
    URL.revokeObjectURL(previewUrls[index])
    setPreviewUrls((prevUrls) => prevUrls.filter((_, i) => i !== index))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simuler un envoi de formulaire
    setTimeout(() => {
      setIsSubmitting(false)
      router.push("/partenaire/tableau-de-bord")
    }, 1500)
  }

  return (
    <div className="container py-8">
      <div className="mb-6">
        <Link href="/partenaire/tableau-de-bord" className="flex items-center text-zinc-500 hover:text-zinc-900">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Retour au tableau de bord
        </Link>
      </div>

      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Ajouter un nouvel équipement</h1>

        <form onSubmit={handleSubmit}>
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Informations générales</CardTitle>
              <CardDescription>Entrez les informations de base de votre équipement</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="nom">Nom de l&apos;équipement</Label>
                <Input
                  id="nom"
                  name="nom"
                  placeholder="Ex: Groupe électrogène 5kVA"
                  value={formData.nom}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="categorie">Catégorie</Label>
                  <Select value={formData.categorie} onValueChange={(value) => handleSelectChange("categorie", value)}>
                    <SelectTrigger id="categorie">
                      <SelectValue placeholder="Sélectionnez une catégorie" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="energie">Énergie</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="sousCategorie">Sous-catégorie</Label>
                  <Select
                    value={formData.sousCategorie}
                    onValueChange={(value) => handleSelectChange("sousCategorie", value)}
                  >
                    <SelectTrigger id="sousCategorie">
                      <SelectValue placeholder="Sélectionnez une sous-catégorie" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="groupe-electrogene">
                        <div className="flex items-center">
                          <Zap className="mr-2 h-4 w-4" />
                          Groupe électrogène
                        </div>
                      </SelectItem>
                      <SelectItem value="panneau-solaire">
                        <div className="flex items-center">
                          <Sun className="mr-2 h-4 w-4" />
                          Panneau solaire
                        </div>
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="type">Type</Label>
                  <Input
                    id="type"
                    name="type"
                    placeholder="Ex: Diesel, Solaire monocristallin"
                    value={formData.type}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="modele">Modèle</Label>
                  <Input
                    id="modele"
                    name="modele"
                    placeholder="Ex: XYZ-5000"
                    value={formData.modele}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="puissance">Puissance</Label>
                <Input
                  id="puissance"
                  name="puissance"
                  placeholder="Ex: 5kVA, 300W"
                  value={formData.puissance}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  name="description"
                  placeholder="Décrivez votre équipement en détail..."
                  rows={5}
                  value={formData.description}
                  onChange={handleChange}
                  required
                />
              </div>
            </CardContent>
          </Card>

          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Images</CardTitle>
              <CardDescription>Ajoutez des photos de votre équipement (maximum 5 images)</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="border-2 border-dashed rounded-lg p-6 text-center">
                <div className="flex flex-col items-center">
                  <Upload className="h-10 w-10 text-zinc-400 mb-2" />
                  <p className="text-zinc-500 mb-2">Glissez-déposez vos images ici ou cliquez pour parcourir</p>
                  <p className="text-xs text-zinc-400 mb-4">PNG, JPG ou JPEG (max 5MB)</p>
                  <Input
                    id="images"
                    type="file"
                    accept="image/*"
                    multiple
                    className="hidden"
                    onChange={handleImageChange}
                    disabled={images.length >= 5}
                  />
                  <label htmlFor="images">
                    <Button type="button" variant="outline" disabled={images.length >= 5}>
                      Sélectionner des fichiers
                    </Button>
                  </label>
                </div>
              </div>

              {previewUrls.length > 0 && (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 mt-4">
                  {previewUrls.map((url, index) => (
                    <div key={index} className="relative">
                      <img
                        src={url || "/placeholder.svg"}
                        alt={`Aperçu ${index + 1}`}
                        className="w-full h-24 object-cover rounded-md"
                      />
                      <button
                        type="button"
                        className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1"
                        onClick={() => removeImage(index)}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <line x1="18" y1="6" x2="6" y2="18"></line>
                          <line x1="6" y1="6" x2="18" y2="18"></line>
                        </svg>
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Tarification et disponibilité</CardTitle>
              <CardDescription>Définissez le prix et la disponibilité de votre équipement</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="prix">Prix journalier (FCFA)</Label>
                <Input
                  id="prix"
                  name="prix"
                  type="number"
                  placeholder="Ex: 15000"
                  value={formData.prix}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="disponibilite">Disponible immédiatement</Label>
                  <p className="text-sm text-zinc-500">L&apos;équipement sera visible dans le catalogue</p>
                </div>
                <Switch id="disponibilite" checked={formData.disponibilite} onCheckedChange={handleSwitchChange} />
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-end space-x-4">
            <Button type="button" variant="outline" onClick={() => router.push("/partenaire/tableau-de-bord")}>
              Annuler
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent"></div>
                  Enregistrement...
                </>
              ) : (
                "Enregistrer l&apos;équipement"
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}
