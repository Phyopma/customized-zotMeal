import React, { Suspense } from "react";
import NavMenu from "../components/navMenu";

export default async function WeeklyLayout({ children }) {
  return (
    <Suspense>
      <div className="max-w-full min-h-screen overflow-x-hidden overflow-y-auto">
        <NavMenu />
        {children}
      </div>
    </Suspense>
  );
}
