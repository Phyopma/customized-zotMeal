import { MenuCard } from "@/app/components/menuCard";
import React from "react";
import { stationParamsId } from "@/app/queryParams/stationParams";
import { locationParamsName } from "@/app/queryParams/locationParams";
import { mealParamsName } from "@/app/queryParams/mealParams";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function IndividualView({ menus, location }) {
  // Group menus by meal period
  const menusByPeriod = menus.reduce((acc, menu) => {
    const periodId = menu.periodId;
    if (!acc[periodId]) {
      acc[periodId] = [];
    }
    acc[periodId].push(menu);
    return acc;
  }, {});

  // Get unique period IDs and sort them
  const periodIds = Object.keys(menusByPeriod);

  return (
    <div className="">
      <h2 className="text-2xl font-bold mb-6 text-center">
        {locationParamsName[location]}
      </h2>

      {periodIds.length > 1 ? (
        <Tabs defaultValue={periodIds[0]} className="w-full">
          <div className="flex items-center justify-center mb-8">
            <TabsList className="bg-slate-200 text-slate-700">
              {periodIds.map((periodId) => (
                <TabsTrigger
                  key={periodId}
                  value={periodId}
                  className="data-[state=active]:bg-slate-700 data-[state=active]:text-white">
                  {mealParamsName[periodId]}
                </TabsTrigger>
              ))}
            </TabsList>
          </div>

          {periodIds.map((periodId) => (
            <TabsContent key={periodId} value={periodId} className="mt-0">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {menusByPeriod[periodId].map((item, idx) => {
                  // For LateNight (periodId 108), only show Ember for Brandywine and SizzleGrill for Anteatry
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

                  // For other meal periods, keep existing filtering logic
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
            </TabsContent>
          ))}
        </Tabs>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {menus
            .sort((a, b) => a.periodId - b.periodId)
            .map((item, idx) => {
              // For LateNight, only show Ember for Brandywine and SizzleGrill for Anteatry
              if (item.periodId === "108") {
                if (location === "3314" && item.stationId === "32802") {
                  // Brandywine's Ember
                  return (
                    <MenuCard
                      key={item.menuProductId + idx}
                      menu={item}
                      location={locationParamsName[location]}
                    />
                  );
                }
                if (location === "3056" && item.stationId === "23990") {
                  // Anteatry's SizzleGrill
                  return (
                    <MenuCard
                      key={item.menuProductId + idx}
                      menu={item}
                      location={locationParamsName[location]}
                    />
                  );
                }
                return null;
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
      )}
    </div>
  );
}
