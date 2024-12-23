import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { mealParamsName } from "../queryParams/mealParams";
import { stationParamsName } from "../queryParams/stationParams";
import { cn } from "@/lib/utils";

const mealTypeColors = {
  Breakfast: "bg-gradient-to-tl from-yellow-200 via-yellow-50 to-yellow-100",
  Lunch: "bg-gradient-to-tl from-green-200 via-green-50 to-green-100",
  Dinner: "bg-gradient-to-tl from-blue-200 via-blue-50 to-blue-100",
  Brunch: "bg-gradient-to-tl from-pink-200 via-pink-50 to-pink-100",
};

export function MenuCard({ menu, location }) {
  const mealType = mealParamsName[menu.periodId];
  const bgColor = mealTypeColors[mealType];
  return (
    <Card
      className={cn(
        "h-[510px] flex flex-col  justify-between shadow-md",
        bgColor
      )}>
      <CardHeader className="max-h-[200px]">
        <CardTitle className="text-xl font-bold">{menu.name}</CardTitle>
        <CardDescription className="text-sm font-sans line-clamp-4 text-slate-600">
          {menu.shortDescription}
        </CardDescription>
      </CardHeader>
      <CardContent className="max-h[250px]">
        <div className="flex flex-row gap-4 items-center ">
          {menu.protein > 10 && (
            <Badge
              className={"rounded-full text-xs font-semibold px-3"}
              variant="">
              High Protein
            </Badge>
          )}
          {menu.calories < 200 && (
            <Badge
              className={"rounded-full text-xs font-semibold px-3"}
              variant="">
              LowCal
            </Badge>
          )}
        </div>
        <div className="flex flex-col pt-5 text-sm font-semibold leading-8">
          <span>Calories: {menu.calories} kcals</span>
          <span>Protein: {menu.protein} g</span>
          <span>Total Carbohydrates: {menu.totalCarbohydrates} g</span>
          <span>Total Fat: {menu.totalFat} g</span>
          <span>Added Sugars: {menu.addedSugars} g</span>
        </div>
      </CardContent>
      <CardFooter className="mt-4">
        <div className="flex flex-row gap-2 justify-between">
          <Badge
            variant={"destructive"}
            className={"rounded-full px-3 py-1 shadow-sm"}>
            {mealType}
          </Badge>
          <Badge
            className={"rounded-full px-3 py-1 shadow-sm"}
            variant="outline">
            {stationParamsName[location][menu.stationId]}
          </Badge>
        </div>
      </CardFooter>
    </Card>
  );
}

//  menuProductId: mp.MenuProductId,
// periodId: mp.PeriodId,
// productId: mp.ProductId,
// stationId: mp.StationId,
// name: mp.Product.MarketingName,
// calories: mp.Product.Calories,
// addedSugars: mp.Product.AddedSugars,
// protein: mp.Product.Protein,
// shortDescription: mp.Product.ShortDescription,
// totalCarbohydrates: mp.Product.TotalCarbohydrates,
// totalFat: mp.Product.TotalFat,
