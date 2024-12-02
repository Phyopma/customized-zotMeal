import React, { Suspense } from "react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Terminal } from "lucide-react";
import { SyncLoader } from "react-spinners";
import DataFetchingComponent from "./components/dataFetchComponent";

export default async function DailyPage({ searchParams }) {
  const mode = "Daily";
  const { splited, location, date } = await searchParams;
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
      <Alert className="bg-red-600 text-white tracking-wider border-none rounded-sm shadow-2xl m-1">
        <Terminal className="h-4 w-4 stroke-white " />
        <AlertTitle className="tracking-wider text-base leading-8 font-semibold">
          Choose one of the locations!
        </AlertTitle>
        <AlertDescription className="font-mono leading-5">
          If you don't want to split the screen for two locations, choose one.
          If you want to split the screen, choose split.
        </AlertDescription>
      </Alert>
    );
  }

  // const urls = [
  //   // buildUrl(location, mealParamsId["Breakfast"], mode, date),
  //   buildUrl(locationParamsId["BrandyWine"], mealParamsId["Lunch"], mode, date),
  //   buildUrl(
  //     locationParamsId["BrandyWine"],
  //     mealParamsId["Brunch"],
  //     mode,
  //     date
  //   ),
  //   buildUrl(
  //     locationParamsId["BrandyWine"],
  //     mealParamsId["Dinner"],
  //     mode,
  //     date
  //   ),
  //   buildUrl(locationParamsId["Anteatry"], mealParamsId["Lunch"], mode, date),
  //   buildUrl(locationParamsId["Anteatry"], mealParamsId["Brunch"], mode, date),
  //   buildUrl(locationParamsId["Anteatry"], mealParamsId["Dinner"], mode, date),
  // ];
  // const responses = await Promise.all(
  //   urls.map((url) => fetch(url).then((res) => res.json()))
  // );
  // const allMenus = formatResponse(responses);

  return <DataFetchingComponent searchParams={{ date, location, splited }} />; //   DailyPage
}
