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

// Color mapping based on meal type
const mealTypeColors = {
  Breakfast: {
    bg: "bg-amber-50",
    text: "text-slate-900",
    muted: "text-slate-600",
    badge: {
      highProtein: "bg-amber-600 text-white hover:bg-amber-700",
      lowCal: "bg-amber-200 text-amber-800 hover:bg-amber-300",
      category: "bg-rose-100 text-rose-800 border-rose-200 hover:bg-rose-100",
      source: "bg-blue-100 text-blue-800 border-blue-200 hover:bg-blue-100",
    },
  },
  Lunch: {
    bg: "bg-emerald-50",
    text: "text-slate-900",
    muted: "text-slate-600",
    badge: {
      highProtein: "bg-emerald-600 text-white hover:bg-emerald-700",
      lowCal: "bg-emerald-200 text-emerald-800 hover:bg-emerald-300",
      category: "bg-rose-100 text-rose-800 border-rose-200 hover:bg-rose-100",
      source: "bg-blue-100 text-blue-800 border-blue-200 hover:bg-blue-100",
    },
  },
  Dinner: {
    bg: "bg-blue-50",
    text: "text-slate-900",
    muted: "text-slate-600",
    badge: {
      highProtein: "bg-blue-600 text-white hover:bg-blue-700",
      lowCal: "bg-blue-200 text-blue-800 hover:bg-blue-300",
      category: "bg-rose-100 text-rose-800 border-rose-200 hover:bg-rose-100",
      source: "bg-blue-100 text-blue-800 border-blue-200 hover:bg-blue-100",
    },
  },
  Brunch: {
    bg: "bg-pink-50",
    text: "text-slate-900",
    muted: "text-slate-600",
    badge: {
      highProtein: "bg-pink-600 text-white hover:bg-pink-700",
      lowCal: "bg-pink-200 text-pink-800 hover:bg-pink-300",
      category: "bg-rose-100 text-rose-800 border-rose-200 hover:bg-rose-100",
      source: "bg-blue-100 text-blue-800 border-blue-200 hover:bg-blue-100",
    },
  },
};

export function MenuCard({ menu, location }) {
  const mealType = mealParamsName[menu.periodId];
  const colors = mealTypeColors[mealType] || mealTypeColors.Breakfast;

  const tags = [];
  if (menu.protein > 10) tags.push("High Protein");
  if (menu.calories < 200) tags.push("LowCal");

  return (
    <Card
      className={cn(
        `${colors.bg} ${colors.text} overflow-hidden border-none shadow-md hover:shadow-lg transition-shadow h-[350px] mx-2`
      )}>
      <CardHeader className="pb-2">
        <CardTitle className="text-xl font-bold">{menu.name}</CardTitle>
        <div
          className={`${colors.muted} min-h-[60px] max-h-[100px] overflow-hidden`}>
          <p className="line-clamp-2">{menu.shortDescription}</p>
        </div>
      </CardHeader>
      <CardContent className="pb-2 h-[180px]">
        <div className="flex flex-wrap gap-2 mb-4 h-[30px]">
          {tags.map((tag) => (
            <Badge
              key={tag}
              className={
                tag === "High Protein"
                  ? colors.badge.highProtein
                  : colors.badge.lowCal
              }>
              {tag}
            </Badge>
          ))}
        </div>

        <div className="space-y-2">
          <div className="font-semibold">Calories: {menu.calories} kcals</div>
          <div className="grid grid-cols-2 gap-x-4 gap-y-1">
            <div>Protein: {menu.protein} g</div>
            <div>Carbs: {menu.totalCarbohydrates} g</div>
            <div>Fat: {menu.totalFat} g</div>
            <div>Added Sugars: {menu.addedSugars} g</div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="pt-0 h-[30px] flex items-center">
        <div className="flex justify-start gap-4 w-full">
          <Badge variant="outline" className={colors.badge.category}>
            {mealType}
          </Badge>
          <Badge variant="outline" className={colors.badge.source}>
            {stationParamsName[location][menu.stationId]}
          </Badge>
        </div>
      </CardFooter>
    </Card>
  );
}

// menuProductId: mp.MenuProductId,
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
