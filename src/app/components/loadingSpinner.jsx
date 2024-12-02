import React from "react";
import { SyncLoader } from "react-spinners";

export default function LoadingSpinner() {
  return (
    <div className="flex justify-center items-center h-screen">
      <SyncLoader color="#1bc1b4" size={20} margin={7} />
    </div>
  );
}
