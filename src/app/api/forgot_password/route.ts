import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const email = searchParams.get('email') ?? '';

  const user = await prisma.user.findUnique({ where: { email } });
  if (user) {
    const { token } = await prisma.resetPassword.create({ data: {} });
    return NextResponse.json({ token, email: user.email });
  } else {
    return NextResponse.json(
      { error_message: 'User not found' },
      { status: 400 }
    );
  }
}
