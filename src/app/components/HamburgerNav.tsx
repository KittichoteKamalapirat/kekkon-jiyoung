"use client";
import { usePathname } from "next/navigation";

import clsx from "clsx";
import Link from "next-intl/link";

import { useCallback, useRef, useState } from "react";
import { IoMdClose, IoMdMenu } from "react-icons/io";
import { useClickOutside } from "../hooks/useClickOutside";
import { ICON_SIZE } from "../../constants";
import Image from "next/image";
import MyText from "./MyText";

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
          {/* brandname */}
        </h1>

        <div className="relative flex gap-4">
          {/* Shown by default */}
          <button
            onClick={toggleMenu}
            className="lg:hidden p-2 bg-white rounded-full shadow-inner"
          >
            {isExpanded ? (
              <IoMdClose size={ICON_SIZE} color="#000" />
            ) : (
              <IoMdMenu size={ICON_SIZE} color="#000" />
            )}
          </button>
          <div className="lg:flex gap-2 hidden">
            <Link href="/" locale="en" className="flex gap-2 hover:opacity-50">
              <Image
                alt="English"
                src="/images/lang/en.svg"
                width={30}
                height={30}
              />
            </Link>
            <Link href="/" locale="ja" className="flex gap-2 hover:opacity-50">
              <Image
                alt="Japanese"
                src="/images/lang/ja.svg"
                width={30}
                height={30}
              />
            </Link>
          </div>

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
            <ul className="mt-4 flex bg-white p-4 flex-col gap-4 rounded-lg  shadowmd bg-lm-bg-light font-medium  shadow">
              <li
                className={clsx(
                  "text-md hover:font-semibold",
                  isActive("/") && "font-bold pointer-events-none"
                )}
              >
                <Link
                  href="/"
                  locale="en"
                  className="flex gap-2 hover:opacity-50"
                  onClick={closeMenu}
                >
                  <Image
                    alt="english"
                    src="/images/lang/en.svg"
                    width={20}
                    height={20}
                  />
                  <MyText className="text-sm">EN</MyText>
                </Link>
              </li>
              <li
                className={clsx(
                  "text-md hover:font-semibold",
                  isActive("/ja") && "font-bold pointer-events-none"
                )}
              >
                <Link
                  href="/"
                  locale="ja"
                  className="flex gap-2 hover:opacity-50"
                  onClick={closeMenu}
                >
                  <Image
                    alt="Japanese"
                    src="/images/lang/ja.svg"
                    width={20}
                    height={20}
                  />
                  <MyText className="text-sm">日本語</MyText>
                </Link>
              </li>
              {/* <li
                className={clsx(
                  "text-md hover:font-semibold",
                  isActive("/es") && "font-bold pointer-events-none"
                )}
              >
                <Link href="/" locale="es" className="flex gap-2">
                  <Image
                    alt="Spanish"
                    src="/images/lang/es.svg"
                    width={20}
                    height={20}
                  />
                  <MyText className="text-sm">ES</MyText>
                </Link>
              </li> */}
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
};
export default HamburgerNav;
