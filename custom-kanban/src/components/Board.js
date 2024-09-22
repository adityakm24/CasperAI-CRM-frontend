import React, { useState } from "react";
import { Column } from "./Column";
import { BurnBarrel } from "./BurnBarrel";
import { DEFAULT_CARDS } from "../utils/kanbanUtils";
import { AddColumn } from "./AddColumn";

export const Board = () => {
  const [cards, setCards] = useState(DEFAULT_CARDS);
  const [columns, setColumns] = useState([
    { title: "Backlog", column: "backlog", headingColor: "text-neutral-500" },
    { title: "TODO", column: "todo", headingColor: "text-yellow-200" },
    { title: "In Progress", column: "doing", headingColor: "text-blue-200" },
    { title: "Complete", column: "done", headingColor: "text-emerald-200" },
  ]);

  // Delete a column
  const deleteColumn = (columnId) => {
    setColumns(columns.filter(col => col.column !== columnId));
    setCards(cards.filter(card => card.column !== columnId)); // Remove cards from the deleted column
  };

  // Rename a column
  const renameColumn = (columnId, newTitle) => {
    setColumns(columns.map(col => col.column === columnId ? { ...col, title: newTitle } : col));
  };

  const addColumn = (newColumn) => {
    setColumns((prevColumns) => [...prevColumns, newColumn]);
  };

  return (
    <div className="flex h-full w-full gap-3 overflow-scroll p-12">
      {columns.map((col) => (
        <Column
          key={col.column}
          title={col.title}
          column={col.column}
          headingColor={col.headingColor}
          cards={cards}
          setCards={setCards}
          deleteColumn={deleteColumn}
          renameColumn={renameColumn}
        />
      ))}
      <BurnBarrel setCards={setCards} />
      <AddColumn addColumn={addColumn} />
    </div>
  );
};
