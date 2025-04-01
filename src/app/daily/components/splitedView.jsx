import { locationParamsName } from "@/app/queryParams/locationParams";
import { stationParamsId } from "@/app/queryParams/stationParams";
import { MenuCard } from "@/app/components/menuCard";
import React from "react";

export default function SplitedView({ allMenus }) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-4">
      {Object.keys(allMenus).map((location) => (
        <div key={location} className="">
          <h2 className="text-2xl font-bold mb-6 text-center">
            {locationParamsName[location]}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {allMenus[location].menus
              .sort((a, b) => a.periodId - b.periodId)
              .map((item, idx) => {
                // For LateNight, only show Ember for Brandywine and SizzleGrill for Anteatry
                if (
                  item.periodId === "108" &&
                  Object.values(
                    stationParamsId[locationParamsName[location]]
                  ).includes(item.stationId)
                ) {
                  return (
                    <MenuCard
                      key={item.menuProductId + idx}
                      menu={item}
                      location={locationParamsName[location]}
                    />
                  );
                }

                // For other meal periods
                if (location === "3056" && item.stationId === "23990") {
                  return null;
                }
                if (location === "3314" && item.stationId === "32802") {
                  return null;
                }

                return (
                  Object.values(
                    stationParamsId[locationParamsName[location]]
                  ).includes(item.stationId) && (
                    <MenuCard
                      key={item.menuProductId + idx}
                      menu={item}
                      location={locationParamsName[location]}
                    />
                  )
                );
              })}
          </div>
        </div>
      ))}
    </div>
  );
}
