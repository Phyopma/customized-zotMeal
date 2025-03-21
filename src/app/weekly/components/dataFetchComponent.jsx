"use client";
import WeeklyView from "./weeklyView";
import { useState, useEffect } from "react";
import LoadingSpinner from "@/app/components/loadingSpinner";

export default function DataFetchingComponent({ searchParams }) {
  const { date, location } = searchParams;
  const [isLoading, setIsLoading] = useState(true);
  const [allMenus, setAllMenus] = useState();
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMenus = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await fetch(
          `/api/menus/Weekly/${location}?date=${date}`
        );
        if (!response.ok) {
          throw new Error(`Error: ${response.status}`);
        }
        const data = await response.json();
        setAllMenus(data.body);
      } catch (error) {
        console.log("Error fetching menus:", error);
        setError("Failed to load weekly menu data. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchMenus();
  }, [date, location]);

  return (
    <div className="max-w-7xl mx-auto p-4">
      {isLoading ? (
        <LoadingSpinner />
      ) : error ? (
        <div className="p-8 text-center">
          <p className="text-red-500">{error}</p>
        </div>
      ) : (
        <WeeklyView allMenus={allMenus} location={location} />
      )}
    </div>
  );
}
