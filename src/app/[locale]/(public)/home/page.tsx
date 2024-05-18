import { useTranslations } from 'next-intl';

export default function NamePage() {
  const t = useTranslations();

  return (
    <div>
      <h1>Hello Page</h1>
      <p>{t('test')}</p>
    </div>
  );
}
