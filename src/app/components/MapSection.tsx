"use client";
import clsx from "clsx";
import GoogleMapReact from "google-map-react";

import { useTranslations } from "next-intl";
import Image from "next/image";
import { ReactNode, useState } from "react";
import { BsFillBuildingsFill } from "react-icons/bs";
import { GiPagoda } from "react-icons/gi";
import {
  CEREMONY_LOCATION_LINK,
  RECEPTION_LOCATION_LINK,
} from "../../constants";
import { cn } from "../../lib/utils";
import MyText from "./MyText";
import Tabs from "./Tabs";
import { mapTypeOptions } from "./Tabs/CONTAINER_TAB_TYPE";
import Tab from "./Tabs/Tab";
import SectionWrapper from "./wrappers/SectionWrapper";

const PagodaPin = ({
  className,
}: {
  lat: number;
  lng: number;
  className?: string;
}): ReactNode => (
  <div
    className={clsx("absolute -translate-x-1/2 -translate-y-full", className)}
  >
    <GiPagoda
      size={40}
      color="red"
      className="bg-white animate-bounce p-1 bg-opacity-50 border-gray-500 border-2 border-opacity-50 rounded-full " // make sure the tip points to location
    />
  </div>
);
const BuildingPin = ({
  className,
}: {
  lat: number;
  lng: number;
  className?: string;
}): ReactNode => (
  <div
    className={clsx("absolute -translate-x-1/2 -translate-y-full", className)}
  >
    <BsFillBuildingsFill
      size={40}
      color="red"
      className="bg-white animate-bounce p-1 bg-opacity-50 border-gray-500 border-2 border-opacity-50 rounded-full " // make sure the tip points to location
    />
  </div>
);

const defaultProps = {
  all: {
    lat: 36.1175493,
    lng: 128.0116389,
  },
  ceremony: {
    lat: 36.1183809,
    lng: 128.0079203,
  },
  reception: {
    lat: 36.1167177,
    lng: 128.0153575,
  },
  zoom: 16,
};

const pins = {
  ceremony: {
    lat: 36.1183809,
    lng: 128.0079203,
  },
  reception: {
    lat: 36.1167177,
    lng: 128.0153575,
  },
};
type MapType = "ceremony" | "reception" | "all";
const CeremonyMap = () => {
  const location = useTranslations("location");

  const [mapType, setMapType] = useState<MapType>("all");
  const showCeremony = mapType === "all" || mapType === "ceremony";
  const showReception = mapType === "all" || mapType === "reception";

  const handleMapType = (mapType: MapType) => {
    setMapType(mapType);
  };

  if (!process.env.NEXT_PUBLIC_GOOGLE_MAP_KEY) return;
  return (
    <SectionWrapper className="bg-primary-50 w-screen py-16">
      <Tabs className="mx-auto w-fit mb-8">
        {mapTypeOptions.map((option) => (
          <Tab
            key={option.value}
            isActive={mapType === option.value}
            onClick={() => {
              setMapType(option.value);
            }}
          >
            {option.label === "Ceremony" && location("ceremonyLabel")}
            {option.label === "Reception" && location("receptionLabel")}
            {option.label === "Both" && location("bothLabel")}
          </Tab>
        ))}
      </Tabs>
      {showCeremony && (
        <div>
          <h2 className="heading2 text-center font-Montserrat">
            {location("ceremonyLabel")}
          </h2>
          <h3 className="heading3 text-center font-Montserrat">
            {location("ceremonyLocation")}
          </h3>
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
            <MyText>{location("openInGoogleMapLabel")}</MyText>
          </a>
        </div>
      )}
      {showReception && (
        <div className={cn(showCeremony && "mt-4")}>
          <h2 className="heading2 text-center font-Montserrat">
            {location("receptionLabel")}
          </h2>
          <h3 className="heading3 text-center font-Montserrat">
            {location("receptionLocation")}
          </h3>
          <a
            href={RECEPTION_LOCATION_LINK}
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
        </div>
      )}

      {/* <p className="text-center text-smmd mt-4 font-[Montserrat]">
        02-015-3765
      </p> */}
      {/* <p className="text-center font-[Montserrat]">
        79, 1 Vibhavadi Rangsit 64 Alley <br /> Talat Bang Khen, Lak Si <br />
        Bangkok 10210
      </p> */}

      <div className="w-[300px] h-[250px] md:w-[500px] md:h-[400px] relative mx-auto mt-8">
        <GoogleMapReact
          bootstrapURLKeys={{
            key: process.env.NEXT_PUBLIC_GOOGLE_MAP_KEY, //
            version: "3.31",
          }}
          zoom={defaultProps.zoom}
          center={defaultProps[mapType]}
          defaultCenter={defaultProps[mapType]}
          defaultZoom={defaultProps.zoom}
          key={new Date().getTime()}
        >
          <PagodaPin
            lat={pins.ceremony.lat}
            lng={pins.ceremony.lng}
            className={showCeremony ? "block" : "hidden"}
            // isShow={["all", "ceremony"].includes(mapType)}
            // mapType={mapType}
          />
          <BuildingPin
            lat={pins.reception.lat}
            lng={pins.reception.lng}
            className={showReception ? "block" : "hidden"}
          />

          {/* <PagodaPin lat={13.8741327} lng={100.5805335} /> */}
        </GoogleMapReact>
      </div>
    </SectionWrapper>
  );
};
export default CeremonyMap;
