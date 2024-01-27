// Path: components/CustomInstructionsIndicator.js

import { Badge } from '@nextui-org/react';
import React from 'react';

const CustomInstructionsIndicator = () => {
  const playSimilar = localStorage.getItem('playSimilar') === 'true';

  if (!playSimilar) {
    return null; // Don't display the component if not in 'Play Similar' mode
  }

  return (
    <Badge color="primary" variant="dot">
      Custom Instructions Enabled
    </Badge>
  );
};

export default CustomInstructionsIndicator;