import { buildUrl, formatDailyResponse } from "@/lib/helper";
import { locationParamsId } from "@/app/queryParams/locationParams";
import { mealParamsId } from "@/app/queryParams/mealParams";
import SplitedView from "./splitedView";
import IndividualView from "./individualView";

async function fetchData({ date, location, isSplited }) {
  const mode = "Daily";
  const urls = [
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
  return formatDailyResponse(responses);
}
export default async function DataFetchingComponent({ searchParams }) {
  const { date, splited, location } = await searchParams;
  const isSplited = splited === "true";
  const allMenus = await fetchData({ date, location, isSplited });

  return (
    <div>
      {isSplited ? (
        <SplitedView allMenus={allMenus} />
      ) : (
        <IndividualView menus={allMenus[location].menus} location={location} />
      )}
    </div>
  );
}
