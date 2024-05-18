import { useTranslations } from "next-intl";

export default function Home() {
  const t = useTranslations();
  return (
    <main>
      <div>
        <p>{t("test")}</p>
      </div>
    </main>
  );
}
