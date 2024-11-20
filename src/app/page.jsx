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
}
