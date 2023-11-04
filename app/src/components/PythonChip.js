import React from 'react';
import { Chip, Avatar } from '@nextui-org/react';

const PythonChip = () => {
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
    >
      Python
    </Chip>
  );
}

export default PythonChip;
