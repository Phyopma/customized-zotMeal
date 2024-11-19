"use client";
import React, { useEffect } from "react";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuViewport,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { Separator } from "@/components/ui/separator";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import Link from "next/link";
import {
  useRouter,
  usePathname,
  useParams,
  useSearchParams,
} from "next/navigation";
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
  formatDate,
  getURLString,
} from "@/lib/helper";

export default function NavMenu() {
  const [date, setDate] = React.useState(new Date());

  // const params = {
  //   locationId: location,
  //   mode: "Daily",
  //   date: getCurrentDate(),
  //   periodId: meal,
  // };
  // const [location, setLocation] = React.useState("Brandy Wine");
  const searchParms = useSearchParams();
  const pathname = usePathname();

  const isSplit = searchParms.get("splited") === "true";
  const [location, setLocation] = React.useState();
  const locationId = parseInt(searchParms.get("location"));

  const router = useRouter();

  useEffect(() => {
    if (locationId) setLocation(locationId);
  }, [locationId, isSplit]);

  return (
    <NavigationMenu className="min-w-full flex flex-grow justify-start justify-items-center items-center gap-5">
      <NavigationMenuList>
        <DatePicker />
        <NavigationMenuItem className="w-32">
          <Select>
            <SelectTrigger className="focus:ring-0 focus:bg-transparent border-0 shadow-none">
              {/* <NavigationMenuTrigger> */}
              <SelectValue
                placeholder={pathname === "/daily" ? "Daily" : "Weekly"}
              />
            </SelectTrigger>
            <SelectContent>
              <SelectItem
                onClick={() =>
                  router.push(getURLString("/daily", searchParms.toString()))
                }
                value="daily">
                Daily
              </SelectItem>
              <SelectItem
                onClick={() =>
                  router.push(getURLString("/weekly", searchParms.toString()))
                }
                value="weekly">
                Weekly
              </SelectItem>
            </SelectContent>
          </Select>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <div className="flex items-center m-2 px-2 space-x-2">
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
            <SelectTrigger className="focus:ring-0 border-0 focus:bg-transparent shadow-none">
              <SelectValue placeholder={"Select Dining Hall"} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value={locationParamsId["Anteatry"]}>
                Anteatry
              </SelectItem>

              <SelectItem
                value={locationParamsId["BrandyWine"]}
                // onClick={() => {
                //   const updatedParams = appendSearchParam(
                //     searchParms,
                //     "location",
                //     locationParams["BrandyWine"]
                //   );
                //   router.push(getURLString(pathname, updatedParams));
                // }}
              >
                Brandy Wine
              </SelectItem>
            </SelectContent>
          </Select>
        </NavigationMenuItem>
        {/* <Button>Retrieve Menus</Button> */}
      </NavigationMenuList>
    </NavigationMenu>
  );
}
