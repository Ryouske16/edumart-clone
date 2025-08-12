import { NextRequest, NextResponse } from 'next/server'

type Message = { id: number; date: string; address: string; mobile: string; country: string }
const messages: Message[] = []
let nextId = 1

export async function GET() {
  return NextResponse.json({ messages })
}

export async function POST(req: NextRequest) {
  const body = await req.json()
  const { date, address, mobile, country } = body

  if (!date || !address || !mobile || !country) {
    return NextResponse.json({ error: 'Missing fields' }, { status: 400 })
  }

  const newMessage = {
    id: nextId++,
    date,
    address,
    mobile,
    country,
  }

  messages.unshift(newMessage)
  return NextResponse.json({ message: newMessage }, { status: 201 })
}