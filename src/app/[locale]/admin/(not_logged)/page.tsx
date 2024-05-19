import { useLocale } from 'next-intl';
import { redirect } from 'next/navigation';

export default function Home() {
  const localActive = useLocale();
  redirect(`/${localActive}/admin/login`);
}
