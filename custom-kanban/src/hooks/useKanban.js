import { useCallback } from "react";

export const useKanbanDrag = (cards, setCards, column, setActive) => {
  
  // Memoize getIndicators
  const getIndicators = useCallback(() => {
    return Array.from(document.querySelectorAll(`[data-column="${column}"]`));
  }, [column]);

  // Memoize clearHighlights
  const clearHighlights = useCallback(() => {
    const indicators = getIndicators(); // This will now be stable because getIndicators is memoized
    indicators.forEach((i) => {
      i.style.opacity = "0";
    });
  }, [getIndicators]); // Include getIndicators as a dependency

  // Memoize highlightIndicator
  const highlightIndicator = useCallback(
    (e) => {
      const indicators = getIndicators(); // This will use the memoized getIndicators
      clearHighlights(indicators); // This will use the memoized clearHighlights
      const el = getNearestIndicator(e, indicators);
      el.element.style.opacity = "1";
    },
    [clearHighlights, getIndicators] // Include both clearHighlights and getIndicators as dependencies
  );

  // Function to get the nearest indicator
  const getNearestIndicator = (e, indicators) => {
    const DISTANCE_OFFSET = 50;
    const el = indicators.reduce(
      (closest, child) => {
        const box = child.getBoundingClientRect();
        const offset = e.clientY - (box.top + DISTANCE_OFFSET);
        if (offset < 0 && offset > closest.offset) {
          return { offset: offset, element: child };
        } else {
          return closest;
        }
      },
      {
        offset: Number.NEGATIVE_INFINITY,
        element: indicators[indicators.length - 1],
      }
    );
    return el;
  };

  // Memoized drag start handler
  const handleDragStart = useCallback((e, card) => {
    e.dataTransfer.setData("cardId", card.id);
  }, []);

  // Memoized drag end handler
  const handleDragEnd = useCallback(
    (e) => {
      const cardId = e.dataTransfer.getData("cardId");
      setActive(false);
      clearHighlights(); // This will use the memoized clearHighlights

      const indicators = getIndicators(); // This will use the memoized getIndicators
      const { element } = getNearestIndicator(e, indicators);
      const before = element.dataset.before || "-1";

      if (before !== cardId) {
        let copy = [...cards];
        let cardToTransfer = copy.find((c) => c.id === cardId);
        if (!cardToTransfer) return;
        cardToTransfer = { ...cardToTransfer, column };

        copy = copy.filter((c) => c.id !== cardId);

        const moveToBack = before === "-1";
        if (moveToBack) {
          copy.push(cardToTransfer);
        } else {
          const insertAtIndex = copy.findIndex((el) => el.id === before);
          if (insertAtIndex === undefined) return;
          copy.splice(insertAtIndex, 0, cardToTransfer);
        }
        setCards(copy);
      }
    },
    [cards, column, setActive, setCards, clearHighlights, getIndicators] // Ensure all dependencies are included
  );

  // Memoized drag over handler
  const handleDragOver = useCallback(
    (e) => {
      e.preventDefault();
      highlightIndicator(e); // This will use the memoized highlightIndicator
      setActive(true);
    },
    [highlightIndicator, setActive] // Include highlightIndicator as a dependency
  );

  // Memoized drag leave handler
  const handleDragLeave = useCallback(() => {
    clearHighlights(); // This will use the memoized clearHighlights
    setActive(false);
  }, [clearHighlights, setActive]); // Include clearHighlights and setActive as dependencies

  return {
    handleDragStart,
    handleDragEnd,
    handleDragOver,
    handleDragLeave,
  };
};
