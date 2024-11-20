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

// Menu<Object> {
//     locationId<String>,
//         MenuId<String>,
//         MenuProducts<Array<Object>>[{
//         MenuProductId<String>,
//         ProductId<String>,
//         StationId<String>,
//             Product<Object>{
// MarketingName<String>,
// ShortDescription<String>,
//             Calories<String>,
//         AddedSugars<String>,
//             Protein<String>,
//             ShortDescription<String>,
//             TotalCarbohydrates<String>,
//             TotalFat<String>,
//             }
//         }]
// }
