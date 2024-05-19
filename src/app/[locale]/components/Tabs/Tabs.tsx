'use client';
//* External
import { useTranslations } from 'next-intl';
import { useState } from 'react';
//* App Custom
import { PainterProps } from '../../admin/dashboard/painter/page';
import PainterGeneralData from '../PainterGeneralData/PainterGeneralData';
import PainterStudiesData from '../PainterStudiesData/PainterStudiesData';
import styles from './tabs.module.css';

interface PainterTabs {
  painter: PainterProps;
}

const PainterTabs = ({ painter }: PainterTabs) => {
  const t = useTranslations();
  const [tabSelected, setTabSelected] = useState('general');
  const tabs = ['general', 'studies'];

  return (
    <div className={styles.painter_container}>
      <div className={styles.painter_tabs}>
        {tabs.map((tab) => (
          <div
            key={tab}
            className={`${styles.painter_tab} ${
              tabSelected === tab ? styles.painter_tab_active : ''
            }`}
            onClick={() => setTabSelected(tab)}
          >
            <p>{t(`tabs.${tab}`)}</p>
          </div>
        ))}
      </div>
      <div className={styles.painter_sections}>
        {tabSelected === 'general' && <PainterGeneralData painter={painter} />}
        {tabSelected === 'studies' && <PainterStudiesData />}
      </div>
    </div>
  );
};

export default PainterTabs;
