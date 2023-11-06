/* eslint-disable @next/next/no-img-element */
import React from "react";
import SectionWrapper from "../wrappers/SectionWrapper";
import AnimateBlob from "../AnimateBlob";
import FireshipBlob12 from "../svg/FireshipBlob12";
import { useTranslations } from "next-intl";

interface Props {}

const InviteSection = ({}: Props) => {
  const greeting = useTranslations("greeting");
  return (
    <SectionWrapper className="flex items-center justify-center w-screen py-20 md:py-20">
      <div className="relative rounded-md max-w-lg py-40 md:py-60 bg-white w-full text-xl text-gray-800 shadow-[0_0_10px_0px_rgba(0,0,0,0.1)] mx-4">
        <div className="text-center">
          <p className="font-[SukhumvitSet]">
            {greeting("p1")} <br />
            {greeting("p2")} <br />
            {greeting("p3")} <br />
            {greeting("p4")} <br />
            {greeting("p5")} <br />
          </p>
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

        <div className="">
          <AnimateBlob
            image={
              <div className="translate-x-[calc(8%-10px)] translate-y-1/3 absolute z-10 bottom-0 right-0 ">
                <img
                  alt="flower"
                  src="/images/flower-1.svg"
                  className="h-[100px] md:h-[150px] animate-wiggle"
                />
              </div>
            }
            blobId1="#blob1"
            blobId2="#blob2"
            blob={
              <FireshipBlob12 className="w-40 h-40 md:w-60 md:h-60 absolute bottom-0 right-0 z-0  translate-x-[calc(50%-30px)] translate-y-1/2" />
            }
          />
        </div>
      </div>
    </SectionWrapper>
  );
};
export default InviteSection;
