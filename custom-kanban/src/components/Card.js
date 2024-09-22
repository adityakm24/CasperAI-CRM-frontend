import React, { useState } from "react";
import { motion } from "framer-motion";
import { FiEdit, FiTrash } from "react-icons/fi";
import { DropIndicator } from "./DropIndicator";

export const Card = ({ title, id, column, handleDragStart, handleDelete, handleEdit }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [newTitle, setNewTitle] = useState(title);

  const handleSubmit = (e) => {
    e.preventDefault();
    handleEdit(id, newTitle);
    setIsEditing(false);
  };

  return (
    <>
      <DropIndicator beforeId={id} column={column} />
      <motion.div
        layout
        layoutId={id}
        draggable="true"
        onDragStart={(e) => handleDragStart(e, { title, id, column })}
        className="cursor-grab rounded border border-neutral-700 bg-neutral-800 p-3 active:cursor-grabbing"
      >
        {isEditing ? (
          <form onSubmit={handleSubmit} className="flex items-center">
            <input
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              className="bg-neutral-700 text-neutral-50 p-1 rounded"
            />
            <button type="submit" className="text-xs text-green-400 ml-2">Save</button>
          </form>
        ) : (
          <p className="text-sm text-neutral-100">{title}</p>
        )}
        <div className="flex justify-end gap-2 mt-2">
          <FiEdit onClick={() => setIsEditing(true)} className="text-xs cursor-pointer text-yellow-300" />
          <FiTrash onClick={() => handleDelete(id)} className="text-xs cursor-pointer text-red-500" />
        </div>
      </motion.div>
    </>
  );
};
