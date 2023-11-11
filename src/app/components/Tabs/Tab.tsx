import Link from "next/link";
import { ReactNode } from "react";
import { cn } from "../../../lib/utils";
import clsx from "clsx";

interface Props {
  children: ReactNode;
  href?: string;
  isActive: boolean;
  index: number;
  tabsNum: number;

  badgeContent?: string;
  onClick?: () => void;
  className?: string;
}

const Tab = ({
  children,
  href,
  isActive,
  className,
  index,
  tabsNum,

  onClick,
}: Props) => {
  const tabClass = (() => {
    const commonClass = clsx(
      "py-2 px-6",
      index === 0 && "rounded-l-sm",
      index + 1 === tabsNum && "rounded-r-sm"
    );

    const selectedTabClass = isActive
      ? "text-white font-bold bg-primary"
      : "bg-white text-grey-500 hover:bg-primary-100 cursor-pointer";

    return `${commonClass} ${selectedTabClass}`;
  })();

  if (onClick)
    return (
      <div className={cn(tabClass, className)} onClick={onClick}>
        {children}
      </div>
    );
  return (
    <Link
      href={href || ""}
      onClick={onClick}
      className={cn(tabClass, className)}
    >
      <div className="relative">{children}</div>
    </Link>
  );
};

export default Tab;
