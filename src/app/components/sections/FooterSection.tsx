"use client";
/* eslint-disable @next/next/no-img-element */
import React from "react";
import SectionWrapper from "../wrappers/SectionWrapper";
import { useTranslations } from "next-intl";
import { useAnimateOnSroll } from "../../hooks/useAnimateOnScroll";

interface Props {}

const FooterSection = ({}: Props) => {
  const footer = useTranslations("footer");
  const { ref: sectionRef, animateClassName } = useAnimateOnSroll();

  return (
    <SectionWrapper className="relative w-screen py-8 md:py-8 bg-white flex items-center justify-center">
      {/* dummy */}
      <div
        ref={sectionRef}
        className="absolute top-1/2 left-1/2 w-10 h-10 opacity-0"
      />
      <footer className={animateClassName}>
        <div className="px-4 py-6 md:flex md:items-center md:justify-between w-screen text-center">
          <div className="mx-auto w-full max-w-screen-xl">
            <h2 className="text-md lg:text-xl text-center my font-[Montserrat]">
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
