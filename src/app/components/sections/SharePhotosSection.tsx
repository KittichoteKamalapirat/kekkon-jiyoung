/* eslint-disable @next/next/no-img-element */
import React from "react";
import SectionWrapper from "../wrappers/SectionWrapper";
import AnimateBlob from "../AnimateBlob";
import FireshipBlob34 from "../svg/FireshipBlob34";
import clsx from "clsx";

interface Props {
  className?: string;
}

const SharePhotosSection = ({ className }: Props) => {
  return (
    <SectionWrapper
      className={clsx("bg-white w-screen py-32 md:py-40  max-w-7xl", className)}
    >
      <div className="flex justify-between items-center flex-col lg:flex-row mx-10">
        <div>
          <h2 className="heading2 text-center">Photos On The Wedding Day</h2>

          <div className="mt-8 text-center flex flex-col gap-4 md:gap-8 text- md:text-2xl hover:cursor-pointer underline">
            <a
              href="https://photos.app.goo.gl/LWCjWSc4RUDnnMua9"
              target="_blank"
            >
              🥂 Evening Ceremony
            </a>
            <a
              href="https://photos.app.goo.gl/93QQX2uY2DAre8if6"
              target="_blank"
            >
              💍 Engagement Ceremony
            </a>
            <a href="https://fotoshare.co/u/289040777/3630274" target="_blank">
              😎 Photo Booth
            </a>
            {/* <a
              href="https://www.flickr.com/gp/168220958@N08/C65hr714Le"
              target="_blank"
            >
              📷 From Shane&#39;s Camera
            </a> */}
          </div>
        </div>

        <div>
          {/* mobile */}

          <iframe
            width="560"
            height="315"
            src="https://www.youtube.com/embed/tGIqzuEtbdA?si=iLwoYR2NWJgVrOSy"
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            className="mt-20 lg:hidden max-w-[280px] max-h-[150px]"
          ></iframe>
          <iframe
            width="560"
            height="315"
            src="https://www.youtube.com/embed/tGIqzuEtbdA?si=iLwoYR2NWJgVrOSy"
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            className="hidden lg:block"
          ></iframe>
        </div>
      </div>

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
export default SharePhotosSection;
