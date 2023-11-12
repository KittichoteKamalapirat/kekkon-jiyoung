import { useInView } from "react-intersection-observer";
import { cn } from "../../lib/utils";

const commonClassName = "transition-all duration-[2000ms] ease-in-out";
export const useAnimateOnSroll = () => {
  const view = useInView({
    /* Optional options */
    triggerOnce: true,
    threshold: 0,
    // rootMargin: "-100px",
  });

  return {
    ...view,
    animateClassName: cn(
      commonClassName,
      view.inView ? "opacity-100 translate-y-0" : "translate-y-1/4 opacity-0"
    ),
  };
};
