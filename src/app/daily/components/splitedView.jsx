import { locationParamsName } from "@/app/queryParams/locationParams";
import { stationParamsId } from "@/app/queryParams/stationParams";
import { MenuCard } from "@/app/components/menuCard";
import React from "react";
export default function SplitedView({ allMenus }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-5 max-w-full overflow-hidden">
      {Object.keys(allMenus).map((location) => {
        return (
          <div key={location}>
            <h3 className="text-center tracking-widest text-2xl leading-10 font-extrabold">
              {locationParamsName[location]}
            </h3>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 p-3 max-w-full overflow-hidden">
              {allMenus[location].menus
                .sort((a, b) => a.periodId - b.periodId)
                .map(
                  (item) =>
                    Object.values(
                      stationParamsId[locationParamsName[location]]
                    ).includes(item.stationId) && (
                      <MenuCard
                        key={item.menuProductId}
                        menu={item}
                        location={locationParamsName[location]}
                      />
                    )
                )}
            </div>
          </div>
        );
      })}

      {/* {menus
      .sort((a, b) => a.periodId - b.periodId)
      .map(
        (item) =>
          Object.values(stationParamsId[locationParamsName[location]]).includes(
            item.stationId
          ) && (
            <MenuCard
              key={item.menuProductId}
              menu={item}
              location={locationParamsName[location]}
            />
          )
      )} */}
    </div>
  );
}
