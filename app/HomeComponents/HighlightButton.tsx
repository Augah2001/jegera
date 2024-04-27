import { Button } from '@radix-ui/themes';
import React from 'react';

interface ButtonProps {
  onClick: () => void;
}

const HighlightButton: React.FC<ButtonProps> = () => {
  return (
    <Button
      className="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none font-bold rounded-full px-4 py-2 shadow-sm"
     
    >
      $100
    </Button>
  );
};

export default HighlightButton;
