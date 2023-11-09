"use client";
import { RiSyringeFill } from "react-icons/ri";
import GoogleMap from "google-maps-react-markers";
import { MdLocationPin } from "react-icons/md";

import Image from "next/image";

const NormalPin = ({}: { lat: number; lng: number }) => (
  <MdLocationPin
    size={40}
    color="red"
    className=" -translate-x-1/2 -translate-y-full" // make sure the tip points to location
  />
);
const SyringePin = ({}: { lat: number; lng: number }) => (
  <div>
    <RiSyringeFill
      size={40}
      color="red"
      className="animate-bounce-rotate bg-white p-1 bg-opacity-50 border-gray-500 border-2 border-opacity-50 rounded-full " // make sure the tip points to location
    />
  </div>
);

const MapSection2 = () => {
  const defaultProps = {
    center: {
      lat: 13.873904734916668,
      lng: 100.58171033296948,
    },
    zoom: 14,
  };

  if (!process.env.NEXT_PUBLIC_GOOGLE_MAP_KEY) return;
  return (
    <div className="bg-primary-100 w-screen py-16">
      <h2 className="heading2 text-center font-Montserrat">
        THE HALLS Bangkok
      </h2>
      <p className="text-center text-smmd mt-4 font-[Montserrat]">
        02-015-3765
      </p>
      <p className="text-center font-[Montserrat]">
        79, 1 Vibhavadi Rangsit 64 Alley <br /> Talat Bang Khen, Lak Si <br />
        Bangkok 10210
      </p>

      <a
        href="https://maps.app.goo.gl/yrr2qV3UCCmwSZFa7?g_st=il"
        target="_blank"
        className="flex items-center gap-2 bg-white px-2 py-1 mx-auto rounded-sm border-[1px] text-sm mt-2 hover:cursor-pointer w-fit"
      >
        <Image
          alt="pink roses frame"
          src="/images/icons/google-map.svg"
          width={20}
          height={20}
        />
        <p>Open in Google Map</p>
      </a>

      <div className="w-[300px] h-[250px] md:w-[500px] md:h-[400px] relative mx-auto mt-8">
        <GoogleMap
          apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAP_KEY}
          // zoom={defaultProps.zoom}
          // center={defaultProps.center}
          defaultCenter={defaultProps.center}
          defaultZoom={defaultProps.zoom}
          // key={new Date().getTime()}
        >
          <SyringePin lat={13.873904734916668} lng={100.58171033296948} />
        </GoogleMap>
      </div>
    </div>
  );
};
export default MapSection2;
