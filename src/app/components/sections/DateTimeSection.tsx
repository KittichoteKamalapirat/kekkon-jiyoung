"use client";
/* eslint-disable @next/next/no-img-element */
import { useTranslations } from "next-intl";
import SectionWrapper from "../wrappers/SectionWrapper";

interface Props {}

const DateTimeSection = ({}: Props) => {
  const date = useTranslations("date");
  return (
    <SectionWrapper className="relative py-32 md:py-40 w-screen font-[SukhumvitSet]">
      <div className="ring-gray-300 ring-1 rounded-md px-4 py-20 w-fit mx-auto sm:min-w-[400px]">
        <h2 className="heading2 text-center">⏱️ {date("sectionLabel")}</h2>

        <ul className="mt-8 md:max-w-[600px] mx-auto grid grid-cols-12 gap-4">
          <li className="ml-4 col-span-5 text-right">
            <p className="font-[Montserrat]">{date("ceremonyTime")}</p>
            <p className="font-[Montserrat] mt-4">{date("receptionTime")}</p>
          </li>
          <li className="ml-4 col-span-6">
            <p className="font-[SukhumvitSet]">{date("ceremonyLabel")} 🏯</p>
            <p className="mt-4">{date("receptionLabel")} 🥂</p>
          </li>
        </ul>
      </div>

      <div className="translate-x-[calc(8%-24px)] translate-y-1/3 absolute z-10 top-0 left-0 ">
        <img
          alt="flower"
          src="/images/sakura-top-left.svg"
          className="h-[100px] md:h-[150px] animate-wiggle"
        />
      </div>
      {/* <AnimateBlob
        blobId1="#blob3"
        blobId2="#blob4"
        image={
          <div className="translate-x-[calc(8%-24px)] translate-y-1/3 absolute z-10 top-0 left-0 ">
            <img
              alt="flower"
              src="/images/sakura-top-left.svg"
              className="h-[100px] md:h-[150px] animate-wiggle"
            />
          </div>
        }
        blob={
          <FireshipBlob34 className="w-60 h-60 md:w-80 md:h-80 absolute top-0 left-0 z-0  -translate-x-[calc(35%)] -translate-y-1/4" />
        }
      /> */}
    </SectionWrapper>
  );
};
export default DateTimeSection;
