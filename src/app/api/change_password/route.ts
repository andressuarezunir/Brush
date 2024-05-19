import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function PATCH(request: Request) {
  const { searchParams } = new URL(request.url);
  const token = searchParams.get('token') ?? '';
  const email = searchParams.get('email') ?? '';

  if (token && email) {
    const tokenObtained = await prisma.resetPassword.findUnique({
      where: { token, status: false }
    });
    if (tokenObtained) {
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
        return NextResponse.json({
          success_message: 'Password updated, you can log with the new one'
        });
      } else {
        return NextResponse.json(
          { error_message: 'Passwords do not match' },
          { status: 400 }
        );
      }
    } else {
      return NextResponse.json(
        { error_message: 'Token is no longer available' },
        { status: 400 }
      );
    }
  } else {
    return NextResponse.json(
      { error_message: 'Credentials were not found' },
      { status: 400 }
    );
  }
}
