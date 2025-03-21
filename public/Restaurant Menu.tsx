"use client"

import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { CalendarIcon } from "lucide-react"
import { useState } from "react"

export default function RestaurantMenu() {
  const [splitView, setSplitView] = useState(false)
  const [currentDate] = useState(new Date("2025-04-01"))

  const formatDate = (date: Date) => {
    return date
      .toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
        ordinal: true,
      })
      .replace(/(\d+)(?=(st|nd|rd|th))/, "$1$2")
  }

  return (
    <div className="min-h-screen bg-slate-900 text-white">
      {/* Header Navigation */}
      <header className="bg-slate-900 border-b border-slate-800 py-3 px-4 md:px-8">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <CalendarIcon className="h-5 w-5 text-slate-400" />
            <span>{formatDate(currentDate)}</span>
          </div>

          <div className="flex items-center gap-2">
            <Select defaultValue="daily">
              <SelectTrigger className="w-[120px] bg-slate-800 border-slate-700">
                <SelectValue placeholder="View" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="daily">Daily</SelectItem>
                <SelectItem value="weekly">Weekly</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="splitView"
                checked={splitView}
                onCheckedChange={(checked) => setSplitView(checked as boolean)}
                className="data-[state=checked]:bg-primary"
              />
              <label
                htmlFor="splitView"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Split View For Both Location
              </label>
            </div>
          </div>
        </div>
      </header>

      {/* Menu Content */}
      <div className="p-4 md:p-8">
        <div className="max-w-7xl mx-auto">
          {splitView ? (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div>
                <h2 className="text-2xl font-bold mb-6">Anteatry</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <MenuCard
                    title="Scrambled Eggs"
                    description="Eggs gently scrambled to fluffy perfection"
                    calories={190}
                    protein={16}
                    carbs={0}
                    fat={12}
                    addedSugars={0}
                    tags={["High Protein", "LowCal"]}
                    source="Home"
                    category="Breakfast"
                    bgColor="amber"
                  />

                  <MenuCard
                    title="O'Brien Potatoes"
                    description="Pan-fried seasoned diced potatoes and sauteed green and red peppers and onions"
                    calories={140}
                    protein={1}
                    carbs={18}
                    fat={7}
                    addedSugars={0}
                    tags={["LowCal"]}
                    source="Home"
                    category="Breakfast"
                    bgColor="amber"
                  />

                  <MenuCard
                    title="Bacon (2 slice)"
                    description="Crisp, lightly smoked bacon strips"
                    calories={120}
                    protein={7}
                    carbs={0}
                    fat={9}
                    addedSugars={0}
                    tags={["LowCal"]}
                    source=""
                    category="Breakfast"
                    bgColor="amber"
                  />

                  <MenuCard
                    title="Carnitas Taco"
                    description="Allergen friendly soft corn tortilla filled with shredded pork, vegan cheddar cheese, shredded lettuce, tomatoes, salsa & jalapenos"
                    calories={210}
                    protein={12}
                    carbs={14}
                    fat={11}
                    addedSugars={0}
                    tags={["High Protein"]}
                    source=""
                    category=""
                    bgColor="emerald"
                  />
                </div>
              </div>

              <div>
                <h2 className="text-2xl font-bold mb-6">BrandyWine</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <MenuCard
                    title="Scrambled Eggs"
                    description="Eggs gently scrambled to fluffy perfection"
                    calories={190}
                    protein={16}
                    carbs={0}
                    fat={12}
                    addedSugars={0}
                    tags={["High Protein", "LowCal"]}
                    source="Grub"
                    category="Breakfast"
                    bgColor="amber"
                  />

                  <MenuCard
                    title="Hash Brown Potatoes"
                    description="Pan-fried seasoned diced potatoes"
                    calories={120}
                    protein={1}
                    carbs={19}
                    fat={4.5}
                    addedSugars={0}
                    tags={["LowCal"]}
                    source="Grub"
                    category="Breakfast"
                    bgColor="amber"
                  />

                  <MenuCard
                    title="Bacon (2 slice)"
                    description="Crisp, lightly smoked bacon strips"
                    calories={120}
                    protein={7}
                    carbs={0}
                    fat={9}
                    addedSugars={0}
                    tags={["LowCal"]}
                    source=""
                    category="Breakfast"
                    bgColor="amber"
                  />

                  <MenuCard
                    title="Pork & Vegetable Stir Fry"
                    description="Stir-fried pork with peppers, onions, & scallions with sweet chili sauce"
                    calories={110}
                    protein={7}
                    carbs={10}
                    fat={4.5}
                    addedSugars={0}
                    tags={["LowCal"]}
                    source="Grub"
                    category=""
                    bgColor="emerald"
                  />
                </div>
              </div>
            </div>
          ) : (
            <Tabs defaultValue="anteatry" className="w-full">
              <div className="flex items-center justify-center mb-8">
                <TabsList className="bg-slate-800">
                  <TabsTrigger value="anteatry" className="data-[state=active]:bg-primary">
                    Anteatry
                  </TabsTrigger>
                  <TabsTrigger value="brandywine" className="data-[state=active]:bg-primary">
                    BrandyWine
                  </TabsTrigger>
                </TabsList>
              </div>

              <TabsContent value="anteatry" className="mt-0">
                <h2 className="text-2xl font-bold mb-6">Anteatry</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <MenuCard
                    title="Scrambled Eggs"
                    description="Eggs gently scrambled to fluffy perfection"
                    calories={190}
                    protein={16}
                    carbs={0}
                    fat={12}
                    addedSugars={0}
                    tags={["High Protein", "LowCal"]}
                    source="Home"
                    category="Breakfast"
                    bgColor="amber"
                  />

                  <MenuCard
                    title="O'Brien Potatoes"
                    description="Pan-fried seasoned diced potatoes and sauteed green and red peppers and onions"
                    calories={140}
                    protein={1}
                    carbs={18}
                    fat={7}
                    addedSugars={0}
                    tags={["LowCal"]}
                    source="Home"
                    category="Breakfast"
                    bgColor="amber"
                  />

                  <MenuCard
                    title="Bacon (2 slice)"
                    description="Crisp, lightly smoked bacon strips"
                    calories={120}
                    protein={7}
                    carbs={0}
                    fat={9}
                    addedSugars={0}
                    tags={["LowCal"]}
                    source=""
                    category="Breakfast"
                    bgColor="amber"
                  />

                  <MenuCard
                    title="Carnitas Taco"
                    description="Allergen friendly soft corn tortilla filled with shredded pork, vegan cheddar cheese, shredded lettuce, tomatoes, salsa & jalapenos"
                    calories={210}
                    protein={12}
                    carbs={14}
                    fat={11}
                    addedSugars={0}
                    tags={["High Protein"]}
                    source=""
                    category=""
                    bgColor="emerald"
                  />
                </div>
              </TabsContent>

              <TabsContent value="brandywine" className="mt-0">
                <h2 className="text-2xl font-bold mb-6">BrandyWine</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <MenuCard
                    title="Scrambled Eggs"
                    description="Eggs gently scrambled to fluffy perfection"
                    calories={190}
                    protein={16}
                    carbs={0}
                    fat={12}
                    addedSugars={0}
                    tags={["High Protein", "LowCal"]}
                    source="Grub"
                    category="Breakfast"
                    bgColor="amber"
                  />

                  <MenuCard
                    title="Hash Brown Potatoes"
                    description="Pan-fried seasoned diced potatoes"
                    calories={120}
                    protein={1}
                    carbs={19}
                    fat={4.5}
                    addedSugars={0}
                    tags={["LowCal"]}
                    source="Grub"
                    category="Breakfast"
                    bgColor="amber"
                  />

                  <MenuCard
                    title="Bacon (2 slice)"
                    description="Crisp, lightly smoked bacon strips"
                    calories={120}
                    protein={7}
                    carbs={0}
                    fat={9}
                    addedSugars={0}
                    tags={["LowCal"]}
                    source=""
                    category="Breakfast"
                    bgColor="amber"
                  />

                  <MenuCard
                    title="Pork & Vegetable Stir Fry"
                    description="Stir-fried pork with peppers, onions, & scallions with sweet chili sauce"
                    calories={110}
                    protein={7}
                    carbs={10}
                    fat={4.5}
                    addedSugars={0}
                    tags={["LowCal"]}
                    source="Grub"
                    category=""
                    bgColor="emerald"
                  />
                </div>
              </TabsContent>
            </Tabs>
          )}
        </div>
      </div>
    </div>
  )
}

