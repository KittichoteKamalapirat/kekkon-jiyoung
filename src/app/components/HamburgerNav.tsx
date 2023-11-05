"use client";
import { usePathname } from "next/navigation";

import clsx from "clsx";
import Link from "next-intl/link";

import { useCallback, useRef, useState } from "react";
import { IoMdClose, IoMdMenu } from "react-icons/io";
import { useClickOutside } from "../hooks/useClickOutside";
import { ICON_SIZE } from "../../constants";

const HamburgerNav = () => {
  const path = usePathname();

  const isActive = (navPath: string) => path === navPath;

  const [isExpanded, setIsExpanded] = useState<boolean>(false);

  const mobileMenuRef = useRef<HTMLDivElement>(null);

  const toggleMenu = useCallback(() => {
    setIsExpanded((prev) => !prev);
  }, []);
  const closeMenu = useCallback(() => {
    setIsExpanded(false);
  }, []);

  useClickOutside(mobileMenuRef, closeMenu);

  return (
    <nav
      className={clsx(
        "fixed left-0 right-0 top-0 z-[100]", // make fixed so can set content 100% with top padding
        " border-gray-200 bg-lm-bg "
      )}
    >
      <div className="mx-auto flex flex-wrap items-center justify-between p-4">
        <h1 className="self-center whitespace-nowrap text-md font-semibold lg:text-xl">
          brandname
        </h1>

        <div className="relative flex gap-4">
          {/* Shown by default */}
          <button onClick={toggleMenu}>
            {isExpanded ? (
              <IoMdClose size={ICON_SIZE} color="white" />
            ) : (
              <IoMdMenu size={ICON_SIZE} color="white" />
            )}
          </button>

          {/* menu items */}
          <div
            className={clsx(
              "min-w-[200px]",
              isExpanded ? "absolute right-0 top-12 md:w-40" : "hidden "
            )}
            id="navbar-hamburger"
            ref={mobileMenuRef}
          >
            {/* Below is hidden by default */}
            <ul className="mt-4 flex flex-col gap-[2px] rounded-lg  border-2 border-lm-text bg-lm-bg-light font-medium  shadow ">
              <li
                className={clsx(
                  "text-md hover:font-semibold",
                  isActive("/") && "font-bold pointer-events-none"
                )}
              >
                <Link href="/" locale="en">
                  EN
                </Link>
              </li>
              <li
                className={clsx(
                  "text-md hover:font-semibold",
                  isActive("/ja") && "font-bold pointer-events-none"
                )}
              >
                <Link href="/" locale="ja">
                  日本語
                </Link>
              </li>
              <li
                className={clsx(
                  "text-md hover:font-semibold",
                  isActive("/es") && "font-bold pointer-events-none"
                )}
              >
                <Link href="/" locale="es">
                  ES
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
};
export default HamburgerNav;
