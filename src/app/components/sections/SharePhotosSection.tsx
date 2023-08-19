import React from "react";
import SectionWrapper from "../wrappers/SectionWrapper";

interface Props {}

const SharePhotosSection = ({}: Props) => {
  return (
    <SectionWrapper className="bg-white w-screen py-32 md:py-40 font-[SukhumvitSet]">
      <h2 className="heading2 text-center">Photos</h2>

      <div className="mt-8 text-center text-lg md:text-2xl hover:cursor-pointer underline">
        <a
          href="https://www.flickr.com/gp/168220958@N08/C65hr714Le"
          target="_blank"
        >
          📷 From Shane's camera
        </a>
      </div>
    </SectionWrapper>
  );
};
export default SharePhotosSection;
