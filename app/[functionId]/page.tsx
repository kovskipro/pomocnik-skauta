import { Metadata } from "next"
import { notFound } from "next/navigation"
import { getAllFunctions, getFunctionById } from "@/lib/functions-server"
import { countSkills } from "@/lib/functions"
import { SITE_URL } from "@/lib/site"
import { FunctionPageClient } from "./function-page-client"

// Generowanie dynamicznych metadanych dla SEO
export async function generateMetadata({ params }: { params: Promise<{ functionId: string }> }): Promise<Metadata> {
    const resolvedParams = await params
    const func = await getFunctionById(resolvedParams.functionId)

    if (!func) {
        return {
            title: "Funkcja nie znaleziona - Pomocnik Skauta",
            description: "Funkcja harcerska nie została znaleziona. Wróć do strony głównej aby wybrać dostępną funkcję.",
            robots: {
                index: false,
                follow: false,
            }
        }
    }

    const totalSkills = countSkills(func.skills)
    const skillCategories = func.skills?.map(skill => skill.category).join(", ") || ""
    const functionName = func.name.trim()
    const functionSlugName = resolvedParams.functionId.replace(/-/g, " ")
    const brandedFunctionQuery = `Pomocnik Skauta ${functionName}`

    const title = `${brandedFunctionQuery} - wymagania i umiejętności funkcji`
    const description = `${brandedFunctionQuery}. Poznaj wymagania i umiejętności potrzebne do pełnienia funkcji ${functionName} w zastępie. ${totalSkills} umiejętności w kategoriach: ${skillCategories}.`
    const keywords = Array.from(new Set([
        brandedFunctionQuery.toLowerCase(),
        `pomocnik skauta ${functionSlugName}`.toLowerCase(),
        `${functionName} funkcja harcerska`.toLowerCase(),
        "pomocnik skauta funkcje",
        "funkcje harcerskie",
        "umiejętności harcerskie",
        "harcerstwo",
        "scouting",
        "zhp",
        "przewodnik harcerski",
    ]))

    return {
        title,
        description,
        keywords,
        robots: {
            index: true,
            follow: true,
            googleBot: {
                index: true,
                follow: true,
                "max-image-preview": "large",
                "max-snippet": -1,
                "max-video-preview": -1,
            },
        },
        openGraph: {
            title,
            description,
            type: "article",
            url: `${SITE_URL}/${resolvedParams.functionId}`,
            siteName: "Pomocnik Skauta",
            locale: "pl_PL",
            images: [
                {
                    url: `${SITE_URL}/croix-agse.png`,
                    width: 64,
                    height: 64,
                    alt: `${brandedFunctionQuery} - wymagania i umiejętności`
                }
            ]
        },
        twitter: {
            card: "summary_large_image",
            title,
            description,
            images: [`${SITE_URL}/croix-agse.png`]
        },
        category: "Harcerstwo",
        alternates: {
            canonical: `${SITE_URL}/${resolvedParams.functionId}`
        }
    }
}

// Statyczne ścieżki dla lepszego SEO
export async function generateStaticParams() {
    const functions = await getAllFunctions()

    return functions.map((func) => ({
        functionId: func.id
    }))
}

export default async function FunctionPage({ params }: { params: Promise<{ functionId: string }> }) {
    const resolvedParams = await params
    const func = await getFunctionById(resolvedParams.functionId)

    if (!func) {
        notFound()
    }

    return <FunctionPageClient func={func} />
}

