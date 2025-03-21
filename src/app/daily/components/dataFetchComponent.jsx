"use client";
import SplitedView from "./splitedView";
import IndividualView from "./individualView";
import { useState, useEffect } from "react";
import LoadingSpinner from "@/app/components/loadingSpinner";

export default function DataFetchingComponent({ searchParams }) {
  const [isLoading, setIsLoading] = useState(true);
  const [allMenus, setAllMenus] = useState();
  const [error, setError] = useState(null);
  const { date, splited, location } = searchParams;
  const isSplited = splited === "true";

  useEffect(() => {
    const fetchMenus = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await fetch(
          `/api/menus/Daily/${location}?date=${date}`
        );
        if (!response.ok) {
          throw new Error(`Error: ${response.status}`);
        }
        const data = await response.json();
        setAllMenus(data.body);
      } catch (error) {
        console.log("Error fetching menus:", error);
        setError("Failed to load menu data. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchMenus();
  }, [date, location]);

  return (
    <div className="max-w-7xl mx-auto min-w-[90vw] p-4">
      {isLoading ? (
        <LoadingSpinner />
      ) : error ? (
        <div className="p-8 text-center">
          <p className="text-red-500">{error}</p>
        </div>
      ) : isSplited ? (
        <SplitedView allMenus={allMenus} />
      ) : (
        <IndividualView menus={allMenus[location].menus} location={location} />
      )}
    </div>
  );
}
