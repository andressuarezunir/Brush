import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const data = await request.json();

  try {
    const contact = await prisma.contact.create({ data });
    return NextResponse.json(contact);
  } catch (error) {
    return NextResponse.json({ message: 'Error in request' }, { status: 500 });
  }
}
