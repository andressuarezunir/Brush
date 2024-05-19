import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { Mulish } from 'next/font/google';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { cookies } from 'next/headers';
import LanguageSwitcher from './[locale]/components/LanguageSwitcher/LanguageSwitcher';
import styles from './globals.module.css';

const inter = Mulish({ subsets: ['latin'] });

interface Props {
  children: React.ReactNode;
}

export default async function RootLayout({ children }: Props) {
  const locale = cookies().get('NEXT_LOCALE')?.value || 'es';
  const messages = await getMessages();

  return (
    <html lang={locale} className={styles.html_global}>
      <body className={inter.className}>
        <NextIntlClientProvider messages={messages}>
          <ToastContainer position="top-right" autoClose={5000} pauseOnHover />
          {children}
          <LanguageSwitcher />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
