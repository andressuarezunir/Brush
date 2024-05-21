//* External
import { getTranslations } from 'next-intl/server';
import { cookies } from 'next/headers';
import Image from 'next/image';
//* App Custom
import PainterTabs from '@/app/[locale]/components/PainterTabs/PainterTabs';
import prisma from '@/lib/prisma';
import layoutStyles from '../layout.module.css';
import styles from './painter.module.css';

export async function generateMetadata() {
  const locale = cookies().get('NEXT_LOCALE')?.value || 'es';
  const t = await getTranslations({ locale });
  return {
    title: `Brush - ${t('sections.painter')}`,
    description: t('metadata.admin_painter')
  };
}

export default async function PainterPage() {
  const locale = cookies().get('NEXT_LOCALE')?.value || 'es';
  const t = await getTranslations({ locale });
  const painter = (await prisma.painter.findUnique({ where: { id: 1 } })) || {
    id: 1,
    name: '',
    last_name: '',
    image: '',
    welcome_message: '',
    description: ''
  };
  const studies =
    (await prisma.studyCategory.findMany({
      include: { study: { where: { status: true, deleted: false } } }
    })) || [];

  return (
    <div>
      <div className={layoutStyles.dashboard_header}>
        <h1>{t('sections.painter')}</h1>
      </div>
      <div className={styles.painter_divider}>
        <div className={styles.painter_card}>
          <Image
            src={`${painter!.image}`}
            alt="painter img"
            width={130}
            height={130}
            className={styles.painter_image}
          />
          <p className={styles.painter_name}>
            {painter!.name} {painter!.last_name}
          </p>
        </div>
        <PainterTabs painter={painter} studies={studies} />
      </div>
    </div>
  );
}
