import { ReactNode } from "react";
import { cn } from "../../utils/cn";

interface Props {
  children: ReactNode;
  className?: string;
}

const MyText = ({ className, children }: Props) => {
  return <p className={cn("text-lm-text", className)}>{children}</p>;
};
export default MyText;
