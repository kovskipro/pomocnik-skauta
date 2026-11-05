import { NextRequest, NextResponse } from 'next/server'
import { db } from '../../../lib/db'

// 🚀 Cache response for 1 hour (3600 seconds)
export const revalidate = 3600

async function fetchFromRemoteFunctionsApi(request: NextRequest): Promise<Response | null> {
    const remoteBase = process.env.NEXT_PUBLIC_APP_URL?.trim().replace(/\/$/, '')
    if (!remoteBase) {
        return null
    }

    // Avoid recursive self-calls when URL points to current origin.
    if (remoteBase === request.nextUrl.origin) {
        return null
    }

    try {
        const response = await fetch(`${remoteBase}/api/functions`)
        if (!response.ok) {
            return null
        }
        return response
    } catch {
        return null
    }
}

export async function GET(request: NextRequest) {
    try {
        const { rows } = await db.query(
            `SELECT id, name, description, icon, color_background, color_text, color_border, skills
       FROM functions
       ORDER BY COALESCE(sort_order, 9999), name`
        )

        const functions = rows.map(row => ({
            id: row.id,
            name: row.name,
            description: row.description ?? null,
            icon: row.icon ?? null,
            color_background: row.color_background ?? null,
            color_text: row.color_text ?? null,
            color_border: row.color_border ?? null,
            skills: row.skills ?? null,
        }))

        const response = NextResponse.json(functions)

        // 🚀 Add cache headers for better performance
        response.headers.set('Cache-Control', 'public, s-maxage=3600, stale-while-revalidate=86400')

        return response
    } catch (e: any) {
        if (e && e.code === '42P01') {
            return NextResponse.json([])
        }
        if (e && e.code === '28P01') {
            const upstream = await fetchFromRemoteFunctionsApi(request)
            if (upstream) {
                return NextResponse.json(await upstream.json())
            }
            return NextResponse.json([])
        }
        console.error('Database error:', e)
        return NextResponse.json({ error: 'Database error' }, { status: 500 })
    }
}