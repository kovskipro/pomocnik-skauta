import { MetadataRoute } from "next"
import { getAllFunctions } from "@/lib/functions-server"
import { SITE_URL } from "@/lib/site"

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const functions = await getAllFunctions()
    const currentDate = new Date().toISOString()

    // Strona główna
    const routes = [
        {
            url: SITE_URL,
            lastModified: currentDate,
            changeFrequency: 'weekly' as const,
            priority: 1.0,
        }
    ]

    // Dodaj wszystkie strony funkcji
    const functionRoutes = functions.map((func) => ({
        url: `${SITE_URL}/${func.id}`,
        lastModified: currentDate,
        changeFrequency: 'weekly' as const,
        priority: 0.9,
    }))

    return [...routes, ...functionRoutes]
}