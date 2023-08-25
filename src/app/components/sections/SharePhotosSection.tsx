import React from "react";
import SectionWrapper from "../wrappers/SectionWrapper";

interface Props {}

const SharePhotosSection = ({}: Props) => {
  return (
    <SectionWrapper className="bg-white w-screen py-32 md:py-40 font-[SukhumvitSet]">
      <h2 className="heading2 text-center">Photos On The Wedding Day</h2>

      <div className="mt-8 text-center flex flex-col gap-4 md:gap-8 text- md:text-2xl hover:cursor-pointer underline">
        <a
          href="https://drive.google.com/drive/folders/1hNQ-i5xZt0JaPjwJlcYw30hIH-AHGM96"
          target="_blank"
        >
          💍 From Engagement Ceremony
        </a>
        <a href="https://fotoshare.co/u/289040777/3630274" target="_blank">
          😎 From Photo Booth
        </a>
        <a
          href="https://www.flickr.com/gp/168220958@N08/C65hr714Le"
          target="_blank"
        >
          📷 From Shane&#39;s Camera
        </a>
      </div>
    </SectionWrapper>
  );
};
export default SharePhotosSection;
