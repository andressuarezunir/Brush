import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function GET(_: Request) {
  try {
    const studies = await prisma.studyCategory.findMany({
      include: { study: true }
    });
    return NextResponse.json(studies);
  } catch (error) {
    return NextResponse.json(
      { message: 'Error in request', error },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  const data = await request.json();

  try {
    const study = await prisma.study.create({ data });
    return NextResponse.json(study);
  } catch (error) {
    return NextResponse.json(
      { message: 'Error in request', error },
      { status: 500 }
    );
  }
}
