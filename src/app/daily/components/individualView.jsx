import { MenuCard } from "@/app/components/menuCard";
import React from "react";
import { stationParamsId } from "@/app/queryParams/stationParams";
import { locationParamsName } from "@/app/queryParams/locationParams";
export default function IndividualView({ menus, location }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-5 max-w-full overflow-hidden">
      {menus
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
  );
}
