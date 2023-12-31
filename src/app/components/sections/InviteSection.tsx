"use client";
/* eslint-disable @next/next/no-img-element */
import { useTranslations } from "next-intl";
import SectionWrapper from "../wrappers/SectionWrapper";
import Image from "next/image";
import { useAnimateOnSroll } from "../../hooks/useAnimateOnScroll";
import { cn } from "../../../lib/utils";

interface Props {}

const InviteSection = ({}: Props) => {
  const greeting = useTranslations("greeting");

  const { ref: sectionRef, animateClassName } = useAnimateOnSroll();
  return (
    <SectionWrapper className="flex items-center font-thin justify-center w-screen py-20 md:py-20 relative">
      <Image
        alt="Pungmul"
        // placeholder="blur"
        fill
        src="/images/pungmul.webp"
        sizes="100vw"
        className="blur absolute opacity-20"
      />
      {/* dummy */}
      <div
        ref={sectionRef}
        className="absolute top-1/2  w-10 h-10 bg-black opacity-0"
      />
      <div
        className={cn(
          "relative container rounded-md max-w-xl py-20 md:py-20 bg-white w-full text-md text-gray-800 shadow-[0_0_10px_0px_rgba(0,0,0,0.1)] mx-4"
        )}
      >
        <div className={animateClassName}>
          <div className="text-center">
            <div className=" flex flex-col gap-1">
              <p>{greeting("p1")}</p>

              {greeting("p2") && <p className="mt-6">{greeting("p2")}</p>}
              {greeting("p3") && <p>{greeting("p3")}</p>}
              {greeting("p4") && <p>{greeting("p4")}</p>}
              {greeting("p5") && <p>{greeting("p5")}</p>}
              {greeting("p6") && <p className="mt-6">{greeting("p6")}</p>}
              {greeting("p7") && <p>{greeting("p7")}</p>}
              {greeting("p8") && <p className="mt-6">{greeting("p8")}</p>}
              {greeting("p9") && <p className="mt-6">{greeting("p9")}</p>}
              {greeting("p10") && <p>{greeting("p10")}</p>}
              {greeting("p11") && <p>{greeting("p11")}</p>}
            </div>
            <br />
            <p className="">{greeting("between")}</p>
            <br />
            {/* center wrapper */}

            {/* actual card */}
            <div className="flex justify-around items-center gap-4">
              <div className="flex flex-col gap-2">
                <Image
                  alt="Japanese"
                  src="/images/bride.webp"
                  width={100}
                  height={100}
                  className="rounded-full w-[100px] h-[100px] md:w-[150px] md:h-[150px]"
                />
              </div>

              <p className="font-[Tangerine] font-thin text-4xl md:text-6xl text-center">
                &
              </p>

              <div className="flex flex-col gap-2">
                <Image
                  alt="Japanese"
                  src="/images/groom.webp"
                  width={100}
                  height={100}
                  className="rounded-full w-[100px] h-[100px] md:w-[150px] md:h-[150px]"
                />
              </div>
            </div>

            <div className="flex justify-around items-start gap-4 mt-2">
              <div className="flex flex-1 flex-col items-center">
                <p className="font-semibold text-md md:text-lg flex-1">
                  {greeting("brideName")}
                </p>

                <p className="text-sm mt-2">
                  {greeting("birthdayLabel")}
                  {greeting("brideBirthday")}
                </p>
                <p className="text-sm mt-2">
                  {greeting("homeTownLabel")}
                  {greeting("brideHometownCity")}
                </p>
                {greeting("brideHometownCountry") && (
                  <p className="text-sm">{greeting("brideHometownCountry")}</p>
                )}

                <p className="text-sm mt-2">
                  {greeting("favoriteFoodLabel")}
                  {greeting("brideFavoriteFoodValue")}
                </p>
              </div>

              <p className="font-[Tangerine] font-semibold text-4xl md:text-6xl text-center opacity-0">
                &
              </p>
              <div className="flex flex-1 flex-col items-center">
                <p className=" font-semibold text-md md:text-lg flex-1">
                  {greeting("groomName")}
                </p>
                <p className="text-sm mt-2">
                  {greeting("birthdayLabel")}
                  {greeting("groomBirthday")}
                </p>
                <p className="text-sm mt-2">
                  {greeting("homeTownLabel")}
                  {greeting("groomHometownCity")}
                </p>
                {greeting("brideHometownCountry") && (
                  <p className="text-sm">{greeting("groomHometownCountry")}</p>
                )}
                <p className="text-sm mt-2">
                  {greeting("favoriteFoodLabel")}
                  {greeting("groomFavoriteFoodValue")}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="-translate-x-1/2 -translate-y-1/2 absolute z-10 top-0 left-0">
          <img
            alt="flower"
            src="/images/single-sakura.svg"
            className="h-[100px] md:h-[150px] animate-wiggle"
          />
        </div>

        <div className="translate-x-[calc(8%-10px)] translate-y-1/2 absolute z-10 bottom-0 right-0 ">
          <Image
            alt="Globe"
            src="/images/globe.svg"
            width={150}
            height={150}
            className="animate-wiggle w-32 lg:w-40"
          />
        </div>
      </div>
    </SectionWrapper>
  );
};
export default InviteSection;
