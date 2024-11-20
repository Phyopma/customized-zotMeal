import React, { Suspense } from "react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Terminal } from "lucide-react";
import { SyncLoader } from "react-spinners";
import DataFetchingComponent from "./components/dataFetchComponent";
export default async function WeeklyPage({ searchParams }) {
  const { location } = await searchParams;
  if (!location) {
    return (
      <Alert className="bg-red-600 text-white border-none rounded-sm shadow-2xl m-1">
        <Terminal className="h-4 w-4 stroke-white" />
        <AlertTitle className="tracking-wider text-base leading-8 font-semibold">
          Missing location!
        </AlertTitle>
        <AlertDescription className="font-mono leading-5">
          Please choose a location to view the menu.
        </AlertDescription>
      </Alert>
    );
  }
  return (
    <Suspense
      fallback={
        <div className="flex justify-center items-center h-screen">
          <SyncLoader color="#1bc1b4" size={20} margin={7} />
        </div>
      }>
      <DataFetchingComponent searchParams={searchParams} />
    </Suspense>
  );
}
