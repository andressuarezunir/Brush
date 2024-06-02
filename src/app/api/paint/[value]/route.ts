//* External
import { Segment } from 'next/dist/server/app-render/types';
import { NextResponse } from 'next/server';
//* App Custom
import { uploadImage } from '@/app/helpers/uploadImage';
import prisma from '@/lib/prisma';

export async function GET(_: Request, { params }: Segment) {
  try {
    const paint = await prisma.paint.findFirst({
      where: {
        title: { contains: params.value, mode: 'insensitive' },
        deleted: false
      },
      include: { categories: { select: { category: true } } }
    });
    if (paint !== null) {
      return NextResponse.json(paint);
    } else
      return NextResponse.json(
        { message: 'There is no paint' },
        { status: 500 }
      );
  } catch (error) {
    return NextResponse.json({ message: 'Error in request' }, { status: 500 });
  }
}

export async function PATCH(request: Request, { params }: Segment) {
  const data = await request.formData();

  const title = data.get('title') as string;
  const description = data.get('description') as string;
  const image = data.get('image') as File;
  const width = data.get('width');
  const height = data.get('height');
  const date_start = data.get('date_start') as string;
  const date_finish = data.get('date_finish') as string;
  const status = data.get('status');
  const on_sale = data.get('on_sale');
  const categories = data.get('categories');

  let image_url;
  if (image) {
    image_url = await uploadImage(image);
  }

  let dataUpdated = {};
  if (title) dataUpdated = { ...dataUpdated, title };
  if (width) dataUpdated = { ...dataUpdated, width: Number(width) };
  if (height) dataUpdated = { ...dataUpdated, width: Number(height) };
  if (date_start) {
    dataUpdated = { ...dataUpdated, date_start: new Date(date_start) };
  }
  if (date_finish) {
    dataUpdated = { ...dataUpdated, date_finish: new Date(date_finish) };
  }
  if (description) dataUpdated = { ...dataUpdated, description };
  if (image_url) dataUpdated = { ...dataUpdated, image: image_url };
  if (status) {
    dataUpdated = { ...dataUpdated, status: status === '1' };
  }
  if (on_sale) {
    dataUpdated = { ...dataUpdated, on_sale: on_sale === '1' };
  }

  try {
    const paint = await prisma.paint.update({
      where: { id: Number(params.value) },
      data: dataUpdated
    });
    if (categories) {
      await prisma.categoriesOnPaint.deleteMany({
        where: { paint_id: Number(params.value) }
      });
      await prisma.categoriesOnPaint.create({
        data: {
          paint_id: paint.id,
          category_id: Number(categories)
        }
      });
    }

    return NextResponse.json(paint);
  } catch (error) {
    return NextResponse.json({ message: 'Error in request' }, { status: 500 });
  }
}

export async function DELETE(_: Request, { params }: Segment) {
  try {
    const paint = await prisma.paint.update({
      where: { id: Number(params.value) },
      data: { deleted: true }
    });
    return NextResponse.json(paint);
  } catch (error) {
    return NextResponse.json({ message: 'Error in request' }, { status: 500 });
  }
}
