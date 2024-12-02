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

  const location = locationParamsName[locationId];
  return (
    <Collapsible
      key={date}
      open={isOpen}
      onOpenChange={setIsOpen}
      className="w-full space-y-2 ">
      <div className="flex items-center justify-between space-x-4 px-4">
        <h4 className="text-sm font-semibold">{date}</h4>
        <CollapsibleTrigger asChild>
          <Button variant="ghost" size="sm">
            <ChevronsUpDown className="h-4 w-4" />
            <span className="sr-only">Toggle</span>
          </Button>
        </CollapsibleTrigger>
      </div>

      <CollapsibleContent className="space-y-2">
        {Object.keys(menuItems).map((key) => (
          <Accordion key={date + key} type="single" collapsible>
            <AccordionItem value="item-1">
              <AccordionTrigger className="rounded-md border border-sky-950 shadow-lg px-4 py-2 font-semibold text-sm text-white bg-gradient-to-br from-blue-950 via-sky-900 to-blue-950 ">
                {mealParamsName[key]}
              </AccordionTrigger>
              {Object.values(menuItems[key])
                .filter((item) => {
                  return Object.values(stationParamsId[location]).includes(
                    item.stationId
                  );
                })
                .map((item, idx) => (
                  <AccordionContent
                    key={item.menuProductId + idx}
                    className="flex flex-row py-4 px-6">
                    <div className="flex w-full flex-row justify-between items-center">
                      <span>{item.name}</span>
                      <div className="flex flex-row gap-2">
                        <span className="w-24">
                          {item.calories && `${item.calories} kcals`}
                        </span>
                        {(item.calories || item.protein) && (
                          <Separator className="h-4" orientation="vertical" />
                        )}
                        <span className="w-10">
                          {item.protein && `${item.protein} g`}{" "}
                        </span>
                      </div>
                    </div>
                  </AccordionContent>
                ))}
            </AccordionItem>
          </Accordion>
          //   <div
          //     key={key}
          //     className="rounded-md border border-sky-950 shadow-lg px-4 py-2 font-semibold text-sm text-white bg-gradient-to-br from-blue-950 via-sky-900 to-blue-950 ">
          //     {mealParamsName[key]}
          //   </div>
        ))}
      </CollapsibleContent>
    </Collapsible>
  );
}
