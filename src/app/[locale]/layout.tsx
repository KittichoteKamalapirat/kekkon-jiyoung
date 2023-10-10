import { NextIntlClientProvider } from "next-intl";
import { notFound } from "next/navigation";
import { ReactNode } from "react";

export function generateStaticParams() {
  return [{ locale: "en" }, { locale: "es" }, { locale: "ja" }];
}

export const revalidate = 0;

interface Props {
  children: ReactNode;
  params: { locale: string };
}
export default async function LocaleLayout({
  children,
  params: { locale },
}: Props) {
  let messages;
  try {
    messages = (await import(`../../messages/${locale}.json`)).default;
    console.log("messages", messages);
  } catch (error) {
    notFound();
  }

  return (
    <html lang={locale}>
      <body>
        <NextIntlClientProvider locale={locale} messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
