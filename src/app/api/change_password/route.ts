import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function PATCH(request: Request) {
  const { searchParams } = new URL(request.url);
  const token = searchParams.get('token') ?? '';
  const email = searchParams.get('email') ?? '';

  if (token && email) {
    const { password, verify_password } = await request.json();
    if (password === verify_password) {
      await prisma.user.update({
        where: { email },
        data: { password }
      });
      await prisma.resetPassword.update({
        where: { token },
        data: { status: true }
      });
      return NextResponse.json({ message: 'Password updated' });
    } else {
      return NextResponse.json(
        { message: 'Credentials do not match' },
        { status: 400 }
      );
    }
  } else {
    return NextResponse.json({ message: 'Token not found' }, { status: 400 });
  }
}
