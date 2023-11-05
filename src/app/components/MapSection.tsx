"use client";
import { RiSyringeFill } from "react-icons/ri";
import GoogleMapReact from "google-map-react";
import { MdLocationPin } from "react-icons/md";
import SectionWrapper from "./wrappers/SectionWrapper";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { CEREMONY_LOCATION_LINK } from "../../constants";
import { ReactNode, useState } from "react";
import clsx from "clsx";
import Tabs from "./Tabs";
import Tab from "./Tabs/Tab";
import { mapTypeOptions } from "./Tabs/CONTAINER_TAB_TYPE";
import MyText from "./MyText";

const NormalPin = ({}: { lat: number; lng: number }) => (
  <MdLocationPin
    size={40}
    color="red"
    className="absolute -translate-x-1/2 -translate-y-full" // make sure the tip points to location
  />
);
const SyringePin = ({
  className,
}: {
  lat: number;
  lng: number;
  className?: string;
}): ReactNode => (
  <div
    className={clsx(
      "absolute -rotate-45  -translate-x-1/2 -translate-y-full",
      className
    )}
  >
    <RiSyringeFill
      size={40}
      color="red"
      className="animate-bounce-rotate bg-white p-1 bg-opacity-50 border-gray-500 border-2 border-opacity-50 rounded-full " // make sure the tip points to location
    />
  </div>
);

const defaultProps = {
  center: {
    lat: 13.873904734916668,
    lng: 100.58171033296948,
  },
  zoom: 14,
};

const pins = {
  ceremony: {
    lat: 13.873904734916668,
    lng: 100.58171033296948,
  },
};
type MapType = "ceremony" | "reception" | "all";
const CeremonyMap = () => {
  const location = useTranslations("location");

  const [mapType, setMapType] = useState<MapType>("all");

  const handleMapType = (mapType: MapType) => {
    setMapType(mapType);
  };

  if (!process.env.NEXT_PUBLIC_GOOGLE_MAP_KEY) return;
  return (
    <SectionWrapper className="bg-primary-100 w-screen py-16">
      <h2 className="heading2 text-center font-Montserrat">
        {location("ceremonyLabel")}
      </h2>
      <h2 className="heading3 text-center font-Montserrat">
        {location("ceremonyLocation")}
      </h2>
      {/* <p className="text-center text-smmd mt-4 font-[Montserrat]">
        02-015-3765
      </p> */}
      {/* <p className="text-center font-[Montserrat]">
        79, 1 Vibhavadi Rangsit 64 Alley <br /> Talat Bang Khen, Lak Si <br />
        Bangkok 10210
      </p> */}

      <Tabs>
        {mapTypeOptions.map((option) => (
          <Tab
            key={option.value}
            isActive={mapType === option.value}
            onClick={() => {
              setMapType(option.value);
            }}
          >
            {option.label}
          </Tab>
        ))}
      </Tabs>

      <a
        href={CEREMONY_LOCATION_LINK}
        target="_blank"
        className="flex items-center gap-2 bg-white px-2 py-1 mx-auto rounded-sm border-[1px] text-sm mt-2 hover:cursor-pointer w-fit"
      >
        <Image
          alt="pink roses frame"
          src="/images/icons/google-map.svg"
          width={20}
          height={20}
        />
        <MyText>Open in Google Map</MyText>
      </a>

      <div className="w-[300px] h-[250px] md:w-[500px] md:h-[400px] relative mx-auto mt-8">
        <GoogleMapReact
          bootstrapURLKeys={{
            key: process.env.NEXT_PUBLIC_GOOGLE_MAP_KEY, // TODO
            version: "3.31",
          }}
          zoom={defaultProps.zoom}
          center={defaultProps.center}
          defaultCenter={defaultProps.center}
          defaultZoom={defaultProps.zoom}
        >
          {/* {["all", "ceremony"].includes(mapType) ? (
            <SyringePin lat={13.873904734916668} lng={100.58171033296948} />
          ) : (
            <></>
          )}
          {["all", "reception"].includes(mapType) ? (
            <SyringePin lat={14.873904734916668} lng={101.58171033296948} />
          ) : (
            <></>
          )} */}

          <SyringePin
            lat={13.873904734916668}
            lng={100.58171033296948}
            className={
              ["all", "ceremony"].includes(mapType) ? "block" : "hidden"
            }
          />
        </GoogleMapReact>
      </div>
    </SectionWrapper>
  );
};
export default CeremonyMap;
