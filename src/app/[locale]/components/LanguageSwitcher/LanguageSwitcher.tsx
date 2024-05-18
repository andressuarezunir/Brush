"use client";
import { useLocale, useTranslations } from "next-intl";
import { usePathname, useRouter } from "next/navigation";
import { ChangeEvent, useTransition } from "react";

import styles from "./LanguageSwitcher.module.css";

const LanguageSwitcher = () => {
  const router = useRouter();
  const t = useTranslations();
  const pathname = usePathname();
  const localActive = useLocale();
  const [isPending, startTransition] = useTransition();

  const onSelectChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const locale = e.target.value;
    const newPathname = pathname.replace(/^\/\w+/, "/" + locale);

    startTransition(() => router.replace(newPathname));
  };

  return (
    <label className={styles.language_switcher}>
      <p className={styles.label}>{t("change_language")}</p>
      <select
        defaultValue={localActive}
        onChange={onSelectChange}
        disabled={isPending}
      >
        <option value="en">{t("languages.english")}</option>
        <option value="es">{t("languages.spanish")}</option>
      </select>
    </label>
  );
};

export default LanguageSwitcher;
