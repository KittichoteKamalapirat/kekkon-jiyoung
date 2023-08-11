/* eslint-disable @next/next/no-img-element */
import React from "react";
import SectionWrapper from "../wrappers/SectionWrapper";
import AnimateBlob from "../AnimateBlob";
import FireshipBlob12 from "../svg/FireshipBlob12";
import FireshipBlob34 from "../svg/FireshipBlob34";

interface Props {}

const DateTimeSection = ({}: Props) => {
  return (
    <SectionWrapper className="relative py-32 md:py-40 w-screen font-[SukhumvitSet]">
      <div className="ring-gray-300 ring-1 rounded-md px-4 py-20 w-fit mx-auto">
        <h2 className="heading2 text-center">⏱️ 19 August 2023 (Sat)</h2>

        <ul className="mt-8 md:max-w-[600px] mx-auto flex justify-between">
          <li className="ml-4">
            <p className="col-span1 font-[Montserrat]">13:00 - 15:30</p>
            <p className="col-span-1 font-[Montserrat]">18:00 - 21:00</p>
            <p className="col-span-1 font-[Montserrat]">21:00 ~</p>
          </li>
          <li className="ml-4">
            <p className="col-span-2 font-[SukhumvitSet]">
              Engagement Ceremony 💍
            </p>
            <p className="col-span-2">Wedding Reception 🥂</p>

            <div className="col-span-2 font-[Montserrat]">
              <p>After Party 🎉</p>
            </div>
          </li>
        </ul>
      </div>

      {/* <img
        alt="pink roses frame"
        src="/images/floral-pink-top-left.webp"
        className="w-[200px] md:w-[400px] absolute z-10 left-0 top-0 opacity-40"
      /> */}
      <AnimateBlob
        blobId1="#blob3"
        blobId2="#blob4"
        image={
          <div className="translate-x-[calc(8%-24px)] translate-y-1/3 absolute z-10 top-0 left-0 ">
            <img
              alt="flower"
              src="/images/flower-2.svg"
              className="h-[100px] md:h-[150px] animate-wiggle"
            />
          </div>
        }
        blob={
          <FireshipBlob34 className="w-60 h-60 md:w-80 md:h-80 absolute top-0 left-0 z-0  -translate-x-[calc(35%)] -translate-y-1/4" />
        }
      />
    </SectionWrapper>
  );
};
export default DateTimeSection;
