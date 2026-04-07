import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { projectAction } from "../store/project";
import { useNavigate } from "react-router-dom";
export default function AddTask() {
  const isDark = useSelector((state) => state.theme.isDark);
  const projects = useSelector((state) => state.project.projects);
  const [error, setError] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: "",
    description: "",
    priority: "low",
    dueDate: "",
    projectId: "",
  });
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const submitTask = (e) => {
    e.preventDefault();

    if (!form.title.trim()) {
      setError("Title is required");
      return;
    }

    if (!form.description.trim()) {
      setError("Description is required");
      return;
    }

    if (!form.dueDate) {
      setError("Due date is required");
      return;
    }

    if (!form.projectId) {
      setError("Please select a project");
      return;
    }

    setError(""); // clear error

    const newTask = {
      id: Date.now().toString(),
      title: form.title,
      description: form.description,
      priority: form.priority,
      dueDate: form.dueDate,
    };
    dispatch(
      projectAction.AddTask({ projectId: form.projectId, task: newTask }),
    );
    console.log("Task added", newTask);
    navigate("/dashboard");
  };

  return (
    <div className={isDark ? "dark" : ""}>
      <div className="flex flex-col min-h-screen justify-center items-center bg-zinc-50 dark:bg-gray-900 font-sans px-4 sm:px-6 md:px-8">
        <div className="w-full max-w-md bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg">
          <div className="mb-2 text-gray-500 flex justify-center">
            <h2 className="text-xl font-semibold text-gray-700 dark:text-white">
              Add your Task
            </h2>
          </div>

          <form onSubmit={submitTask} className="flex flex-col gap-2 w-full">
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
                  name="priority"
                  onChange={handleChange}
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
                  type="date"
                  onChange={handleChange}
                  placeholder="Due Date"
                  className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-black dark:text-white border border-gray-400 dark:bg-gray-700"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm/6 font-medium text-gray-500 dark:text-gray-300">
                Project Category
              </label>

              <div className="mt-2">
                <select
                  name="projectId"
                  onChange={handleChange}
                  className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-black dark:text-white border border-gray-400 dark:bg-gray-700"
                >
                  <option value="">Select Project</option>
                  {projects.map((proj) => (
                    <option key={proj.id} value={proj.id}>
                      {proj.title}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {error && (
              <p className="text-red-500 text-sm text-center">{error}</p>
            )}

            <div className="mt-4">
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-500 px-3 py-1.5 text-sm/6 font-semibold text-white hover:bg-indigo-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
              >
                Add Task
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
