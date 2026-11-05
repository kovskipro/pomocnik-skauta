"use client"
/* eslint-disable react-hooks/static-components */

import Link from "next/link"
import { ArrowLeft, ChevronRight, ChevronLeft } from "lucide-react"
import { useState, lazy, Suspense, useMemo } from "react"
import Navbar from "@/components/navbar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { countSkills, type FunctionRecord, type SkillCategory } from "../../lib/functions"
import { getIconComponent } from "../../lib/icons"
import { SITE_URL } from "../../lib/site"

// Lazy load Footer dla lepszej wydajności
const LazyFooter = lazy(() => import("@/components/footer"))

interface FunctionPageClientProps {
    func: FunctionRecord
}

export function FunctionPageClient({ func }: FunctionPageClientProps) {
    const [selectedSection, setSelectedSection] = useState<number>(0)
    const skills = func.skills ?? []
    const selectedSkillGroup = skills[selectedSection]

    const Icon = useMemo(() => getIconComponent(func.icon || undefined), [func.icon])
    const totalSkills = countSkills(skills)

    const colorBg = func.color_background || "bg-neutral-700/10"
    const colorText = func.color_text || "text-neutral-500"
    const colorTone = colorText.replace("text-", "")
    const safeTonePattern = /^(neutral|red|orange|yellow|green|blue|purple|pink)-(50|100|200|300|400|500|600|700|800|900)$/
    const safeColorTone = safeTonePattern.test(colorTone) ? colorTone : "neutral-500"

    const dotColorClass = `bg-${safeColorTone}`
    const ringColorClass = `ring-${safeColorTone}`
    const functionUrl = `${SITE_URL}/${func.id}`
    const brandedFunctionName = `Pomocnik Skauta ${func.name}`

    // Dane strukturalne JSON-LD dla funkcji
    const structuredData = {
        "@context": "https://schema.org",
        "@graph": [
            {
                "@type": "WebPage",
                "name": brandedFunctionName,
                "url": functionUrl,
                "inLanguage": "pl",
                "description": `Wymagania i umiejętności funkcji ${func.name} w Pomocniku Skauta`,
                "isPartOf": {
                    "@type": "WebSite",
                    "name": "Pomocnik Skauta",
                    "url": SITE_URL
                }
            },
            {
                "@type": "Course",
                "name": func.name,
                "description": `Poznaj wszystkie umiejętności potrzebne do pełnienia funkcji ${func.name} w harcerstwie`,
                "provider": {
                    "@type": "Organization",
                    "name": "Pomocnik Skauta",
                    "url": SITE_URL
                },
                "about": {
                    "@type": "Thing",
                    "name": "Harcerstwo",
                    "description": "Umiejętności harcerskie i funkcje w zastępie"
                },
                "educationalLevel": "Beginner",
                "inLanguage": "pl",
                "courseCode": func.id,
                "numberOfCredits": totalSkills,
                "syllabusSections": func.skills?.map((skill: SkillCategory) => ({
                    "@type": "Syllabus",
                    "name": skill.category,
                    "description": `${skill.items?.length || 0} umiejętności w kategorii ${skill.category}`,
                    "timeRequired": "PT30M"
                }))
            }
        ]
    }

    return (
        <div className="min-h-screen bg-black">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify(structuredData)
                }}
            />
            <Navbar />
            <div className="min-h-screen max-w-6xl mx-auto px-4 py-8 pt-24">
                <div className="mb-8">
                    <Button asChild variant="ghost" className="text-neutral-400 hover:text-white hover:bg-neutral-900 mb-4 rounded-full text-sm font-medium px-4 py-1.5 h-auto">
                        <Link href="/">
                            <ArrowLeft className="h-4 w-4 mr-2" />
                            Powrót do wyboru funkcji
                        </Link>
                    </Button>

                    <div className="flex items-center gap-4 mb-4">
                        <div className={`p-4 rounded-full ${colorBg} ${colorText}`}>
                            <Icon className="h-8 w-8 select-none" aria-hidden="true" />
                        </div>
                        <div>
                            <h1 className="text-4xl font-bold text-white">{func.name}</h1>
                            <p className="text-neutral-400">{func.description || ""}</p>
                        </div>
                    </div>

                    <Badge variant="secondary" className="text-neutral-300 border-0 bg-neutral-900">
                        {totalSkills} umiejętności do opanowania
                    </Badge>
                </div>

                {/* Categories and Skills */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full items-start">
                    {/* Mobile: Card Carousel */}
                    <div className="block md:hidden space-y-4">
                        {/* Navigation */}
                        <div className="flex items-center justify-between">
                            <Button
                                variant="outline"
                                size="icon"
                                onClick={() =>
                                    setSelectedSection(prev => {
                                        if (skills.length === 0) return 0
                                        return prev > 0 ? prev - 1 : (skills.length - 1)
                                    })
                                }
                                className="bg-neutral-900 border-0 hover:bg-neutral-800"
                                aria-label="Poprzednia kategoria"
                            >
                                <ChevronLeft className="h-4 w-4 text-neutral-400" />
                            </Button>

                            <div className="text-center">
                                <p className="text-white font-medium">{selectedSkillGroup?.category || 'Brak kategorii'}</p>
                                <p className="text-neutral-400 text-sm">
                                    {skills.length === 0 ? 0 : selectedSection + 1} z {skills.length} ({Array.isArray(selectedSkillGroup?.items) ? selectedSkillGroup.items.length : 0} umiejętności)
                                </p>
                            </div>

                            <Button
                                variant="outline"
                                size="icon"
                                onClick={() =>
                                    setSelectedSection(prev => {
                                        if (skills.length === 0) return 0
                                        return prev < (skills.length - 1) ? prev + 1 : 0
                                    })
                                }
                                className="bg-neutral-900 border-0 hover:bg-neutral-800"
                                aria-label="Następna kategoria"
                            >
                                <ChevronRight className="h-4 w-4 text-neutral-400" />
                            </Button>
                        </div>

                        {/* Dots indicator */}
                        <div className="flex justify-center gap-2">
                            {skills.map((group: SkillCategory, index: number) => (
                                <button
                                    key={index}
                                    type="button"
                                    onClick={() => setSelectedSection(index)}
                                    aria-label={`Wybierz kategorię ${group.category || index + 1}`}
                                    aria-pressed={index === selectedSection}
                                    className={`w-2 h-2 rounded-full transition-colors ${index === selectedSection ? dotColorClass : 'bg-neutral-600'
                                        }`}
                                />
                            ))}
                        </div>

                        {/* Current card */}
                        {selectedSkillGroup && (
                            <Card className="bg-neutral-950 border-0">
                                <CardContent className="p-7">
                                    <div className="space-y-3">
                                        {(selectedSkillGroup.items || []).map((skill: string, idx: number) => (
                                            <div key={idx} className="flex items-center gap-3 text-neutral-300 py-1.5">
                                                <div className={`w-2 h-2 rounded-full ${dotColorClass} flex-shrink-0`} />
                                                <span>{skill}</span>
                                            </div>
                                        ))}
                                    </div>
                                </CardContent>
                            </Card>
                        )}
                    </div>

                    {/* Desktop: Original 2-column layout */}
                    <div className="hidden md:block space-y-4">
                        {selectedSkillGroup && (
                            <Card className="bg-neutral-950 border-0">
                                <CardHeader className="px-7 py-7">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-3">
                                            <CardTitle className="text-xl text-white">{selectedSkillGroup.category}</CardTitle>
                                        </div>
                                        <Badge variant="secondary" className="text-neutral-300 bg-neutral-900 border-0">
                                            {Array.isArray(selectedSkillGroup.items) ? selectedSkillGroup.items.length : 0} umiejętności
                                        </Badge>
                                    </div>
                                </CardHeader>
                                <CardContent className="pt-0 pl-7 pr-7 flex-1">
                                    <div className="space-y-3 pl-0">
                                        {(selectedSkillGroup.items || []).map((skill: string, idx: number) => (
                                            <div key={idx} className="flex items-center gap-3 text-neutral-300 py-1.5">
                                                <div className={`w-2 h-2 rounded-full ${dotColorClass} flex-shrink-0`} />
                                                <span>{skill}</span>
                                            </div>
                                        ))}
                                    </div>
                                </CardContent>
                            </Card>
                        )}
                    </div>

                    {/* Desktop: Right column (hidden on mobile) */}
                    <div className="hidden md:flex flex-col gap-4 w-full h-full">
                        {skills.map((group: SkillCategory, index: number) => (
                            <Card
                                key={index}
                                className={`bg-neutral-950 border-0 hover:bg-neutral-900 transition-colors duration-300 cursor-pointer ${index === selectedSection ? `ring-2 ${ringColorClass} ring-offset-2 ring-offset-black` : ""}`}
                            >
                                <button
                                    type="button"
                                    className="w-full rounded-2xl text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/20"
                                    onClick={() => setSelectedSection(index)}
                                    aria-label={`Wybierz kategorię ${group.category}`}
                                    aria-pressed={index === selectedSection}
                                >
                                    <CardHeader className="px-7 py-7 h-full flex items-center justify-center">
                                        <div className="flex items-center justify-between w-full">
                                            <div className="flex items-center gap-3">
                                                <ChevronRight className="h-5 w-5 text-neutral-400" aria-hidden="true" />
                                                <CardTitle className="text-xl text-white">{group.category}</CardTitle>
                                            </div>
                                            <Badge variant="secondary" className="text-neutral-300 bg-neutral-900 border-0">
                                                {Array.isArray(group.items) ? group.items.length : 0} umiejętności
                                            </Badge>
                                        </div>
                                    </CardHeader>
                                </button>
                            </Card>
                        ))}
                    </div>
                </div>

                <div className="mt-12 text-center">
                    <Button asChild variant="outline" className="text-neutral-400 hover:text-white hover:bg-neutral-900 rounded-full text-sm font-medium px-4 py-1.5 h-auto border-0">
                        <Link href="/">
                            <ArrowLeft className="h-4 w-4 mr-2" />
                            Wybierz inną funkcję
                        </Link>
                    </Button>
                </div>
            </div>

            <Suspense fallback={<div className="h-32 bg-neutral-900/50 animate-pulse" />}>
                <LazyFooter />
            </Suspense>
        </div>
    )
}