//* External
import { NextResponse } from 'next/server';
//* App Custom
import { uploadImage } from '@/app/helpers/uploadImage';
import prisma from '@/lib/prisma';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const title = searchParams.get('title') ?? '';
  const date_updated = searchParams.get('date_updated') ?? '';

  let params = {};
  if (date_updated) {
    const dateFormatted = new Date(date_updated);
    const nextDateFormatted = new Date(
      dateFormatted.setDate(dateFormatted.getDate() + 1)
    );
    params = {
      ...params,
      date_updated: {
        gte: new Date(date_updated),
        lte: nextDateFormatted
      }
    };
  }

  try {
    const experiences = await prisma.experience.findMany({
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
    return NextResponse.json(experiences);
  } catch (error) {
    return NextResponse.json({ message: 'Error in request' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  const data = await request.formData();

  const title = (data.get('title') as string)!;
  const description = (data.get('description') as string)!;
  const image = (data.get('image') as File)!;
  const categories = (data.get('categories') as string)!.split(',');
  const image_url = await uploadImage(image);

  try {
    const experience = await prisma.experience.create({
      data: {
        title,
        description,
        image: image_url,
        status: true
      }
    });
    const categoriesLinkedToExperience = categories.map((category) => ({
      experience_id: experience.id,
      category_id: Number(category)
    }));
    await prisma.categoriesOnExperience.createMany({
      data: categoriesLinkedToExperience
    });

    return NextResponse.json({ experience });
  } catch (error) {
    return NextResponse.json(
      { message: 'Something went wrong' },
      { status: 500 }
    );
  }
}
