import React from 'react';

interface ChipProps {
  label: string;
  color: string;
  children?: React.ReactNode;
}

function Chip({ label, color, children}: ChipProps) {
  return (
    <span
      className={`inline-block px-3 py-1 rounded-full text-sm font-semibold mr-2 cursor-pointer text-white ${color}`}
    >
      {children || label}
    </span>
  );
}

export default Chip;
