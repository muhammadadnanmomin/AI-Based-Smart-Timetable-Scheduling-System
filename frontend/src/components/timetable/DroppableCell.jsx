import { useDroppable } from "@dnd-kit/core";

function DroppableCell({ id, children }) {
  const { isOver, setNodeRef } = useDroppable({ id });

  return (
    <div
      ref={setNodeRef}
      className={`min-h-[80px] ${
        isOver ? "bg-blue-100" : ""
      }`}
    >
      {children}
    </div>
  );
}

export default DroppableCell;
