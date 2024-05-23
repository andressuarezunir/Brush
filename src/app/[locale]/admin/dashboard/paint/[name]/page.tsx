//* External
import { getTranslations } from 'next-intl/server';
import { Fraunces } from 'next/font/google';
import { cookies } from 'next/headers';
import Link from 'next/link';
//* App Custom
import AdminForm from '@/app/[locale]/components/AdminForm/AdminForm';
import prisma from '@/lib/prisma';
import layoutStyles from '../../layout.module.css';

const inter = Fraunces({ subsets: ['latin'] });

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
    description: t('metadata.admin_paint')
  };
}

export default async function PaintPage({ params }: Props) {
  const paint = await getPaint({ params });
  const locale = cookies().get('NEXT_LOCALE')?.value || 'es';
  const t = await getTranslations({ locale });

  return (
    <div>
      <div className={layoutStyles.dashboard_header}>
        <div>
          <h1 className={inter.className}>{t('sections.paint')}</h1>
          <div className={layoutStyles.dashboard_breadcrumb}>
            <Link href={`/${locale}/admin/dashboard/paints/`}>
              {t('sections.paints')}
            </Link>
            <p>/ {paint!.title}</p>
          </div>
        </div>
      </div>
      <AdminForm module="paint" defaultData={paint!} />
    </div>
  );
}
