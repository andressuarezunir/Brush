//* External
import { NextResponse } from 'next/server';
//* App Custom
import { uploadImage } from '@/app/helpers';
import prisma from '@/lib/prisma';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const title = searchParams.get('title') ?? '';
  const width = Number(searchParams.get('width') ?? '');
  const height = Number(searchParams.get('height') ?? '');

  let params = {};
  if (width) params = { ...params, width };
  if (height) params = { ...params, height };

  try {
    const paints = await prisma.paint.findMany({
      where: {
        title: { contains: title, mode: 'insensitive' },
        status: true,
        ...params
      },
      include: {
        categories: {
          select: {
            category: true
          }
        }
      }
    });
    return NextResponse.json(paints);
  } catch (error) {
    return NextResponse.json({ message: 'Error in request' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  const data = await request.formData();

  const title = (data.get('title') as string)!;
  const description = (data.get('description') as string)!;
  const width = data.get('width') || 0;
  const height = data.get('height') || 0;
  const date_start = (data.get('date_start') as string)!;
  const date_finish = (data.get('date_finish') as string)!;
  const categories = (data.get('categories') as string)!.split(',');

  const image = (data.get('image') as File)!;
  const image_url = await uploadImage(image);

  try {
    const paint = await prisma.paint.create({
      data: {
        title,
        description,
        image: image_url,
        width: Number(width),
        height: Number(height),
        date_start: new Date(date_start),
        date_finish: new Date(date_finish),
        on_sale: false,
        status: true
      }
    });
    const categoriesLinkedToExperience = categories.map((category) => ({
      paint_id: paint.id,
      category_id: Number(category)
    }));
    await prisma.categoriesOnPaint.createMany({
      data: categoriesLinkedToExperience
    });
    return NextResponse.json({ paint });
  } catch (error) {
    return NextResponse.json(
      { message: 'Something went wrong' },
      { status: 500 }
    );
  }
}
