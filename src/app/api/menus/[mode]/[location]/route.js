import { fetchDailyData, fetchWeeklyData } from "@/lib/actions/fetchMenus";
// import { mealParamsId } from "@/app/queryParams/mealParams";
// import { buildUrl, formatResponse } from "@/lib/helper";

// export async function GET(request, { params }) {
//   const { location } = await params;

//   // lunch or brunch or dinner
//   const urls = [
//     buildUrl(location, mealParamsId["Lunch"]),
//     buildUrl(location, mealParamsId["Brunch"]),
//     buildUrl(location, mealParamsId["Dinner"]),
//   ];
//   const responses = await Promise.all(
//     urls.map((url) => fetch(url).then((res) => res.json()))
//   );
//   // const response = await fetch(url).then((res) => res.json());
//   const data = formatResponse(responses);
//   console.log(data);

//   return Response.json({
//     status: 200,
//     body: data,
//   });
// }

export async function GET(request, { params }) {
  const { mode, location } = await params;
  const date = request.nextUrl.searchParams.get("date");

  const menus =
    mode === "Weekly"
      ? await fetchWeeklyData({ date, location })
      : await fetchDailyData({ date });
  return Response.json({
    status: 200,
    body: menus,
  });
}
