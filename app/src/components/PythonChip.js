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
        transform: hover ? 'scale(0.9)' : 'scale(0.85)',
        transition: 'transform 0.3s ease-in-out',
        opacity: hover ? '1' : '0.8',
      }}
    >
      Python
    </Chip>
  );
}

export default PythonChip;