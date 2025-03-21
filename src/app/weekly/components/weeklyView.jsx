import { CollapsibleColumn } from "./collapsibleCol";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { CalendarIcon, ChevronLeft, ChevronRight } from "lucide-react";
import { locationParamsName } from "@/app/queryParams/locationParams";

export default function WeeklyView({ allMenus, location }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const dates = Object.keys(allMenus.menus);
  const totalDays = dates.length;

  const nextDay = () => {
    if (currentIndex < totalDays - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const prevDay = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const currentDate = dates[currentIndex];
  const menuItems = allMenus.menus[currentDate];

  // Simple date formatting
  const formatDate = (dateString) => {
    try {
      const date = new Date(dateString);
      if (isNaN(date.getTime())) return dateString;

      return date.toLocaleDateString("en-US", {
        weekday: "long",
        month: "long",
        day: "numeric",
      });
    } catch {
      return dateString;
    }
  };

  return (
    <div className=" rounded-lg shadow-lg ">
      <div className="p-6 bg-slate-800 text-white border-b border-slate-700">
        <div className="text-center">
          <h2 className="text-2xl font-bold">{locationParamsName[location]}</h2>
          <div className="flex items-center justify-center mt-2">
            <CalendarIcon className="h-5 w-5 mr-2 text-slate-300" />
            <h3 className="text-xl font-medium text-slate-100">
              {formatDate(currentDate)}
            </h3>
          </div>
        </div>

        <div className="flex justify-center gap-3 mt-4">
          <Button
            variant="outline"
            size="sm"
            onClick={prevDay}
            disabled={currentIndex === 0}
            className="bg-slate-700 text-white hover:bg-slate-600 border-slate-600">
            <ChevronLeft className="h-4 w-4 mr-1" /> Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={nextDay}
            disabled={currentIndex === totalDays - 1}
            className="bg-slate-700 text-white hover:bg-slate-600 border-slate-600">
            Next <ChevronRight className="h-4 w-4 ml-1" />
          </Button>
        </div>
      </div>

      <div className="p-6">
        <CollapsibleColumn
          date={currentDate}
          menuItems={menuItems}
          locationId={location}
        />
      </div>

      <div className="px-6 py-3 bg-slate-700 text-center text-sm text-slate-100  font-medium">
        Day {currentIndex + 1} of {totalDays}
      </div>
    </div>
  );
}
