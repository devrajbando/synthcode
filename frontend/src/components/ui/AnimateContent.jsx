import { useRef, useEffect, useState } from "react";
import { useSpring, animated } from "@react-spring/web";

const AnimatedContent = ({
  children,
  distance = 70,
  direction = "vertical",
  reverse = false,
  config = { tension: 10, friction: 25 },
  initialOpacity = 0,
  animateOpacity = true,
  scale = 1.5,
  threshold = 0.1,
}) => {
  const [inView, setInView] = useState(false);
  const ref = useRef();

  useEffect(() => {
    if (!ref.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setInView(entry.isIntersecting); // Set `inView` based on intersection status
      },
      { threshold }
    );

    observer.observe(ref.current);

    return () => observer.disconnect();
  }, [threshold]);

  const directions = {
    vertical: "Y",
    horizontal: "X",
  };

  const springProps = useSpring({
    transform: inView
      ? `translate${directions[direction]}(0px) scale(1)`
      : `translate${directions[direction]}(${reverse ? `-${distance}px` : `${distance}px`}) scale(${scale})`,
    opacity: animateOpacity ? (inView ? 1 : initialOpacity) : 1,
    config,
  });

  return (
    <animated.div ref={ref} style={springProps}>
      {children}
    </animated.div>
  );
};

export default AnimatedContent;
