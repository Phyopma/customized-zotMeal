import { buildUrl, formatWeeklyResponse } from "@/lib/helper";
import { mealParamsId } from "@/app/queryParams/mealParams";

import { CollapsibleColumn } from "./collapsibleCol";

async function fetchData({ date, location }) {
  const mode = "Weekly";
  const urls = [
    buildUrl(location, mealParamsId["Lunch"], mode, date),
    buildUrl(location, mealParamsId["Brunch"], mode, date),
    buildUrl(location, mealParamsId["Dinner"], mode, date),
    buildUrl(location, mealParamsId["Breakfast"], mode, date),
  ];
  const responses = await Promise.all(
    urls.map((url) => fetch(url).then((res) => res.json()))
  );
  return formatWeeklyResponse(responses);
}
export default async function DataFetchingComponent({ searchParams }) {
  const { date, location } = await searchParams;
  const allMenus = await fetchData({ date, location });

  return (
    <div className="columns-1 md:columns-2 gap-8 p-4 space-y-4">
      {Object.entries(allMenus.menus).map(([date, menuItems]) => (
        <div key={date} className="break-inside-avoid">
          <CollapsibleColumn
            date={date}
            menuItems={menuItems}
            locationId={location}
          />
        </div>
      ))}
    </div>
  );
}
