"use client";
import WeeklyView from "./weeklyView";
import { useState, useEffect } from "react";
import LoadingSpinner from "@/app/components/loadingSpinner";

export default function DataFetchingComponent({ searchParams }) {
  const { date, location } = searchParams;
  const [isLoading, setIsLoading] = useState(true);
  const [allMenus, setAllMenus] = useState();

  useEffect(() => {
    const fetchMenus = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(
          `/api/menus/Weekly/${location}?date=${date}`
        );
        const data = await response.json();
        setAllMenus(data.body);
      } catch (error) {
        console.log("Error fetching menus:", error);
        setIsLoading(false);
      } finally {
        setIsLoading(false);
      }
      console.log(allMenus);
    };

    fetchMenus();
  }, [date, location]);

  if (isLoading) return <LoadingSpinner />;
  return (
    <div className="columns-1 md:columns-2 gap-8 p-4 space-y-4">
      <WeeklyView allMenus={allMenus} location={location} />
    </div>
  );
}
