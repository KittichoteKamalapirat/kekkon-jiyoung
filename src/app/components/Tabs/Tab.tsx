import Link from "next/link";
import { ReactNode } from "react";

interface Props {
  children: ReactNode;
  href?: string;
  isActive: boolean;

  badgeContent?: string;
  onClick?: () => void;
}

const Tab = ({
  children,
  href,
  isActive,

  onClick,
}: Props) => {
  const tabClass = (() => {
    const commonClass = "py-2 px-6";

    const selectedTabClass = isActive
      ? "text-grey-0 font-bold bg-primary-primary "
      : "text-grey-500 hover:bg-primary-50 hover:rounded-md";

    return `${commonClass} ${selectedTabClass}`;
  })();

  if (onClick)
    return (
      <div className={tabClass} onClick={onClick}>
        {children}
      </div>
    );
  return (
    <Link href={href || ""} onClick={onClick} className={tabClass}>
      <div className="relative">{children}</div>
    </Link>
  );
};

export default Tab;
