import React, { Suspense } from "react";

import NavMenu from "../components/navMenu";

export default async function DailyLayout({ children }) {
  return (
    <Suspense>
      <div className="max-w-full h-screen overflow-x-hidden overflow-y-auto">
        <NavMenu />
        {children}
      </div>
    </Suspense>
  );
}
