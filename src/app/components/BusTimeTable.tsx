"use client";
import { useTranslations } from "next-intl";
import React from "react";
import { GIMCHEON_GUMI_STA_PARKING_AREA_MAP_LINK } from "../../constants";

const BusTimeTable = () => {
  const location = useTranslations("location");
  const date = useTranslations("date");
  return (
    <div className="mt-8 w-fit p-4 mx-auto rounded-lg bg-primary-50">
      <p className="font-[Montserrat] text-center font-bold">
        🚌 {location("shuttleBusTimePickupTimeAndPlaceLabel")}
      </p>

      {/* row 1 */}
      <div className="grid grid-cols-12 gap-4 mt-4">
        <p className="ml-4 col-span-3 text-right">
          {location("shuttleBusDeparturePointValue")}{" "}
        </p>
        <a
          href={GIMCHEON_GUMI_STA_PARKING_AREA_MAP_LINK}
          target="_blank"
          className="col-span-9"
        >
          <p className="font-[Montserrat] underline text-blue-500">
            🚏 {location("shuttleBusDeparturePointLabel")}
          </p>
        </a>
      </div>
      {/* row 2 */}
      <div className="grid grid-cols-12 gap-4">
        <p className="ml-4 col-span-3 text-right">
          {location("shuttleBusFirstStopValue")}{" "}
        </p>
        <a
          href={GIMCHEON_GUMI_STA_PARKING_AREA_MAP_LINK}
          target="_blank"
          className="col-span-9"
        >
          <p className="font-[Montserrat] underline text-blue-500">
            🏨 {location("shuttleBusFirstStopLabel")}
          </p>
        </a>
      </div>
      {/* row 3 */}
      <div className="grid grid-cols-12 gap-4">
        <p className="ml-4 col-span-3 text-right">
          {location("shuttleBusLastStopValue")}{" "}
        </p>
        <a
          href={GIMCHEON_GUMI_STA_PARKING_AREA_MAP_LINK}
          target="_blank"
          className="col-span-9"
        >
          <p className="font-[Montserrat] underline text-blue-500">
            🏯 {location("shuttleBusLastStopLabel")}
          </p>
        </a>
      </div>
    </div>
  );
};
export default BusTimeTable;
