"use client";
/* eslint-disable @next/next/no-img-element */
import React from "react";
import SectionWrapper from "../wrappers/SectionWrapper";
import { useTranslations } from "next-intl";

interface Props {}

const FooterSection = ({}: Props) => {
  const footer = useTranslations("footer");
  return (
    <SectionWrapper className="relative w-screen py-8 md:py-8 bg-primary-50 flex items-center justify-center">
      <footer>
        <div className="px-4 py-6 md:flex md:items-center md:justify-between w-screen text-center">
          <div className="mx-auto w-full max-w-screen-xl">
            <h2 className="text-lg md:text-2xl text-center my font-[Montserrat]">
              {footer("copy")} 👰🏻🤵🏻
            </h2>
            <img
              alt="Footer"
              src={`/images/korean-couple.svg`}
              className="w-11/12 md:max-w-[400px] mx-auto mt-10 rounded-lg"
              loading="lazy"
            />
          </div>
        </div>
        <p className="text-lg text-center animate-pulse">❤️</p>
      </footer>
    </SectionWrapper>
  );
};
export default FooterSection;
