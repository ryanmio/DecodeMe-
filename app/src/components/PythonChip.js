import React from 'react';
import { Chip, Avatar } from '@nextui-org/react';

const PythonChip = () => {
  const [hover, setHover] = React.useState(false);

  return (
    <Chip
      variant="faded"
      color="primary"
      avatar={
        <Avatar
          src="/images/pythonlogo.webp"
          alt="Python"
        />
      }
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        transform: hover ? 'scale(1)' : 'scale(0.85)',
        transition: 'transform 0.3s ease-in-out',
      }}
    >
      Python
    </Chip>
  );
}

export default PythonChip;