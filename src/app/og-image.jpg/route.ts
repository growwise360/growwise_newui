import { readFile } from 'node:fs/promises'
import path from 'node:path'

export async function GET(): Promise<Response> {
  const imagePath = path.join(process.cwd(), 'public', 'assets', 'students_growwise.webp')
  const image = await readFile(imagePath)

  return new Response(image, {
    headers: {
      'Content-Type': 'image/webp',
      'Cache-Control': 'public, max-age=86400, s-maxage=86400',
    },
  })
}

export const dynamic = 'force-static'
