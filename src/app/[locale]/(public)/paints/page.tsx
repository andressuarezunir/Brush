//* External
import { getTranslations } from 'next-intl/server';
import { cookies } from 'next/headers';

//* App Custom
import prisma from '@/lib/prisma';
import globalStyles from '../../../globals.module.css';
import ContactBanner from '../../components/ContactBanner/ContactBanner';
import FilterRegistries from '../../components/FilterRegistries/FilterRegistries';
import PaintCards from '../../components/PaintCards/PaintCards';
import SectionBanner from '../../components/SectionBanner/SectionBanner';
import styles from './paints.module.css';

export async function generateMetadata() {
  const locale = cookies().get('NEXT_LOCALE')?.value || 'es';
  const t = await getTranslations({ locale });
  return {
    title: `Brush - ${t('sections.paints')}`,
    description: t('metadata.public_paints')
  };
}

interface Props {
  params: { slug: string };
  searchParams?: { [key: string]: string | string[] | undefined };
}

export default async function PaintsPage({ params, searchParams }: Props) {
  const locale = cookies().get('NEXT_LOCALE')?.value || 'es';
  const t = await getTranslations({ locale });
  let titleParam = {};
  if (searchParams?.title) {
    titleParam = {
      title: { contains: searchParams?.title, mode: 'insensitive' }
    };
  }
  const paints = await prisma.paint.findMany({
    include: { categories: { select: { category: true } } },
    where: {
      status: true,
      deleted: false,
      ...titleParam
    },
    orderBy: { date_finish: 'desc' }
  });

  return (
    <div className={globalStyles.public_container}>
      <SectionBanner title={t('sections.paints')} />
      <div className={globalStyles.public_container_width}>
        <div className={styles.page_container}>
          <FilterRegistries module="paint" />
          {paints.length > 0 ? (
            <PaintCards data={paints} />
          ) : (
            <div className={styles.no_data_container}>
              <p>{t('there_is_no_registries_in_this_section')}</p>
            </div>
          )}
        </div>
      </div>
      <ContactBanner />
    </div>
  );
}
