"use client";
import React from "react";

import { Calendar } from "@/components/ui/calendar";
import Link from "next/link";
import NavMenu from "../components/navMenu";

export default function DailyLayout({ children }) {
  return (
    <div className="max-w-full h-screen overflow-x-hidden overflow-y-auto">
      <NavMenu />

      {children}
    </div>
  );
}
