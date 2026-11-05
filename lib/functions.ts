export type SkillCategory = {
    category: string
    items: string[]
}

export type FunctionRecord = {
    id: string
    name: string
    description: string | null
    icon: string | null
    color_background: string | null
    color_text: string | null
    color_border: string | null
    skills: SkillCategory[] | null
}

export function countSkills(skills: SkillCategory[] | null | undefined): number {
    if (!skills) return 0
    return skills.reduce((sum, cat) => sum + (Array.isArray(cat.items) ? cat.items.length : 0), 0)
}

function getApiUrl(path: string): string {
    // In browser prefer same-origin API routes.
    if (typeof window !== "undefined") {
        return path
    }

    const baseUrl = process.env.NEXT_PUBLIC_APP_URL?.trim()
    if (baseUrl) {
        return `${baseUrl.replace(/\/$/, "")}${path}`
    }

    return `http://localhost:3000${path}`
}

// Client-side functions that call API routes
export async function getAllFunctions(): Promise<FunctionRecord[]> {
    try {
        const response = await fetch(getApiUrl('/api/functions'))
        if (!response.ok) {
            console.error('Failed to fetch functions')
            return []
        }
        return await response.json()
    } catch (error) {
        console.error('Error fetching functions:', error)
        return []
    }
}

export async function getFunctionById(id: string): Promise<FunctionRecord | null> {
    try {
        const response = await fetch(getApiUrl(`/api/functions/${id}`))
        if (!response.ok) {
            return null
        }
        return await response.json()
    } catch (error) {
        console.error('Error fetching function:', error)
        return null
    }
}