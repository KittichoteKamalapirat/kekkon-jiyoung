"use client";
/* eslint-disable @next/next/no-img-element */
import { useTranslations } from "next-intl";
import SectionWrapper from "../wrappers/SectionWrapper";
import Image from "next/image";

interface Props {}

const InviteSection = ({}: Props) => {
  const greeting = useTranslations("greeting");
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
      <div className="relative container rounded-md max-w-lg py-20 md:py-20 bg-white w-full text-md lg:text-lg text-gray-800 shadow-[0_0_10px_0px_rgba(0,0,0,0.1)] mx-4">
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
                src="/images/gloom.webp"
                width={100}
                height={100}
                className="rounded-full w-[100px] h-[100px] md:w-[150px] md:h-[150px]"
              />
            </div>
          </div>

          <div className="flex justify-around items-start gap-4 mt-2">
            <p className="font-[SukhumvitSet] font-semibold text-md md:text-lg flex-1">
              {greeting("brideName")}
            </p>
            <p className="font-[Tangerine] font-semibold text-4xl md:text-6xl text-center opacity-0">
              &
            </p>

            <p
              className="font-[SukhumvitSet] font-semibold text-md md:text-lg flex-1"
              dangerouslySetInnerHTML={{ __html: greeting("groomName") }}
            ></p>
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
