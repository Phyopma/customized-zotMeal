"use client";
import { formatDate, getURLString } from "@/lib/helper";
import { LampEffect } from "./components/lampEffect";

export default function Home() {
  const defaultParams = new URLSearchParams();
  defaultParams.set("date", formatDate());
  const weeklyURL = getURLString("weekly", defaultParams.toString());
  defaultParams.set("splited", true);
  const dailyURL = getURLString("daily", defaultParams.toString());
  return <LampEffect dailyURL={dailyURL} weeklyURL={weeklyURL} />;
}
