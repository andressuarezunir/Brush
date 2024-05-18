import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = Number(searchParams.get('id') ?? '1');

  const user = await prisma.painter.findUnique({ where: { id } });
  if (user) return NextResponse.json(user);
  else {
    return NextResponse.json({ message: 'Painter not found' }, { status: 400 });
  }
}
