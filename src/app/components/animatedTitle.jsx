"use client";
import { TextGenerateEffect } from "@/components/ui/text-generate-effect";

const words = `UCI Dinning Menus and Nutritional Information`;

export function AnimatedTitle() {
  return <TextGenerateEffect className="text-center" words={words} />;
}
