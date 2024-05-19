import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const email = searchParams.get('email') ?? '';
  const password = searchParams.get('password') ?? '';

  const user = await prisma.user.findUnique({
    where: {
      email,
      password
    }
  });
  if (user) return NextResponse.json(user);
  else {
    return NextResponse.json(
      { error_message: 'User not found' },
      { status: 400 }
    );
  }
}
