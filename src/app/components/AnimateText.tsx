import clsx from "clsx";
import { useTranslations } from "next-intl";
import { useState, useEffect } from "react";
import { isJapaneseLocale, isMobile } from "../../lib/utils";
import { useCurrentBreakpoint } from "../hooks/useCurrentBreakpoint";
import { usePathname } from "next/navigation";

interface Props {
  heroTextColor: string;
}
const AnimateText = ({ heroTextColor }: Props) => {
  const [animate, setAnimate] = useState(false);
  const path = usePathname();
  const isJapanese = isJapaneseLocale(path);
  const breakpoint = useCurrentBreakpoint();

  const common = useTranslations("common");

  useEffect(() => {
    // Apply animation class after a short delay to trigger animation after page load
    const timeout = setTimeout(() => {
      setAnimate(true);
    }, 500); // Adjust the delay as needed

    return () => clearTimeout(timeout);
  }, []);

  return (
    <div>
      <div
        className={clsx(
          "flex gap-2  px-4 py-2 font-bold text-center justify-center items-center flex-row-reverse"
        )}
      >
        <h1
          className={clsx(
            "transition-all duration-[2000ms] font-[Tangerine] text-4xl lg:text-5xl xl:text-7xl",

            animate
              ? "translate-x-[0] opacity-100"
              : "-translate-x-[300px] opacity-0",
            heroTextColor
          )}
          style={{
            writingMode: isJapanese
              ? isMobile
                ? "vertical-rl"
                : "horizontal-tb"
              : "horizontal-tb",
            textOrientation: "upright",
          }}
        >
          {common("brideName")}
        </h1>
        <h1
          className={clsx(
            "transition-all duration-[2000ms] font-[Tangerine] text-4xl lg:text-5xl xl:text-7xl",
            animate ? "opacity-100" : "opacity-0",
            heroTextColor
          )}
        >
          &
        </h1>
        <h1
          className={clsx(
            "transition-all duration-[2000ms] font-[Tangerine] text-4xl lg:text-5xl xl:text-7xl",

            animate
              ? "translate-x-[0] opacity-100"
              : "translate-x-[300px] opacity-0",
            heroTextColor
          )}
          style={{
            writingMode: isJapanese
              ? isMobile
                ? "vertical-rl"
                : "horizontal-tb"
              : "horizontal-tb",
            textOrientation: "upright",
          }}
        >
          {common("groomName")}
        </h1>
        {/* date for japanese + mobile */}
        {isJapanese && isMobile && (
          <p
            className={clsx(
              "transition-all duration-[2000ms] text-[16px] text-center font-[Montserrat] font-normal",
              animate ? "opacity-100" : "opacity-0",
              "md:hidden",
              heroTextColor
            )}
            style={{
              writingMode: "vertical-rl",
              textOrientation: "upright",
            }}
          >
            {common("date")}
          </p>
        )}
      </div>
      {/* date for not japanese, or japanese + desktop */}

      {(!isJapanese || !isMobile) && (
        <p
          className={clsx(
            "transition-all duration-[2000ms] text-xl text-center font-[Montserrat]",
            animate ? "opacity-100" : "opacity-0",

            // "hidden md:block",
            heroTextColor
          )}
        >
          {common("date")}
        </p>
      )}
    </div>
  );
};

export default AnimateText;
