"use client";
/* eslint-disable @next/next/no-img-element */
import { useTranslations } from "next-intl";
import SectionWrapper from "../wrappers/SectionWrapper";
import Image from "next/image";

interface Props {}

const InviteSection = ({}: Props) => {
  const greeting = useTranslations("greeting");
  return (
    <SectionWrapper className="flex items-center justify-center w-screen py-20 md:py-20 relative">
      <Image
        alt="Pungmul"
        // placeholder="blur"
        fill
        src="/images/pungmul.webp"
        // width={40}
        sizes="100vw"
        // height={40}
        className="blur absolute opacity-20"
      />
      <div className="relative container rounded-md max-w-lg py-40 md:py-60 bg-white w-full text-xl text-gray-800 shadow-[0_0_10px_0px_rgba(0,0,0,0.1)] mx-4">
        <div className="text-center">
          <div className="font-[SukhumvitSet] flex flex-col gap-6">
            <p>{greeting("p1")}</p>

            <p>{greeting("p2")}</p>
            <p>{greeting("p3")}</p>
            <p>{greeting("p4")}</p>
            <p>{greeting("p5")}</p>
          </div>
          <br />
          <p className="font-[SukhumvitSet]">{greeting("between")}</p>
          <br />
          {/* center wrapper */}
          <div className="flex flex-col items-center">
            {/* actual card */}
            <div className="flex justify-space items-center gap-4">
              <div>
                {/* <h1 className="font-[Tangerine] font-bold text-6xl md:text-8xl text-center">
                  {greeting("brideName")}
                </h1> */}
                <p className="font-[SukhumvitSet] font-medium text-sm md:text-lg">
                  {greeting("brideName")}
                </p>
              </div>
              <p className="font-[Tangerine] font-bold text-4xl md:text-6xl text-center">
                &
              </p>
              <div>
                {/* <h1 className="font-[Tangerine] font-bold text-6xl md:text-8xl text-center">
                  {greeting("groomName")}
                </h1> */}
                <p className="font-[SukhumvitSet] font-medium text-sm md:text-lg">
                  {greeting("groomName")}
                  {/* Rodrigo Daniel <br /> Rotela Ramirez */}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* <img
          alt="roses frame"
          src="/images/floral-pink-top-left.webp"
          className="w-[200px] md:w-[250px] absolute z-10 left-0 top-0 opacity-40"
        />
        <img
          alt="roses frame"
          src="/images/floral-pink-bottom-right.webp"
          className="w-[200px] md:w-[250px] absolute z-10 right-0 bottom-0 opacity-40"
        /> */}

        <div className="translate-x-[calc(8%-10px)] translate-y-1/3 absolute z-10 bottom-0 right-0 ">
          <img
            alt="flower"
            src="/images/single-sakura.svg"
            className="h-[100px] md:h-[150px] animate-wiggle"
          />
        </div>
      </div>
    </SectionWrapper>
  );
};
export default InviteSection;
