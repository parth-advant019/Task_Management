import { useSelector } from "react-redux";

export default function AddTask() {
  const isDark = useSelector((state) => state.theme.isDark);

  return (
    <div className={isDark ? "dark" : ""}>
      <div className="flex flex-col min-h-screen justify-center items-center bg-zinc-50 dark:bg-gray-900 font-sans px-4 sm:px-6 md:px-8">
        <div className="w-full max-w-md bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg">
          <div className="mb-2 text-gray-500 flex justify-center">
            <h2 className="text-xl font-semibold text-gray-700 dark:text-white">
              Add your Task
            </h2>
          </div>

          <form className="flex flex-col gap-2 w-full">
            <div>
              <label className="block text-sm/6 font-medium text-gray-500 dark:text-gray-300">
                Title
              </label>
              <div className="mt-2">
                <input
                  name="title"
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
                <select className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-black dark:text-white border border-gray-400 dark:bg-gray-700">
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
                  name="due-date"
                  type="date"
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
                <select className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-black dark:text-white border border-gray-400 dark:bg-gray-700">
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>
              </div>
            </div>

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
