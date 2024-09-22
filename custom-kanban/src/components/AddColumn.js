import React, { useState } from "react";
import { FiPlus } from "react-icons/fi";
import { motion } from "framer-motion";

export const AddColumn = ({ addColumn }) => {
  const [title, setTitle] = useState("");
  const [headingColor, setHeadingColor] = useState("text-neutral-500");
  const [adding, setAdding] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title.trim()) return;

    const newColumn = {
      title,
      column: title.toLowerCase().replace(" ", "-"),
      headingColor,
    };

    addColumn(newColumn);
    setAdding(false);
    setTitle("");
  };

  return (
    <>
      {adding ? (
        <motion.form layout onSubmit={handleSubmit} className="w-56 shrink-0">
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            autoFocus
            placeholder="New Column Title..."
            className="w-full rounded border bg-neutral-700 p-2 text-sm text-neutral-50"
          />
          <select
            onChange={(e) => setHeadingColor(e.target.value)}
            className="w-full mt-2 rounded border bg-neutral-700 p-2 text-sm text-neutral-50"
          >
            <option value="text-neutral-500">Neutral</option>
            <option value="text-yellow-200">Yellow</option>
            <option value="text-blue-200">Blue</option>
            <option value="text-emerald-200">Emerald</option>
          </select>
          <div className="mt-1.5 flex items-center justify-end gap-1.5">
            <button
              onClick={() => setAdding(false)}
              className="px-3 py-1.5 text-xs text-neutral-400 transition-colors hover:text-neutral-50"
            >
              Close
            </button>
            <button
              type="submit"
              className="flex items-center gap-1.5 rounded bg-neutral-50 px-3 py-1.5 text-xs text-neutral-950 transition-colors hover:bg-neutral-300"
            >
              <span>Add Column</span>
              <FiPlus />
            </button>
          </div>
        </motion.form>
      ) : (
        <motion.button
          layout
          onClick={() => setAdding(true)}
          className="flex w-full items-center gap-1.5 px-3 py-1.5 text-xs text-neutral-400 transition-colors hover:text-neutral-50"
        >
          <span>Add column</span>
          <FiPlus />
        </motion.button>
      )}
    </>
  );
};
