import type { HTMLAttributes } from "react";

import clsx from "clsx";
import { IoMdAlert } from "react-icons/io";
import MyText from "../MyText";

export interface HelpTextProps extends HTMLAttributes<HTMLDivElement> {
  message?: string;
  "data-testid"?: string;
  className?: string;
  showAlertIcon?: boolean;
}
const HelpText = ({
  message = "Unknown error",
  "data-testid": testId,
  className,
  showAlertIcon = true,
}: HelpTextProps) => (
  <div
    data-testid={testId}
    className={clsx(
      "leading-xs mt-1 inline-flex items-center text-sm text-opacity-black-68",
      className
    )}
  >
    {showAlertIcon && <IoMdAlert />}
    <MyText>{message}</MyText>
  </div>
);

export default HelpText;
