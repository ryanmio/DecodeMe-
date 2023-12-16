import { animated, useSpring } from '@react-spring/web';
import { useEffect, useState } from 'react';

export default function Stars() {
  const [shouldTwinkle, setShouldTwinkle] = useState(false);

  const props = useSpring({
    from: { opacity: 0 },
    to: async (next) => {
      while (1) {
        await next({ opacity: 1 })
        await next({ opacity: 0 })
      }
    },
    reset: shouldTwinkle,
    onRest: () => setShouldTwinkle(false),
  });

  useEffect(() => {
    setShouldTwinkle(true);
  }, []);

  return <animated.div style={props}>✨</animated.div>;
}