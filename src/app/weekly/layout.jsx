import React from "react";
import NavMenu from "../components/navMenu";

export default function WeeklyLayout({ children }) {
  return (
    <div className="max-w-full min-h-screen overflow-x-hidden overflow-y-auto">
      <NavMenu />
      {children}
    </div>
  );
}
