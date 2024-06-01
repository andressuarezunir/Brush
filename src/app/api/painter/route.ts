//* External
import { NextResponse } from 'next/server';
//* App Custom
import { uploadImage } from '@/app/helpers/uploadImage';
import prisma from '@/lib/prisma';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = Number(searchParams.get('id') ?? '1');

  const user = await prisma.painter.findUnique({ where: { id } });
  if (user) return NextResponse.json(user);
  else {
    return NextResponse.json(
      { error_message: 'Painter not found' },
      { status: 400 }
    );
  }
}

export async function PATCH(request: Request) {
  const data = await request.formData();

  const id = data.get('painter_id') as string;
  const name = data.get('name') as string;
  const last_name = data.get('last_name') as string;
  const image = data.get('image') as File;
  const welcome_message = data.get('welcome_message') as string;
  const description = data.get('description') as string;

  let image_url;
  if (image) {
    image_url = await uploadImage(image);
  }

  let dataUpdated = {};
  if (name) dataUpdated = { ...dataUpdated, name };
  if (last_name) dataUpdated = { ...dataUpdated, last_name };
  if (welcome_message) dataUpdated = { ...dataUpdated, welcome_message };
  if (description) dataUpdated = { ...dataUpdated, description };
  if (image_url) dataUpdated = { ...dataUpdated, image: image_url };

  try {
    const painterUpdated = await prisma.painter.update({
      where: { id: Number(id) },
      data: dataUpdated
    });
    return NextResponse.json(painterUpdated);
  } catch (error) {
    return NextResponse.json(
      { error_message: 'Painter general data not updated' },
      { status: 400 }
    );
  }
}
