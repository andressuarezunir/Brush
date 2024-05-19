import prisma from '@/lib/prisma';
import { Segment } from 'next/dist/server/app-render/types';
import { NextResponse } from 'next/server';

export async function PATCH(request: Request, { params }: Segment) {
  const data = await request.json();

  try {
    const study = await prisma.study.update({
      where: { id: Number(params.id) },
      data
    });
    return NextResponse.json(study);
  } catch (error) {
    return NextResponse.json(
      { error_message: 'Study could not be updated or deleted' },
      { status: 500 }
    );
  }
}
