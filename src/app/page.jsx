// import { Calendar } from "@/components/ui/calendar";
// import { useEffect, useState } from "react";
// import locationParams from "./queryParams/locationParams";
// import mealParams from "./queryParams/mealParams";
// import stationParams from "./queryParams/stationParams";

import { formatDate, getURLString } from "@/lib/helper";
import { redirect } from "next/navigation";
import { LampEffect } from "./components/lampEffect";

export default function Home() {
  const defaultParams = new URLSearchParams();
  defaultParams.set("date", formatDate());
  const weeklyURL = getURLString("weekly", defaultParams.toString());
  defaultParams.set("splited", true);
  const dailyURL = getURLString("daily", defaultParams.toString());
  return <LampEffect dailyURL={dailyURL} weeklyURL={weeklyURL} />;
  // return <div>Home</div>;
  // const [fetchData, setFetchData] = useState(undefined);
  // // const [date, setDate] = useState(new Date());
  // const handleClick = async () => {
  //   try {
  //     const locationId = locationParams["BrandyWine"];
  //     const mealId = mealParams["Dinner"];
  //     const data = await fetch(`api/menus/${locationId}/${mealId}`).then(
  //       (res) => res.json()
  //     );
  //     const { menus, ...rest } = data.body;
  //     const filteredMenus = data.body.menus.filter((item) =>
  //       Object.values(stationParams["BrandyWine"]).includes(item.stationId)
  //     );

  //     setFetchData({ ...rest, menus: filteredMenus });
  //   } catch (error) {
  //     console.error("Error fetching data:", error);
  //   }
  // };

  // useEffect(() => {
  //   handleClick();
  // }, []);

  // return (
  //   <div className="text-center w-full h-full p-3 font-bold text-xl text-red">
  //     <h1 className="text-3xl shadow-md tracking-widest leading-loose">
  //       UCI Dining
  //     </h1>
  //     {/*
  //     <Calendar
  //       mode="single"
  //       selected={date}
  //       onSelect={setDate}
  //       className="flex justify-center items-center w-full h-full rounded-md shadow-sm"
  //     /> */}

  //     {fetchData ? (
  //       <ul className="">
  //         {fetchData.menus.map((item) => (
  //           <li key={item.menuProductId}>{item.name}</li>
  //         ))}
  //       </ul>
  //     ) : (
  //       <p>Loading...</p>
  //     )}
  //   </div>
  // );
}
