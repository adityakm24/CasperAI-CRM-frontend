import React from "react";
import { Board } from "./components/Board";
import "./styles.css"; // Assuming Tailwind is being used for styling.

export const CustomKanban = () => {
  return (
    <div className="h-screen w-full bg-neutral-900 text-neutral-50">
      <Board />
    </div>
  );
};

export default CustomKanban;
