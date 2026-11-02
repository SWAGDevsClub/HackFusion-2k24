import { useState } from "react";
import HackfusionSplash from "../components/SplashScreen";
import useAssetPreloader from "../hooks/Useassetpreloader";

/**
 * Shows the splash with a real progress bar until every asset is loaded,
 * then fades out and renders the site.
 *
 * <SplashGate>
 *   <Router>...</Router>
 * </SplashGate>
 */
export default function SplashGate({ children, ...splashProps }) {
  const [finished, setFinished] = useState(false);
  const { progress } = useAssetPreloader();

  return (
    <>
      {/* Keep the children always mounted so they load in parallel/advance */}
      {children}

      {/* Only visually hide the splash instead of unmounting it entirely */}
      {!finished && (
        <HackfusionSplash
          {...splashProps}
          progress={progress}
          onEnd={() => setFinished(true)}
        />
      )}
    </>
  );
}