interface MenuCardProps {
  title: string
  description: string
  calories: number
  protein: number
  carbs: number
  fat: number
  addedSugars: number
  tags: string[]
  source: string
  category: string
  bgColor: "amber" | "emerald"
}

function MenuCard({
  title,
  description,
  calories,
  protein,
  carbs,
  fat,
  addedSugars,
  tags,
  source,
  category,
  bgColor,
}: MenuCardProps) {
  // Color mapping based on bgColor prop
  const colorMap = {
    amber: {
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
    emerald: {
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
  }

  const colors = colorMap[bgColor]

  return (
    <Card
      className={`${colors.bg} ${colors.text} overflow-hidden border-none shadow-md hover:shadow-lg transition-shadow h-[350px]`}
    >
      <CardHeader className="pb-2">
        <CardTitle className="text-xl font-bold">{title}</CardTitle>
        <div className={`${colors.muted} min-h-[60px] max-h-[100px] overflow-hidden`}>
          <p className="line-clamp-2">{description}</p>
        </div>
      </CardHeader>
      <CardContent className="pb-2 h-[180px]">
        <div className="flex flex-wrap gap-2 mb-4 h-[30px]">
          {tags.map((tag) => (
            <Badge key={tag} className={tag === "High Protein" ? colors.badge.highProtein : colors.badge.lowCal}>
              {tag}
            </Badge>
          ))}
        </div>

        <div className="space-y-2">
          <div className="font-semibold">Calories: {calories} kcals</div>
          <div className="grid grid-cols-2 gap-x-4 gap-y-1">
            <div>Protein: {protein} g</div>
            <div>Carbs: {carbs} g</div>
            <div>Fat: {fat} g</div>
            <div>Added Sugars: {addedSugars} g</div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="pt-0 h-[70px] flex items-center">
        <div className="flex justify-between w-full">
          {category ? (
            <Badge variant="outline" className={colors.badge.category}>
              {category}
            </Badge>
          ) : (
            <span></span>
          )}
          {source ? (
            <Badge variant="outline" className={colors.badge.source}>
              {source}
            </Badge>
          ) : (
            <span></span>
          )}
        </div>
      </CardFooter>
    </Card>
  )
}

