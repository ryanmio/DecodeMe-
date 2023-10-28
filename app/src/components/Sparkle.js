import { animated, useSpring, config } from '@react-spring/web';
import { useEffect, useState } from 'react';

export default function Spark() {
  const [shouldAnimate, setShouldAnimate] = useState(false);

  const props = useSpring({
    opacity: shouldAnimate ? 0 : 1,
    transform: shouldAnimate ? 'translate3d(0px, -50px, 0)' : 'translate3d(0px, 0px, 0)',
    from: { opacity: 1, transform: 'translate3d(0px, 0px, 0)' },
    config: config.stiff,
    onRest: () => setShouldAnimate(false),
  });

  useEffect(() => {
    setShouldAnimate(true);
  }, []);

  return <animated.div style={props}>✨</animated.div>;
}
