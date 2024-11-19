"use client";
import React from "react";
import { motion } from "framer-motion";
import { LampContainer } from "@/components/ui/lamp";
import { AnimatedTitle } from "./animatedTitle";
import { Button } from "@/components/ui/moving-border";
import { useRouter } from "next/navigation";

export function LampEffect({ dailyURL, weeklyURL }) {
  const router = useRouter();
  return (
    <LampContainer>
      <motion.h1
        initial={{ opacity: 0.5, y: 100 }}
        whileInView={{ opacity: 1, y: 30 }}
        transition={{
          delay: 0.3,
          duration: 0.8,
          ease: "easeInOut",
        }}
        className="mt-8 mb-16 bg-gradient-to-br from-slate-300 to-slate-500 py-4 bg-clip-text text-center text-4xl font-medium tracking-tight text-transparent md:text-7xl">
        <AnimatedTitle />
      </motion.h1>
      <div className="flex flex-row w-full mt-8 justify-around items-center">
        <Button
          onClick={() => {
            router.push(dailyURL);
          }}
          borderRadius="1.75rem"
          className="bg-slate-900  text-white border-slate-800">
          Get Daily Menus
        </Button>

        <Button
          onClick={() => {
            router.push(weeklyURL);
          }}
          borderRadius="1.75rem"
          className="bg-slate-900 text-white border-slate-800">
          Get Weekly Menus
        </Button>
      </div>
    </LampContainer>
  );
}
