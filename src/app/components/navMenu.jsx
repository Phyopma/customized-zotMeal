"use client";
import { SyncLoader } from "react-spinners";
import React, { useEffect, useState } from "react";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";

import { Checkbox } from "@/components/ui/checkbox";

import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { DatePicker } from "./datePicker";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { locationParamsId } from "../queryParams/locationParams";
import {
  appendSearchParam,
  clearLocationParams,
  getURLString,
} from "@/lib/helper";

export default function NavMenu() {
  const searchParms = useSearchParams();
  const pathname = usePathname();
  const [isMobile, setIsMobile] = useState(false);
  const isSplit = searchParms.get("splited") === "true";
  const [location, setLocation] = React.useState();
  const locationId = parseInt(searchParms.get("location"));

  const router = useRouter();

  useEffect(() => {
    if (locationId) setLocation(locationId);
  }, [locationId, isSplit]);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768); // 768px is Tailwind's md breakpoint
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  return (
    <NavigationMenu className="min-w-full">
      <NavigationMenuList className="flex flex-wrap space-y-3 px-1">
        <SyncLoader
          color="#1bc1b4"
          cssOverride={{ display: "none" }}
          size={20}
          margin={7}
        />
        <DatePicker />
        <NavigationMenuItem className="w-32">
          <Select
            onValueChange={(val) => {
              if (val === "daily") {
                router.push(getURLString("/daily", searchParms.toString()));
              } else if (val === "weekly") {
                const updatedParmas = new URLSearchParams(searchParms);
                updatedParmas.delete("splited");
                router.push(getURLString("/weekly", updatedParmas.toString()));
              }
            }}>
            <SelectTrigger className="focus:ring-0 focus:bg-transparent border-0 shadow-none">
              <SelectValue
                placeholder={pathname === "/daily" ? "Daily" : "Weekly"}
              />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="daily">Daily</SelectItem>
              <SelectItem value="weekly">Weekly</SelectItem>
            </SelectContent>
          </Select>
        </NavigationMenuItem>
        <NavigationMenuItem className="w-48 p-2">
          <Select
            disabled={isSplit}
            value={location}
            onValueChange={(val) => {
              setLocation(val);
              const updatedParams = appendSearchParam(
                searchParms,
                "location",
                val
              );
              router.push(getURLString(pathname, updatedParams));
            }}>
            <SelectTrigger className="focus:ring-0 border-0 focus:bg-transparent shadow-none">
              <SelectValue placeholder={"Select Dining Hall"} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value={locationParamsId["Anteatry"]}>
                Anteatry
              </SelectItem>

              <SelectItem value={locationParamsId["BrandyWine"]}>
                Brandy Wine
              </SelectItem>
            </SelectContent>
          </Select>
        </NavigationMenuItem>
        {pathname === "/daily" && !isMobile && (
          <NavigationMenuItem>
            <div className="flex items-center m-2 px-2 space-x-2 mb-4">
              <Checkbox
                checked={isSplit}
                onCheckedChange={(val) => {
                  let updatedParams = clearLocationParams(searchParms);
                  setLocation("");
                  updatedParams = appendSearchParam(
                    updatedParams,
                    "splited",
                    val
                  );
                  router.push(getURLString(pathname, updatedParams));
                }}
                id="terms"
              />
              <label
                htmlFor="terms"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                Split View For Both Location
              </label>
            </div>
          </NavigationMenuItem>
        )}
      </NavigationMenuList>
    </NavigationMenu>
  );
}
