"use client";
import { formatDate, getURLString } from "@/lib/helper";
import { LampEffect } from "./components/lampEffect";
import { useState, useEffect } from "react";
import { locationParamsId } from "./queryParams/locationParams";

export default function Home() {
  const [urls, setUrls] = useState({ dailyURL: "", weeklyURL: "" });
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768); // 768px is Tailwind's md breakpoint
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    const defaultParams = new URLSearchParams();
    defaultParams.set("date", formatDate());
    const weeklyURL = getURLString("weekly", defaultParams.toString());
    if (!isMobile) {
      defaultParams.set("splited", true);
    } else {
      defaultParams.set("location", locationParamsId["BrandyWine"]);
      defaultParams.delete("splited");
    }
    const dailyURL = getURLString("daily", defaultParams.toString());
    setUrls({ dailyURL, weeklyURL });
  }, [isMobile]);

  return <LampEffect dailyURL={urls.dailyURL} weeklyURL={urls.weeklyURL} />;
}
