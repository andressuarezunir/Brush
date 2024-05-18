import prisma from '@/lib/prisma';
import { Segment } from 'next/dist/server/app-render/types';
import { NextResponse } from 'next/server';

export async function PATCH(_: Request, { params }: Segment) {
  try {
    const contact = await prisma.contact.update({
      where: { id: Number(params.id) },
      data: { contacted: true }
    });
    return NextResponse.json(contact);
  } catch (error) {
    return NextResponse.json({ message: 'Error in request' }, { status: 500 });
  }
}
