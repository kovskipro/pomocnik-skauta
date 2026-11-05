import "server-only"

import { unstable_cache } from "next/cache"
import { db } from "@/lib/db"
import type { FunctionRecord } from "@/lib/functions"

type FunctionRow = {
  id: string
  name: string
  description: string | null
  icon: string | null
  color_background: string | null
  color_text: string | null
  color_border: string | null
  skills: FunctionRecord["skills"]
}

function mapFunctionRow(row: FunctionRow): FunctionRecord {
  return {
    id: row.id,
    name: row.name,
    description: row.description ?? null,
    icon: row.icon ?? null,
    color_background: row.color_background ?? null,
    color_text: row.color_text ?? null,
    color_border: row.color_border ?? null,
    skills: row.skills ?? null,
  }
}

async function fetchFromRemoteFunctionsApi(): Promise<FunctionRecord[] | null> {
  const remoteBase = process.env.NEXT_PUBLIC_APP_URL?.trim().replace(/\/$/, "")
  if (!remoteBase) {
    return null
  }

  try {
    const response = await fetch(`${remoteBase}/api/functions`)
    if (!response.ok) {
      return null
    }
    return await response.json()
  } catch {
    return null
  }
}

async function fetchFromRemoteFunctionApi(
  id: string
): Promise<FunctionRecord | null> {
  const remoteBase = process.env.NEXT_PUBLIC_APP_URL?.trim().replace(/\/$/, "")
  if (!remoteBase) {
    return null
  }

  try {
    const response = await fetch(`${remoteBase}/api/functions/${id}`)
    if (!response.ok) {
      return null
    }
    return await response.json()
  } catch {
    return null
  }
}

async function fetchAllFunctions(): Promise<FunctionRecord[]> {
  try {
    const { rows } = await db.query(
      `SELECT id, name, description, icon, color_background, color_text, color_border, skills
       FROM functions
       ORDER BY COALESCE(sort_order, 9999), name`
    )

    return rows.map(mapFunctionRow)
  } catch (error) {
    const err = error as { code?: string }
    if (err.code === "28P01") {
      const upstream = await fetchFromRemoteFunctionsApi()
      if (upstream) {
        return upstream
      }
      return []
    }
    console.error("Error fetching functions from database:", error)
    return []
  }
}

const getAllFunctionsCached = unstable_cache(
  fetchAllFunctions,
  ["functions-all"],
  { revalidate: 300 }
)

export async function getAllFunctions(): Promise<FunctionRecord[]> {
  return getAllFunctionsCached()
}

async function fetchFunctionById(id: string): Promise<FunctionRecord | null> {
  try {
    const { rows } = await db.query(
      `SELECT id, name, description, icon, color_background, color_text, color_border, skills
       FROM functions
       WHERE id = $1
       LIMIT 1`,
      [id]
    )

    if (!rows[0]) {
      return null
    }

    return mapFunctionRow(rows[0])
  } catch (error) {
    const err = error as { code?: string }
    if (err.code === "28P01") {
      const upstream = await fetchFromRemoteFunctionApi(id)
      if (upstream) {
        return upstream
      }
      return null
    }
    console.error("Error fetching function from database:", error)
    return null
  }
}

const getFunctionByIdCached = unstable_cache(
  fetchFunctionById,
  ["function-by-id"],
  { revalidate: 300 }
)

export async function getFunctionById(id: string): Promise<FunctionRecord | null> {
  return getFunctionByIdCached(id)
}
