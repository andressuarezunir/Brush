//* External
import { Segment } from 'next/dist/server/app-render/types';
import { NextResponse } from 'next/server';
//* App Custom
import { uploadImage } from '@/app/helpers/uploadImage';
import prisma from '@/lib/prisma';

export async function GET(_: Request, { params }: Segment) {
  try {
    const experience = await prisma.experience.findFirst({
      where: { title: { contains: params.value, mode: 'insensitive' } },
      include: { categories: { select: { category: true } } }
    });
    return NextResponse.json(experience);
  } catch (error) {
    return NextResponse.json({ message: 'Error in request' }, { status: 500 });
  }
}

export async function PATCH(request: Request, { params }: Segment) {
  const data = await request.formData();

  const title = data.get('title') as string;
  const description = data.get('description') as string;
  const image = data.get('image') as File;
  const status = data.get('status');

  let image_url;
  if (image) {
    image_url = await uploadImage(image);
  }

  let dataUpdated = {};
  if (title) dataUpdated = { ...dataUpdated, title };
  if (description) dataUpdated = { ...dataUpdated, description };
  if (image_url) dataUpdated = { ...dataUpdated, image: image_url };
  if (status) {
    dataUpdated = { ...dataUpdated, status: status === 'true' };
  }

  try {
    const experience = await prisma.experience.update({
      where: { id: Number(params.value) },
      data: dataUpdated
    });
    return NextResponse.json(experience);
  } catch (error) {
    return NextResponse.json({ message: 'Error in request' }, { status: 500 });
  }
}
