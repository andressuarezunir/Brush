//* External
import { getTranslations } from 'next-intl/server';
import { cookies } from 'next/headers';
//* App Custom
import prisma from '@/lib/prisma';
import globalStyles from '../../../globals.module.css';
import ContactBanner from '../../components/ContactBanner/ContactBanner';
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

export default async function PaintsPage() {
  const locale = cookies().get('NEXT_LOCALE')?.value || 'es';
  const t = await getTranslations({ locale });

  const paints = await prisma.paint.findMany({
    include: { categories: { select: { category: true } } },
    where: { status: true, deleted: false }
  });

  return (
    <div className={globalStyles.public_container}>
      <SectionBanner title={t('sections.paints')} />
      <div className={globalStyles.public_container_width}>
        <div className={styles.page_container}>
          <PaintCards data={paints} />
        </div>
      </div>
      <ContactBanner />
    </div>
  );
}
