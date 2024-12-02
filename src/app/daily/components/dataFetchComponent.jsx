"use client";
import SplitedView from "./splitedView";
import IndividualView from "./individualView";
import { useState, useEffect } from "react";
import LoadingSpinner from "@/app/components/loadingSpinner";

export default function DataFetchingComponent({ searchParams }) {
  const [isLoading, setIsLoading] = useState(true);
  const [allMenus, setAllMenus] = useState();
  const { date, splited, location } = searchParams;
  const isSplited = splited === "true";
  useEffect(() => {
    const fetchMenus = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(
          `/api/menus/Daily/${location}?date=${date}`
        );
        const data = await response.json();
        setAllMenus(data.body);
      } catch (error) {
        setIsLoading(false);
        console.log("Error fetching menus:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMenus();
  }, [date, location]);

  return (
    <div>
      {isLoading ? (
        <LoadingSpinner />
      ) : isSplited ? (
        <SplitedView allMenus={allMenus} />
      ) : (
        <IndividualView menus={allMenus[location].menus} location={location} />
      )}
    </div>
  );
}
