"use client";
import clsx from "clsx";
import GoogleMap from "google-maps-react-markers";

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
import BusTimeTable from "./BusTimeTable";
import MyText from "./MyText";
import Tabs from "./Tabs";
import { mapTypeOptions } from "./Tabs/CONTAINER_TAB_TYPE";
import Tab from "./Tabs/Tab";
import SectionWrapper from "./wrappers/SectionWrapper";
import { useAnimateOnSroll } from "../hooks/useAnimateOnScroll";

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
  zoom: 14,
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
  const date = useTranslations("date");

  const [mapType, setMapType] = useState<MapType>("all");
  const showCeremony = mapType === "all" || mapType === "ceremony";
  const showReception = mapType === "all" || mapType === "reception";

  const { ref: sectionRef, animateClassName } = useAnimateOnSroll();

  if (!process.env.NEXT_PUBLIC_GOOGLE_MAP_KEY) return;
  return (
    <SectionWrapper className="w-screen py-16 relative">
      <div
        ref={sectionRef}
        className="absolute top-1/2 left-1/2 w-10 h-10 opacity-0"
      />
      <div className={cn("container", animateClassName)}>
        <Tabs className="mx-auto w-fit mb-8">
          {mapTypeOptions.map((option, index) => (
            <Tab
              key={option.value}
              index={index}
              tabsNum={mapTypeOptions.length}
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
        {/* info */}
        <div className="xl:flex mx-auto w-fit justify-center items-start gap-2">
          {showCeremony && (
            <div className="flex-1 border-[1px] rounded-lg p-4">
              <h2 className="heading2 text-center font-[Montserrat]">
                {location("ceremonyLabel")}
              </h2>

              <h3 className="font-bold text-center font-[Montserrat]">
                ⏱️ {date("ceremonyTime")}
              </h3>
              <h3 className="text-md text-center font-[Montserrat]">
                🏯 {location("ceremonyLocation")}
              </h3>

              <Image
                alt="creremony location"
                src="/images/temple.webp"
                width={1000}
                height={1000}
                className="w-3/4 sm:w-40 lg:h-40 mx-auto rounded-lg my-4"
              />

              <p className="text-sm font-[Montserrat] mt-2 text-left">
                * {location("shuttleBusSection")}
              </p>

              {/* bus time table */}
              <BusTimeTable />
            </div>
          )}
          {showReception && (
            <div
              className={cn(
                showCeremony && "mt-8 xl:mt-0",
                !showCeremony && "w-full sm:min-w-[400px]",
                "h-full flex-1 border-[1px] rounded-lg px-12 xl:px-4 py-4"
              )}
            >
              <h2 className="heading2 text-center font-[Montserrat]">
                {location("receptionLabel")}
              </h2>
              <h3 className="text-md font-bold text-center font-[Montserrat]">
                ⏱️ {date("receptionTime")}
              </h3>
              <h3 className="text-md text-center font-[Montserrat]">
                🏨 {location("receptionLocation")}
              </h3>
            </div>
          )}
        </div>

        <div className="w-[300px] h-[250px] md:w-[500px] md:h-[400px] relative mx-auto mt-8">
          <GoogleMap
            apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAP_KEY}
            defaultCenter={defaultProps[mapType]}
            defaultZoom={defaultProps.zoom}
            key={new Date().getTime()}
          >
            <PagodaPin
              lat={pins.ceremony.lat}
              lng={pins.ceremony.lng}
              className={showCeremony ? "block" : "hidden"}
            />
            <BuildingPin
              lat={pins.reception.lat}
              lng={pins.reception.lng}
              className={showReception ? "block" : "hidden"}
            />
          </GoogleMap>

          <a
            href={CEREMONY_LOCATION_LINK}
            target="_blank"
            className={cn(
              "absolute ",
              showCeremony ? "flex" : "hidden",
              showReception
                ? "bottom-12 lg:bottom-16 left-4"
                : "bottom-4 left-4",
              // showReception ? "bottom-12 left-4" : "bottom-4 left-4",
              "items-center gap-2 bg-white mx-auto font-semibold mt-2 w-fit",
              "hover:cursor-pointer hover:bg-primary-50 rounded-sm shadow-sm",
              "text-xs lg:text-md p-1 lg:p-2"
            )}
          >
            <Image
              alt="pink roses frame"
              src="/images/icons/google-map.svg"
              width={20}
              height={20}
              className="w-4 h-4 lg:w-5 lg:h-5"
            />
            <MyText> {location("openInGoogleMapLabel")} 🏯</MyText>
          </a>
          <a
            href={RECEPTION_LOCATION_LINK}
            target="_blank"
            className={cn(
              showReception ? "flex" : "hidden",
              "absolute bottom-4 left-4",
              "items-center gap-2 bg-white mx-auto font-semibold mt-2 w-fit",
              "hover:cursor-pointer hover:bg-primary-50 rounded-sm shadow-sm",
              "text-xs lg:text-md p-1 lg:p-2"
            )}
          >
            <Image
              alt="pink roses frame"
              src="/images/icons/google-map.svg"
              width={20}
              height={20}
              className="w-4 h-4 lg:w-5 lg:h-5"
            />
            <MyText> {location("openInGoogleMapLabel")} 🏨</MyText>
          </a>
        </div>
      </div>

      {/* Sakura */}

      <div className="translate-x-[calc(8%-24px)] translate-y-2 absolute z-10 top-[-40px] lg:top-0 left-0 ">
        <img
          alt="flower"
          src="/images/sakura-top-left.svg"
          className="h-[100px] md:h-[150px] animate-wiggle"
        />
      </div>
    </SectionWrapper>
  );
};
export default CeremonyMap;
