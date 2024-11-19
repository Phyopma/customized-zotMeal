import React from "react";
import { mealParamsId, mealParamsName } from "../queryParams/mealParams";
import { buildUrl, formatResponse } from "@/lib/helper";
import { stationParamsId } from "../queryParams/stationParams";
import IndividualView from "./components/individualView";
import SplitedView from "./components/splitedView";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Terminal } from "lucide-react";
import { locationParamsId } from "../queryParams/locationParams";

export default async function DailyPage({ searchParams }) {
  const mode = "Daily";
  const { date, splited, location } = await searchParams;
  const isSplited = splited === "true";

  // let dinnerMenu = await fetch(url).then((res) => res.json());
  // dinnerMenu = formatResponse(dinnerMenu);
  // const { menus, ...rest } = dinnerMenu;
  // const filteredMenus = menus.filter((item) =>
  //   Object.values(stationParams["BrandyWine"]).includes(item.stationId)
  // );
  // dinnerMenu = { ...rest, menus: filteredMenus };

  if (!location && !isSplited) {
    return (
      <Alert className="bg-red-600 text-white border-none rounded-sm shadow-2xl m-1">
        <Terminal className="h-4 w-4 " />
        <AlertTitle>Choose one of the locations!</AlertTitle>
        <AlertDescription>
          If you don't want to split the screen for two locations, choose one.
          If you want to split the screen, choose split.
        </AlertDescription>
      </Alert>
    );
  }

  const urls = [
    // buildUrl(location, mealParamsId["Breakfast"], mode, date),
    buildUrl(locationParamsId["BrandyWine"], mealParamsId["Lunch"], mode, date),
    buildUrl(
      locationParamsId["BrandyWine"],
      mealParamsId["Brunch"],
      mode,
      date
    ),
    buildUrl(
      locationParamsId["BrandyWine"],
      mealParamsId["Dinner"],
      mode,
      date
    ),
    buildUrl(locationParamsId["Anteatry"], mealParamsId["Lunch"], mode, date),
    buildUrl(locationParamsId["Anteatry"], mealParamsId["Brunch"], mode, date),
    buildUrl(locationParamsId["Anteatry"], mealParamsId["Dinner"], mode, date),
  ];
  const responses = await Promise.all(
    urls.map((url) => fetch(url).then((res) => res.json()))
  );
  const allMenus = formatResponse(responses);

  return (
    <div>
      {isSplited ? (
        <SplitedView allMenus={allMenus} />
      ) : (
        <IndividualView menus={allMenus[location].menus} location={location} />
      )}
    </div>
  ); //   DailyPage
  //   <ul>
  //     {dinnerMenu.menus.map((item) => (
  //       <li key={item.menuProductId}>{item.name}</li>
  //     ))}
  //   </ul>
  // </div>
}
