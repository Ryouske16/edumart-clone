import { NextResponse } from 'next/server'

type User = { id: number; name: string; email: string; status: 'Active' | 'Inactive' }
const users: User[] = []
let nextId = 1

export async function GET() {
  return NextResponse.json({ users })
}

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { name, email, status: rawStatus } = body

if (!name || !email || !rawStatus) {
  return NextResponse.json({ error: 'Missing fields' }, { status: 400 })
}

if (rawStatus !== 'Active' && rawStatus !== 'Inactive') {
  return NextResponse.json({ error: 'Invalid status value' }, { status: 400 })
}

const newUser = {
  id: nextId++,
  name,
  email,
  status: rawStatus as 'Active' | 'Inactive',
}

    if (!name || !email) {
      return NextResponse.json({ error: 'Missing name or email' }, { status: 400 })
    }

    users.push(newUser)

    return NextResponse.json({ user: newUser }, { status: 201 })
  } catch {
    return NextResponse.json({ error: 'Failed to parse request' }, { status: 500 })
  }
}
