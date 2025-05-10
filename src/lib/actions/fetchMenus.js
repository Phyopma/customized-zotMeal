import {
  buildUrl,
  formatWeeklyResponse,
  formatDailyResponse,
} from "@/lib/helper";
import { mealParamsId } from "@/app/queryParams/mealParams";
import { locationParamsId } from "@/app/queryParams/locationParams";

async function fetchDailyData({ date }) {
  const mode = "Daily";
  const urls = [
    buildUrl(
      locationParamsId["BrandyWine"],
      mealParamsId["Brunch"],
      mode,
      date
    ),
    buildUrl(locationParamsId["BrandyWine"], mealParamsId["Lunch"], mode, date),
    buildUrl(
      locationParamsId["BrandyWine"],
      mealParamsId["Dinner"],
      mode,
      date
    ),
    buildUrl(
      locationParamsId["BrandyWine"],
      mealParamsId["LateNight"],
      mode,
      date
    ),
    buildUrl(locationParamsId["Anteatry"], mealParamsId["Brunch"], mode, date),
    buildUrl(locationParamsId["Anteatry"], mealParamsId["Lunch"], mode, date),
    buildUrl(locationParamsId["Anteatry"], mealParamsId["Dinner"], mode, date),
    buildUrl(
      locationParamsId["Anteatry"],
      mealParamsId["LateNight"],
      mode,
      date
    ),
  ];
  const responses = await Promise.all(
    urls.map((url) => fetch(url).then((res) => res.json()))
  );
  // console.log(urls);
  // console.log("Daily response", responses);
  return formatDailyResponse(responses);
}

async function fetchWeeklyData({ date, location }) {
  const mode = "Weekly";
  const urls = [
    buildUrl(location, mealParamsId["Lunch"], mode, date),
    buildUrl(location, mealParamsId["Brunch"], mode, date),
    buildUrl(location, mealParamsId["Dinner"], mode, date),
    buildUrl(location, mealParamsId["Breakfast"], mode, date),
    buildUrl(location, mealParamsId["LateNight"], mode, date),
  ];
  const responses = await Promise.all(
    urls.map((url) => fetch(url).then((res) => res.json()))
  );
  return formatWeeklyResponse(responses);
}

export { fetchDailyData, fetchWeeklyData };
