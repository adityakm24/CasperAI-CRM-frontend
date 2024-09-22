import React, { useState } from "react";
import { Card } from "./Card";
import { AddCard } from "./AddCard";
import { DropIndicator } from "./DropIndicator";
import { useKanbanDrag } from "../hooks/useKanban";
import { FiTrash, FiEdit } from "react-icons/fi";

export const Column = ({ title, headingColor, cards, column, setCards, deleteColumn, renameColumn }) => {
  const [active, setActive] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [newTitle, setNewTitle] = useState(title);

  const { handleDragStart, handleDragEnd, handleDragOver, handleDragLeave } = useKanbanDrag(
    cards,
    setCards,
    column,
    setActive
  );

  const filteredCards = cards.filter((c) => c.column === column);

  const handleRenameSubmit = (e) => {
    e.preventDefault();
    renameColumn(column, newTitle);
    setIsEditing(false);
  };

  return (
    <div className="w-56 shrink-0">
      <div className="mb-3 flex items-center justify-between">
        {isEditing ? (
          <form onSubmit={handleRenameSubmit} className="flex items-center gap-1">
            <input
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              className="bg-neutral-700 text-neutral-50 p-1 rounded"
              autoFocus
            />
            <button type="submit" className="text-xs text-green-400 ml-2">Save</button>
          </form>
        ) : (
          <h3 className={`font-medium ${headingColor}`}>{title}</h3>
        )}
        <div className="flex gap-2">
          <FiEdit onClick={() => setIsEditing(true)} className="text-xs cursor-pointer text-yellow-300" />
          <FiTrash onClick={() => deleteColumn(column)} className="text-xs cursor-pointer text-red-500" />
        </div>
      </div>
      <div
        onDrop={handleDragEnd}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        className={`h-full w-full transition-colors ${active ? "bg-neutral-800/50" : "bg-neutral-800/0"}`}
      >
        {filteredCards.map((c) => (
          <Card key={c.id} {...c} handleDragStart={handleDragStart} />
        ))}
        <DropIndicator beforeId={null} column={column} />
        <AddCard column={column} setCards={setCards} />
      </div>
    </div>
  );
};
