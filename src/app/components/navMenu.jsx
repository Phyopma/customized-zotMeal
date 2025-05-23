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
import {
  locationParamsId,
  locationParamsName,
} from "../queryParams/locationParams";
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
    <NavigationMenu className="min-w-full bg-slate-800 border-b border-slate-700 py-3 px-4 md:px-8">
      <NavigationMenuList className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <DatePicker />
        </div>

        <div className="flex items-center gap-3">
          <NavigationMenuItem className="w-32 mx-3">
            <Select
              onValueChange={(val) => {
                if (val === "daily") {
                  router.push(getURLString("/daily", searchParms.toString()));
                } else if (val === "weekly") {
                  const updatedParmas = new URLSearchParams(searchParms);
                  updatedParmas.delete("splited");
                  router.push(
                    getURLString("/weekly", updatedParmas.toString())
                  );
                }
              }}>
              <SelectTrigger className="w-[120px] bg-slate-700  border-slate-600 focus:ring-0 focus:bg-transparent shadow-none">
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

          <NavigationMenuItem className="w-48">
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
              <SelectTrigger className="bg-slate-700 border-slate-600 focus:ring-0 focus:bg-transparent shadow-none">
                <SelectValue placeholder={"Select Dining Hall"} />
              </SelectTrigger>
              <SelectContent>
                {Object.keys(locationParamsId).map((loc) => (
                  <SelectItem key={loc} value={locationParamsId[loc]}>
                    {loc}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </NavigationMenuItem>
        </div>

        {pathname === "/daily" && !isMobile && (
          <NavigationMenuItem>
            <div className="flex items-center space-x-2">
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
                className="data-[state=checked]:bg-primary"
              />
              <label
                htmlFor="terms"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-white">
                Split View For Both Location
              </label>
            </div>
          </NavigationMenuItem>
        )}
      </NavigationMenuList>
    </NavigationMenu>
  );
}
