import { NextResponse } from 'next/server'

export async function GET(request: Request) {
    

  return NextResponse.json('Success Get', { status: 200 })
}

export async function POST(request: Request) {
  const data = await request.json()



  return NextResponse.json('Success Post', { status: 200 })
}
