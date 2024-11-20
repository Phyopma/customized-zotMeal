import React, { Suspense } from "react";

import NavMenu from "../components/navMenu";

export default async function DailyLayout({ children }) {
  return (
    <div className="max-w-full h-screen overflow-x-hidden overflow-y-auto">
      <Suspense>
        <NavMenu />
      </Suspense>

      {children}
    </div>
  );
}
