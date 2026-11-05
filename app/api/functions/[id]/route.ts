import { NextRequest, NextResponse } from 'next/server'
import { db } from '../../../../lib/db'

// 🚀 Cache individual function data for 1 hour
export const revalidate = 3600

async function fetchFromRemoteFunctionApi(request: NextRequest, id: string): Promise<Response | null> {
    const remoteBase = process.env.NEXT_PUBLIC_APP_URL?.trim().replace(/\/$/, '')
    if (!remoteBase) {
        return null
    }

    // Avoid recursive self-calls when URL points to current origin.
    if (remoteBase === request.nextUrl.origin) {
        return null
    }

    try {
        const response = await fetch(`${remoteBase}/api/functions/${id}`)
        if (!response.ok) {
            return null
        }
        return response
    } catch {
        return null
    }
}

export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    try {
        // W Next.js 16 params jest Promise i musi być await-owany
        const { id } = await params

        const { rows } = await db.query(
            `SELECT id, name, description, icon, color_background, color_text, color_border, skills
       FROM functions WHERE id = $1 LIMIT 1`,
            [id]
        )

        if (!rows[0]) {
            return NextResponse.json({ error: 'Function not found' }, { status: 404 })
        }

        const func = {
            id: rows[0].id,
            name: rows[0].name,
            description: rows[0].description ?? null,
            icon: rows[0].icon ?? null,
            color_background: rows[0].color_background ?? null,
            color_text: rows[0].color_text ?? null,
            color_border: rows[0].color_border ?? null,
            skills: rows[0].skills ?? null,
        }

        const response = NextResponse.json(func)

        // 🚀 Add cache headers
        response.headers.set('Cache-Control', 'public, s-maxage=3600, stale-while-revalidate=86400')

        return response
    } catch (e: any) {
        if (e && e.code === '42P01') {
            return NextResponse.json({ error: 'Function not found' }, { status: 404 })
        }
        if (e && e.code === '28P01') {
            const { id } = await params
            const upstream = await fetchFromRemoteFunctionApi(request, id)
            if (upstream) {
                return NextResponse.json(await upstream.json())
            }
            return NextResponse.json({ error: 'Database unavailable' }, { status: 503 })
        }
        console.error('Database error:', e)
        return NextResponse.json({ error: 'Database error' }, { status: 500 })
    }
}