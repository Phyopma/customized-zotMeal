import { CollapsibleColumn } from "./collapsibleCol";
import React from "react";

export default function WeeklyView({ allMenus, location }) {
  return (
    <div>
      {Object.entries(allMenus.menus).map(([date, menuItems]) => (
        <div key={date} className="break-inside-avoid">
          <CollapsibleColumn
            date={date}
            menuItems={menuItems}
            locationId={location}
          />
        </div>
      ))}
    </div>
  );
}
