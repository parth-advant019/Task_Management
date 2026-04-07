import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ProjectModal from "./ProjectModal";
import { projectAction } from "../store/project";
import EditTaskModal from "./EditTaskModal";

export default function Welcome() {
  const isDark = useSelector((state) => state.theme.isDark);
  const projects = useSelector((state) => state.project.projects);
  const dispatch = useDispatch();

  const [view, setView] = useState("BoardView");
  const [showModal, setShowModal] = useState(false);
  const [showEditModal, setEditModal] = useState(false);
  const [dateError, setDateError] = useState("");

  const [draggedItem, setDraggedItem] = useState(null);
  const [selectedTask, setSelectedTask] = useState(null);
  const [search, setSearch] = useState("");
  const [priorityFilter, setPriorityFilter] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState("all");

  const [fromData, setFromData] = useState("");
  const [toDate, setToDate] = useState("");

  const handleDragStart = (projectId, columnId, item) => {
    setDraggedItem({ projectId, columnId, item });
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e, projectId, columnId) => {
    e.preventDefault();
    if (!draggedItem) return;
    const {
      projectId: sourceProjectId,
      columnId: sourceCol,
      item,
    } = draggedItem;

    //stope same code
    if (sourceCol === columnId && sourceProjectId === projectId) return;

    dispatch(
      projectAction.moveTask({
        projectId,
        sourceCol,
        destCol: columnId,
        taskId: item.id,
      }),
    );
    setDraggedItem(null);
  };

  const columnStyles = {
    todo: {
      header: "bg-gradient-to-r from-blue-600 to-blue-400",
      border: "border-blue-400",
      name: "To Do",
    },
    inprogress: {
      header: "bg-gradient-to-r from-yellow-600 to-yellow-400",
      border: "border-yellow-400",
      name: "In Progress",
    },
    completed: {
      header: "bg-gradient-to-r from-green-600 to-green-400",
      border: "border-green-400",
      name: "Done",
    },
  };

  return (
    <>
      <div className={isDark ? "dark" : ""}>
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-3 px-4 py-3 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 shadow-sm text-sm">
          <input
            type="text"
            placeholder="Search tasks..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="h-10 px-3 w-full lg:w-80 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-white placeholder-gray-400"
          />

          <div className="flex flex-col gap-3 w-full lg:flex-row lg:items-center lg:w-auto">
            <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto">
              <button
                onClick={() => setShowModal(true)}
                className="h-11 px-3  rounded-md border border-gray-300 dark:border-gray-600 cursor-pointer flex items-center justify-center"
              >
                Add Project
              </button>

              <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto">
                <div className="flex items-center gap-2 w-full sm:w-auto">
                  <span className="text-xs text-gray-400 whitespace-nowrap">
                    From
                  </span>
                  <input
                    type="date"
                    value={fromData}
                    min={fromData || undefined}
                    max={toDate || undefined}
                    onChange={(e) => {
                      const value = e.target.value;

                      if (toDate && value > toDate) {
                        setDateError(
                          "From date cannot be greater than To date",
                        );
                        return;
                      }

                      setDateError("");
                      setFromData(value);
                    }}
                    className="h-10 w-full sm:w-auto px-3 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-white"
                  />
                </div>

                <div className="flex items-center gap-2 w-full sm:w-auto">
                  <span className="text-xs text-gray-400 whitespace-nowrap">
                    To
                  </span>
                  <input
                    type="date"
                    value={toDate}
                    onChange={(e) => {
                      const value = e.target.value;

                      if (fromData && value < fromData) {
                        setDateError("To date cannot be less than From date");
                        return;
                      }

                      setDateError("");
                      setToDate(value);
                    }}
                    className="h-10 w-full sm:w-auto px-3 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-white"
                  />
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto">
              <select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="h-10 px-3 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-white"
              >
                <option value="all">All Project</option>
                {projects.map((proj) => (
                  <option key={proj.id} value={proj.id}>
                    {proj.title}
                  </option>
                ))}
              </select>

              <select
                value={priorityFilter}
                onChange={(e) => setPriorityFilter(e.target.value)}
                className="h-10 px-3 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-white"
              >
                <option value="all">All Priority</option>
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>

              <select
                value={view}
                onChange={(e) => setView(e.target.value)}
                className="h-10 px-3 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-white"
              >
                <option value="BoardView">Board View</option>
                <option value="ListView">List View</option>
              </select>
            </div>
          </div>
        </div>
        {dateError && (
          <p className="text-red-500 text-xs mt-1 px-1">{dateError}</p>
        )}

        <div className="p-4 md:p-6 w-full max-w-300 mx-auto min-h-screen bg-white dark:bg-gray-900">
          <div className="flex flex-col gap-8">
            {projects
              .filter((project) => {
                const matchProject =
                  categoryFilter === "all"
                    ? true
                    : project.id === categoryFilter;
                return matchProject;
              })
              .map((project) => (
                <div key={project.id}>
                  <h2 className="text-xl font-bold mb-4 text-indigo-500">
                    {project.title}
                    <button
                      onClick={() =>
                        dispatch(projectAction.deleteProject(project.id))
                      }
                      className="text-red-500 cursor-pointer ml-2"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 640 640"
                        className="w-5 h-5"
                        fill="currentColor"
                      >
                        <path d="M232.7 69.9L224 96L128 96C110.3 96 96 110.3 96 128C96 145.7 110.3 160 128 160L512 160C529.7 160 544 145.7 544 128C544 110.3 529.7 96 512 96L416 96L407.3 69.9C402.9 56.8 390.7 48 376.9 48L263.1 48C249.3 48 237.1 56.8 232.7 69.9zM512 208L128 208L149.1 531.1C150.7 556.4 171.7 576 197 576L443 576C468.3 576 489.3 556.4 490.9 531.1L512 208z" />
                      </svg>
                    </button>
                  </h2>

                  <div
                    className={`${view === "BoardView" ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4" : "flex flex-col gap-6"}`}
                  >
                    {Object.keys(columnStyles).map((columnId) => (
                      <div
                        key={columnId}
                        className={`${view === "BoardView" ? "w-full bg-white border-2 rounded-lg border-t-4 dark:bg-gray-900" : "w-full bg-white border-2 rounded-lg border-t-4 dark:bg-gray-900"} ${columnStyles[columnId].border}`}
                        onDragOver={handleDragOver}
                        onDrop={(e) => handleDrop(e, project.id, columnId)}
                      >
                        <div
                          className={`p-4 text-white font-bold text-xl rounded-t-md ${columnStyles[columnId].header}`}
                        >
                          {columnStyles[columnId].name}
                        </div>

                        <div className="p-3 min-h-64">
                          {project.tasks[columnId].length === 0 ? (
                            <div className="text-center py-10 text-zinc-500 italic text-sm">
                              Drop Task Here
                            </div>
                          ) : (
                            project.tasks[columnId]
                              .filter((item) => {
                                const matchSearch = item.title
                                  .toLowerCase()
                                  .includes(search.toLowerCase());

                                const matchesPriority =
                                  priorityFilter === "all"
                                    ? true
                                    : item.priority.toLowerCase() ===
                                      priorityFilter;

                                const matchesDate =
                                  (!fromData ||
                                    new Date(item.dueDate) >=
                                      new Date(fromData)) &&
                                  (!toDate ||
                                    new Date(item.dueDate) <= new Date(toDate));

                                return (
                                  matchSearch && matchesPriority && matchesDate
                                );
                              })

                              .map((item) => (
                                <div
                                  key={item.id}
                                  className={`p-4 mb-3 bg-gray-200 text-black dark:bg-gray-100 rounded-lg border border-gray-300 cursor-move active:opacity-100 opacity-100 ${
                                    view === "BoardView"
                                      ? "flex flex-col justify-between"
                                      : "flex items-center justify-between"
                                  }`}
                                  draggable
                                  onDragStart={() =>
                                    handleDragStart(project.id, columnId, item)
                                  }
                                >
                                  <div className="flex justify-between items-center">
                                    <span className="font0-medium">
                                      {item.title}
                                    </span>
                                    <div className="ml-3 flex gap-2">
                                      {columnId !== "completed" && (
                                        <button
                                          onClick={() =>
                                            dispatch(
                                              projectAction.moveTask({
                                                projectId: project.id,
                                                sourceCol: columnId,
                                                destCol: "completed",
                                                taskId: item.id,
                                              }),
                                            )
                                          }
                                          className="text-green-500 cursor-pointer"
                                        >
                                          <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 640 640"
                                            className="w-5 h-5"
                                            fill="currentColor"
                                          >
                                            <path d="M530.8 134.1C545.1 144.5 548.3 164.5 537.9 178.8L281.9 530.8C276.4 538.4 267.9 543.1 258.5 543.9C249.1 544.7 240 541.2 233.4 534.6L105.4 406.6C92.9 394.1 92.9 373.8 105.4 361.3C117.9 348.8 138.2 348.8 150.7 361.3L252.2 462.8L486.2 141.1C496.6 126.8 516.6 123.6 530.9 134z" />
                                          </svg>
                                        </button>
                                      )}
                                      {columnId === "completed" && (
                                        <button
                                          onClick={() =>
                                            dispatch(
                                              projectAction.moveTask({
                                                projectId: project.id,
                                                sourceCol: "completed",
                                                destCol: "todo",
                                                taskId: item.id,
                                              }),
                                            )
                                          }
                                          className="text-yellow-500 cursor-pointer"
                                        >
                                          <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 640 640"
                                            className="w-5 h-5"
                                            fill="currentColor"
                                          >
                                            <path d="M183.1 137.4C170.6 124.9 150.3 124.9 137.8 137.4C125.3 149.9 125.3 170.2 137.8 182.7L275.2 320L137.9 457.4C125.4 469.9 125.4 490.2 137.9 502.7C150.4 515.2 170.7 515.2 183.2 502.7L320.5 365.3L457.9 502.6C470.4 515.1 490.7 515.1 503.2 502.6C515.7 490.1 515.7 469.8 503.2 457.3L365.8 320L503.1 182.6C515.6 170.1 515.6 149.8 503.1 137.3C490.6 124.8 470.3 124.8 457.8 137.3L320.5 274.7L183.1 137.4z" />
                                          </svg>
                                        </button>
                                      )}
                                      <button
                                        onClick={() =>
                                          dispatch(
                                            projectAction.deleteTask({
                                              projectId: project.id,
                                              columnId,
                                              taskId: item.id,
                                            }),
                                          )
                                        }
                                        className="text-red-500 cursor-pointer"
                                      >
                                        <svg
                                          xmlns="http://www.w3.org/2000/svg"
                                          viewBox="0 0 640 640"
                                          className="w-5 h-5"
                                          fill="currentColor"
                                        >
                                          <path d="M232.7 69.9L224 96L128 96C110.3 96 96 110.3 96 128C96 145.7 110.3 160 128 160L512 160C529.7 160 544 145.7 544 128C544 110.3 529.7 96 512 96L416 96L407.3 69.9C402.9 56.8 390.7 48 376.9 48L263.1 48C249.3 48 237.1 56.8 232.7 69.9zM512 208L128 208L149.1 531.1C150.7 556.4 171.7 576 197 576L443 576C468.3 576 489.3 556.4 490.9 531.1L512 208z" />
                                        </svg>
                                      </button>
                                      {columnId !== "completed" && (
                                        <button
                                          onClick={() => {
                                            setSelectedTask({
                                              projectId: project.id,
                                              columnId,
                                              task: item,
                                            });
                                            setEditModal(true);
                                          }}
                                          className="text-blue-500 cursor-pointer"
                                        >
                                          <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 640 640"
                                            className="w-5 h-5"
                                            fill="currentColor"
                                          >
                                            <path d="M100.4 417.2C104.5 402.6 112.2 389.3 123 378.5L304.2 197.3L338.1 163.4C354.7 180 389.4 214.7 442.1 267.4L476 301.3L442.1 335.2L260.9 516.4C250.2 527.1 236.8 534.9 222.2 539L94.4 574.6C86.1 576.9 77.1 574.6 71 568.4C64.9 562.2 62.6 553.3 64.9 545L100.4 417.2zM156 413.5C151.6 418.2 148.4 423.9 146.7 430.1L122.6 517L209.5 492.9C215.9 491.1 221.7 487.8 226.5 483.2L155.9 413.5zM510 267.4C493.4 250.8 458.7 216.1 406 163.4L372 129.5C398.5 103 413.4 88.1 416.9 84.6C430.4 71 448.8 63.4 468 63.4C487.2 63.4 505.6 71 519.1 84.6L554.8 120.3C568.4 133.9 576 152.3 576 171.4C576 190.5 568.4 209 554.8 222.5C551.3 226 536.4 240.9 509.9 267.4z" />
                                          </svg>
                                        </button>
                                      )}
                                    </div>
                                  </div>

                                  {view === "BoardView" ? (
                                    <span className="text-sm text-gray-600 dark:text-gray-500">
                                      priority:-{item.priority}
                                    </span>
                                  ) : (
                                    <span className="ml-4 text-sm text-gray-600 dark:text-gray-500">
                                      priority:-{item.priority}
                                    </span>
                                  )}
                                </div>
                              ))
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
      {showModal && <ProjectModal onClose={() => setShowModal(false)} />}
      {showEditModal && (
        <EditTaskModal
          onClose={() => setEditModal(false)}
          selectedTask={selectedTask}
        />
      )}
    </>
  );
}
