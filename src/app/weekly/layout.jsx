import React from "react";
import NavMenu from "../components/navMenu";

export default function WeeklyLayout({ children }) {
  return (
    <div>
      <NavMenu />
      {children}
    </div>
  );
}
