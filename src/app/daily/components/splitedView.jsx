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
              .map(
                (item, idx) =>
                  Object.values(
                    stationParamsId[locationParamsName[location]]
                  ).includes(item.stationId) && (
                    <MenuCard
                      key={item.menuProductId + idx}
                      menu={item}
                      location={locationParamsName[location]}
                    />
                  )
              )}
          </div>
        </div>
      ))}
    </div>
  );
}
