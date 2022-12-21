import React from "react";
interface SquareProps {
  color?: string;
}
const Square = ({ color }: SquareProps) => {
  return (
    <div
      className={`h-6 w-6 border border-solid border-[#313131] -mt-px -ml-px`}
      style={{ backgroundColor: color }}
    ></div>
  );
};

export default Square;
