import { createPortal } from "react-dom";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { projectAction } from "../store/project";

export default function EditTaskModal({ onClose, selectedTask }) {
  const isDark = useSelector((state) => state.theme.isDark);
  const dispatch = useDispatch();

  const [form, setForm] = useState({
    title: "",
    description: "",
    priority: "low",
    dueDate: "",
  });

  useEffect(() => {
    if (selectedTask) {
      setForm({
        title: selectedTask.task.title || "",
        description: selectedTask.task.description || "",
        priority: selectedTask.task.priority || "low",
        dueDate: selectedTask.task.dueDate || "",
      });
    }
  }, [selectedTask]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(
      projectAction.updateTask({
        projectId: selectedTask.projectId,
        columnId: selectedTask.columnId,
        taskId: selectedTask.task.id,
        updatedTask: form,
      }),
    );
    onClose();
  };

  return createPortal(
    <>
      <div className={isDark ? "dark" : ""}>
        <div
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
          onClick={onClose}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className={`w-full max-w-md mx-4 p-6 rounded-xl shadow-lg relative ${
              isDark ? "bg-gray-800 text-white" : "bg-white text-black"
            }`}
          >
            <button
              onClick={onClose}
              className="absolute top-3 right-3 text-gray-400 hover:text-red-500 text-xl"
            >
              X
            </button>

            <form
              onSubmit={handleSubmit}
              className="flex flex-col gap-2 w-full"
            >
              <div>
                <label className="block text-sm/6 font-medium text-gray-500 dark:text-gray-300">
                  Title
                </label>
                <div className="mt-2">
                  <input
                    name="title"
                    value={form.title}
                    onChange={handleChange}
                    type="text"
                    placeholder="title"
                    className="block w-full rounded-md dark:bg-gray-700 px-3 py-1.5 text-black dark:text-white placeholder-gray-500 dark:placeholder-gray-300 border border-gray-400"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm/6 font-medium text-gray-500 dark:text-gray-300">
                  Description
                </label>
                <div className="mt-2">
                  <textarea
                    name="description"
                    value={form.description}
                    onChange={handleChange}
                    placeholder="description"
                    className="block w-full rounded-md dark:bg-gray-700 px-3 py-1.5 text-black dark:text-white placeholder-gray-500 dark:placeholder-gray-300 border border-gray-400"
                  ></textarea>
                </div>
              </div>

              <div>
                <label className="block text-sm/6 font-medium text-gray-500 dark:text-gray-300">
                  Priority
                </label>

                <div className="mt-2">
                  <select
                    value={form.priority}
                    onChange={handleChange}
                    name="priority"
                    className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-black dark:text-white border border-gray-400 dark:bg-gray-700"
                  >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm/6 font-medium text-gray-500 dark:text-gray-300">
                  Due Date
                </label>

                <div className="mt-2">
                  <input
                    name="dueDate"
                    value={form.dueDate}
                    onChange={handleChange}
                    type="date"
                    placeholder="Due Date"
                    className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-black dark:text-white border border-gray-400 dark:bg-gray-700"
                  />
                </div>
              </div>
              <div className="mt-4">
                <button
                  type="submit"
                  className="flex w-full justify-center rounded-md bg-indigo-500 px-3 py-1.5 text-sm/6 font-semibold text-white hover:bg-indigo-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
                >
                  Update Task
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      ,
    </>,
    document.getElementById("root"),
  );
}
