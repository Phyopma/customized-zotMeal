import { useState, useEffect } from "react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Terminal, Share, Plus } from "lucide-react";

export default function InstallPrompt() {
  const [isIOS, setIsIOS] = useState(false);
  const [isStandalone, setIsStandalone] = useState(false);

  useEffect(() => {
    setIsIOS(/iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream);

    setIsStandalone(window.matchMedia("(display-mode: standalone)").matches);
  }, []);

  if (isStandalone) {
    return null; // Don't show install button if already installed
  }

  return (
    <Alert className="bg-primary text-white border-none items-center rounded-sm shadow-2xl m-1">
      <AlertTitle className="tracking-wider flex flex-row items-center gap-4 text-base leading-8 font-semibold">
        <Terminal className="h-4 w-4 stroke-white" />
        <span>Install ZotDine App</span>
      </AlertTitle>
      <AlertDescription className="font-mono leading-5 items-start gap-4 flex flex-col">
        <button className="pt-4 flex flex-col gap-4">
          {!isIOS && "Add to Home Screen."}
          <span>Install our app for a better experience</span>
        </button>
        {isIOS && (
          <div className="flex items-center space-x-2">
            <span>Tap share</span>
            <Share className="h-4 w-4" />
            <span>then "Add to Home Screen"</span>
            <Plus className="h-4 w-4" />
          </div>
        )}
      </AlertDescription>
    </Alert>
  );
}
