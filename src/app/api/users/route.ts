import { NextResponse } from 'next/server'

let users: any[] = []
let nextId = 1

export async function GET() {
  return NextResponse.json({ users })
}

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { name, email, status } = body

    if (!name || !email) {
      return NextResponse.json({ error: 'Missing name or email' }, { status: 400 })
    }

    const newUser = {
      id: nextId++,
      name,
      email,
      status: status === 'Inactive' ? 'Inactive' : 'Active',
    }

    users.push(newUser)

    return NextResponse.json({ user: newUser }, { status: 201 })
  } catch (err) {
    return NextResponse.json({ error: 'Failed to parse request' }, { status: 500 })
  }
}
