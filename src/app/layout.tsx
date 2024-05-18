import type { Metadata } from 'next';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { Mulish } from 'next/font/google';

import { cookies } from 'next/headers';
import LanguageSwitcher from './[locale]/components/LanguageSwitcher/LanguageSwitcher';
import styles from './globals.module.css';

const inter = Mulish({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Brush',
  description: 'Esta página está dedicada a mostrar el arte del pintor'
};

interface Props {
  children: React.ReactNode;
}

export default async function RootLayout({ children }: Props) {
  const cookieStore = cookies();
  const locale = cookieStore.get('NEXT_LOCALE')?.value || 'es';
  const messages = await getMessages();

  return (
    <html lang={locale} className={styles.html_global}>
      <body className={inter.className}>
        <NextIntlClientProvider messages={messages}>
          {children}
          <LanguageSwitcher />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
