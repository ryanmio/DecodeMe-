import { animated, useSpring } from '@react-spring/web';
import { useEffect, useState } from 'react';

export default function Spark() {
  const [shouldAnimate, setShouldAnimate] = useState(false);

  const props = useSpring({
    from: { opacity: 1, transform: 'translate3d(0px, 0px, 0)' },
    to: { opacity: 0, transform: 'translate3d(0px, -50px, 0)' },
    reset: shouldAnimate,
    onRest: () => setShouldAnimate(false),
  });

  useEffect(() => {
    setShouldAnimate(true);
  }, []);

  return <animated.div style={props}>✨</animated.div>;
}