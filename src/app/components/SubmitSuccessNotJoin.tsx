"use client";

import clsx from "clsx";
import Image from "next/image";

import { useTranslations } from "next-intl";

interface Props {
  className?: string;
}
const SubmitSuccessNotJoin = ({ className }: Props) => {
  const t = useTranslations("rsvp");
  return (
    <div
      className={clsx(
        "text-center container py-12 ",

        className
      )}
    >
      <h1 className="text-lg font-bold">{t("afterSubmitTitle")}</h1>
      <p className="mt-2">{t("afterSubmitDescriptionNotJoin")}</p>
      <div className="relative w-fit mx-auto">
        <Image
          alt="Japanese"
          src="/images/submit-success-desktop.webp"
          width={400}
          height={100}
          className="rounded-lg mt-4 hidden lg:block lg:w-[600px]"
        />
        <Image
          alt="Japanese"
          src="/images/submit-success-mobile.webp"
          width={400}
          height={100}
          className="rounded-lg mt-4 w-full lg:hidden"
        />
      </div>
    </div>
  );
};
export default SubmitSuccessNotJoin;
