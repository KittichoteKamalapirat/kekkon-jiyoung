"use client";

import clsx from "clsx";
import Image from "next/image";

import { useTranslations } from "next-intl";

interface Props {
  className?: string;
}
const SubmitSuccess = ({ className }: Props) => {
  const t = useTranslations("rsvp");
  return (
    <div
      className={clsx(
        "text-center container py-12 ",

        className
      )}
    >
      <h1 className="text-lg font-bold">{t("afterSubmitTitle")}</h1>
      <p className="mt-2">{t("afterSubmitDescription")}</p>
      <div className="relative w-fit mx-auto">
        <p
          className={clsx(
            "absolute animate-wiggle-heavy",
            "top-[-20px] left-[-20px] text-[40px]",
            "lg:top-[-40px] lg:left-[-30px]  lg:text-[60px] "
          )}
        >
          👋
        </p>
        <Image
          alt="Japanese"
          src="/images/submit-success.webp"
          width={400}
          height={100}
          className="rounded-lg mt-4 w-full lg:w-[600px]"
        />
      </div>
    </div>
  );
};
export default SubmitSuccess;
