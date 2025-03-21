"use client";

import * as React from "react";
import { ChevronsUpDown } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { mealParamsName } from "@/app/queryParams/mealParams";
import { Separator } from "@/components/ui/separator";
import { stationParamsId } from "@/app/queryParams/stationParams";
import { locationParamsName } from "@/app/queryParams/locationParams";

export function CollapsibleColumn({ date, menuItems, locationId }) {
  const [isOpen, setIsOpen] = React.useState(true);
  const [expandedMeals, setExpandedMeals] = React.useState({});
  const location = locationParamsName[locationId];

  // Initialize all meal periods to be expanded on first render
  React.useEffect(() => {
    if (menuItems) {
      const initialState = {};
      Object.keys(menuItems).forEach((key) => {
        initialState[`${date}-${key}`] = "item-1"; // Use composite key with date
      });
      setExpandedMeals(initialState);
    }
  }, [date, menuItems]);

  // Handle accordion value change
  const handleAccordionChange = (mealKey, value) => {
    setExpandedMeals((prev) => ({
      ...prev,
      [`${date}-${mealKey}`]: value,
    }));
  };

  return (
    <Collapsible
      key={date}
      open={isOpen}
      onOpenChange={setIsOpen}
      className="w-full space-y-2">
      <div className="flex items-center justify-between space-x-4 px-4">
        {/* <h4 className="text-sm font-semibold text-slate-700">{date}</h4>
        <CollapsibleTrigger asChild>
          <Button
            variant="ghost"
            size="sm"
            className="text-slate-600 hover:text-slate-900">
            <ChevronsUpDown className="h-4 w-4" />
            <span className="sr-only">Toggle</span>
          </Button>
        </CollapsibleTrigger> */}
      </div>

      <CollapsibleContent className="space-y-3">
        {Object.keys(menuItems).map((mealKey) => {
          const accordionKey = `${date}-${mealKey}`;

          return (
            <Accordion
              key={accordionKey}
              type="single"
              collapsible
              value={expandedMeals[accordionKey]}
              onValueChange={(value) => handleAccordionChange(mealKey, value)}>
              <AccordionItem value="item-1" className="border-none">
                <AccordionTrigger className="rounded-md border border-sky-950 shadow-md px-4 py-2.5 font-semibold text-sm text-white bg-gradient-to-br from-blue-950 via-sky-900 to-blue-950 hover:opacity-90 transition-opacity">
                  {mealParamsName[mealKey]}
                </AccordionTrigger>
                <div className="mt-2 grid grid-cols-1 divide-y divide-slate-100 py-1 px-2 rounded-md bg-gradient-to-r from-blue-200 to-indigo-200 via-sky-200 shadow-sm">
                  {Object.values(menuItems[mealKey])
                    .filter((item) => {
                      return Object.values(stationParamsId[location]).includes(
                        item.stationId
                      );
                    })
                    .map((item, idx) => (
                      <AccordionContent
                        key={item.menuProductId + idx}
                        className="py-4 px-2.5 group hover:bg-slate-50 transition-all duration-200 rounded">
                        <div className="flex w-full justify-between items-center gap-3">
                          <span className="text-slate-800 font-medium tracking-tight group-hover:text-blue-700 transition-colors">
                            {item.name}
                          </span>
                          <div className="flex items-center gap-2.5 flex-shrink-0">
                            {item.calories && (
                              <span className="text-[11px] font-medium text-slate-600 bg-slate-100 py-1 px-2.5 rounded-full whitespace-nowrap">
                                {item.calories} cal
                              </span>
                            )}
                            {item.protein && (
                              <span className="text-[11px] font-medium text-blue-600 bg-blue-50 py-1 px-2.5 rounded-full whitespace-nowrap">
                                {item.protein}g protein
                              </span>
                            )}
                          </div>
                        </div>
                      </AccordionContent>
                    ))}
                </div>
              </AccordionItem>
            </Accordion>
          );
        })}
      </CollapsibleContent>
    </Collapsible>
  );
}
