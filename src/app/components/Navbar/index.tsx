"use client";
import React from "react";
import Link from "next-intl/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";

interface Props {}

const Navbar = ({}: Props) => {
  const path = usePathname();

  const isActive = (navPath: string) => path === navPath;

  return (
    // bar
    <div
      className={clsx(
        "fixed top-0 left-0 w-screen z-50 px-4 py-4 ",
        path !== "/after" && "bg-white opacity-80"
      )}
    >
      {/* content */}
      <div className="max-w-7xl mx-auto ">
        <ul className="flex gap-8 justify-end">
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
  );
};
export default Navbar;
