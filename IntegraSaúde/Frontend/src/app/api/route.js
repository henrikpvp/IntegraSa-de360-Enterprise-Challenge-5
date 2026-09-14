import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({
    status: 'UP',
    system: 'IntegraSaúde 360 BFF',
    timestamp: new Date().toISOString(),
  });
}