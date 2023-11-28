import { AiOutlineLoading3Quarters } from "react-icons/ai";
import clsx from "clsx";
import { ICON_SIZE } from "../../../constants";

type ObjectValues<T> = T[keyof T];

export const LOADER_ICON_SIZE = {
  XS: "XS",
  SMALL: "SMALL",
  MEDIUM: "MEDIUM",
  LARGE: "LARGE",
  XL: "XL",
} as const;

export type LoaderIconSizeValues = ObjectValues<typeof LOADER_ICON_SIZE>;

export interface LoaderIconProps {
  size?: LoaderIconSizeValues;
  className?: string;
}

const LoaderIcon = ({
  size = LOADER_ICON_SIZE.MEDIUM,
  className,
}: LoaderIconProps) => {
  return (
    <AiOutlineLoading3Quarters
      width={ICON_SIZE}
      height={ICON_SIZE}
      className={clsx("animate-spin", className)}
    />
  );
};

export default LoaderIcon;
