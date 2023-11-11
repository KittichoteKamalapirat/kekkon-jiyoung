import { cn } from "../../../lib/utils";

interface Props {
  children: React.ReactNode;
  className?: string;
}

const Tabs = ({ children, className }: Props) => {
  const style =
    "flex border-solid border-primary border-2 rounded-l-md rounded-r-md";

  return <div className={cn(style, className)}>{children}</div>;
};

export default Tabs;
