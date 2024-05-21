//* External
import { getTranslations } from 'next-intl/server';
import { cookies } from 'next/headers';
//* App Custom
import SectionBanner from '@/app/[locale]/components/SectionBanner/SectionBanner';
import prisma from '@/lib/prisma';

interface Props {
  params: { name: string };
}

const getPaint = async ({ params }: Props) => {
  const id = Number(params.name.split('_')[0]);
  const paint = await prisma.paint.findFirst({
    include: { categories: { select: { category: true } } },
    where: { id }
  });
  return paint;
};

export async function generateMetadata({ params }: Props) {
  const locale = cookies().get('NEXT_LOCALE')?.value || 'es';
  const t = await getTranslations({ locale });
  const paint = await getPaint({ params });
  return {
    title: `Brush - ${paint!.title}`,
    description: t('metadata.public_paint')
  };
}

export default async function PaintPublicPage({ params }: Props) {
  const locale = cookies().get('NEXT_LOCALE')?.value || 'es';
  const t = await getTranslations({ locale });
  const paint = await getPaint({ params });

  return (
    <>
      <SectionBanner
        title={paint!.title}
        breadcrumb={{ text: t('sections.paints'), link: `/${locale}/paints` }}
      />
      <h1>Hello Page</h1>
    </>
  );
}
