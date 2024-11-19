"use client";

import { useEffect, useState } from "react";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { NavigationMenuItem } from "@/components/ui/navigation-menu";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { appendSearchParam, formatDate, getURLString } from "@/lib/helper";

export function DatePicker() {
  const pathname = usePathname();
  const searchParms = useSearchParams();
  const [date, setDate] = useState();
  const [open, setOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    let date = searchParms.get("date");
    if (date) {
      date = formatDate(new Date(decodeURI(date)));
      console.log(date);
      setDate(date);
    }
  }, []);

  return (
    <NavigationMenuItem>
      <Popover onOpenChange={setOpen} open={open}>
        <PopoverTrigger className="m-2 border-0 shadow-none" asChild>
          <Button
            variant={"primary"}
            className={cn(
              "w-60 justify-start text-left font-normal",
              !date && "text-muted-foreground"
            )}>
            <CalendarIcon className="mr-2 h-4 w-4" />
            {date ? format(date, "PPP") : <span>Pick a date</span>}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0">
          <Calendar
            mode="single"
            selected={date}
            onSelect={(val) => {
              setDate(formatDate(val));
              setOpen(false);
              const updatedParams = appendSearchParam(
                searchParms,
                "date",
                formatDate(val)
              );
              router.push(getURLString(pathname, updatedParams));
            }}
          />
        </PopoverContent>
      </Popover>
    </NavigationMenuItem>
  );
}
