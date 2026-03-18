import { useState } from "react";
import { useSelector } from "react-redux";
import ProjectModal from "./ProjectModal";

export default function Welcome() {
  const isDark = useSelector((state) => state.theme.isDark);
  const [view, setView] = useState("BoardView");
  const [showModal, setShowModal] = useState(false);

  const [columns, setColumns] = useState({
    todo: {
      name: "To Do",
      items: [
        { id: "1", content: "market research" },
        { id: "2", content: "market" },
        { id: "3", content: "new market" },
      ],
    },
    isProgress: {
      name: "In Progress",
      items: [{ id: "4", content: "new tasks" }],
    },
    done: {
      name: "Done",
      items: [{ id: "5", content: "completed task" }],
    },
  });
  const [draggedItem, setDraggedItem] = useState(null);

  const handleDragStart = (columnId, item) => {
    setDraggedItem({ columnId, item });
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e, columnId) => {
    e.preventDefault();
    if (!draggedItem) return;
    const { columnId: sourceColumnId, item } = draggedItem;
    if (sourceColumnId === columnId) return;
    const updatedColumns = { ...columns };
    updatedColumns[sourceColumnId].items = updatedColumns[
      sourceColumnId
    ].items.filter((i) => i.id !== item.id);
    updatedColumns[columnId].items.push(item);
    setColumns(updatedColumns);
    setDraggedItem(null);
  };

  const columnStyles = {
    todo: {
      header: "bg-gradient-to-r from-blue-600 to-blue-400",
      border: "border-blue-400",
    },
    isProgress: {
      header: "bg-gradient-to-r from-yellow-600 to-yellow-400",
      border: "border-yellow-400",
    },
    done: {
      header: "bg-gradient-to-r from-green-600 to-green-400",
      border: "border-green-400",
    },
  };

  return (
    <>
      <div className={isDark ? "dark" : ""}>
        <div className="flex flex-col sm:flex-row justify-between items-center sm:items-center gap-3 px-4 py-3 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 shadow-sm text-sm">
          <input
            type="text"
            placeholder="Search tasks..."
            className="px-3 py-2 w-full sm:flex-1 md:w-80 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-white placeholder-gray-400"
          />

          <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
            <button
              onClick={() => setShowModal(true)}
              className="px-3 py-2 rounded-md border border-gray-300 dark:border-gray-600 cursor-pointer"
            >
              Add Project
            </button>

            <select
              value={view}
              onChange={(e) => setView(e.target.value)}
              className="px-3 py-2 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-white text-sm cursor-pointer"
            >
              <option value="BoardView">Board View</option>
              <option value="ListView">List View</option>
            </select>
          </div>
        </div>

        <div className="p-6 w-full min-h-screen bg-white dark:bg-gray-900">
          {/*for board */}
          {view === "BoardView" && (
            <div className="flex flex-col md:flex-row gap-6">
              {Object.keys(columns).map((columnId) => (
                <div
                  key={columnId}
                  className={`flex-shrink:0 w-full md:w-80 bg-white border-2 rounded-lg border-t-4 dark:bg-gray-900 ${columnStyles[columnId].border}`}
                  onDragOver={handleDragOver}
                  onDrop={(e) => handleDrop(e, columnId)}
                >
                  <div
                    className={`p-4 text-white font-bold text-xl rounded-t-md ${columnStyles[columnId].header}`}
                  >
                    {columns[columnId].name}
                  </div>

                  <div className="p-3 min-h-64">
                    {columns[columnId].items.length === 0 ? (
                      <div className="text-center py-10 text-zinc-500 italic text-sm">
                        Drop Task Here
                      </div>
                    ) : (
                      columns[columnId].items.map((item) => (
                        <div
                          key={item.id}
                          className="p-4 mb-3 bg-gray-200 text-black dark:bg-gray-100 rounded-lg border border-gray-300 cursor-move flex items-center justify-between active:opacity-100 opacity-100"
                          draggable
                          onDragStart={() => handleDragStart(columnId, item)}
                        >
                          <span>{item.content}</span>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
          {/*list view */}

          {view === "ListView" && (
            <div className="flex flex-col gap-6">
              {Object.keys(columns).map((columnId) => (
                <div
                  key={columnId}
                  className={`w-full bg-white border-2 rounded-lg border-t-4 dark:bg-gray-900 ${columnStyles[columnId].border}`}
                  onDragOver={handleDragOver}
                  onDrop={(e) => handleDrop(e, columnId)}
                >
                  <div
                    className={`p-4 text-white font-bold text-xl rounded-t-md ${columnStyles[columnId].header}`}
                  >
                    {columns[columnId].name}
                  </div>

                  <div className="p-3 min-h-64">
                    {columns[columnId].items.length === 0 ? (
                      <div className="text-center py-10 text-zinc-500 italic text-sm">
                        Drop Task Here
                      </div>
                    ) : (
                      columns[columnId].items.map((item) => (
                        <div
                          key={item.id}
                          className="p-4 mb-3 bg-gray-200 text-black dark:bg-gray-100 rounded-lg border border-gray-300 cursor-move flex items-center justify-between active:opacity-100 opacity-100"
                          draggable
                          onDragStart={() => handleDragStart(columnId, item)}
                        >
                          <span>{item.content}</span>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      {showModal && <ProjectModal onClose={() => setShowModal(false)} />}
    </>
  );
}
