import { createPortal } from "react-dom";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { projectAction } from "../store/project";

export default function ProjectModal({ onClose }) {
  const isDark = useSelector((state) => state.theme.isDark);
  const dispatch = useDispatch();
  const [projectName, setProjectName] = useState("");

  const submitProject = (e) => {
    e.preventDefault();

    if (!projectName.trim()) return;

    dispatch(projectAction.addProject(projectName));
    console.log("project add", projectName);
    setProjectName("");
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
            className={`w-full max-w-md p-6 rounded-xl shadow-lg relative ${
              isDark ? "bg-gray-800 text-white" : "bg-white text-black"
            }`}
          >
            <button
              onClick={onClose}
              className="absolute top-3 right-3 text-gray-400 hover:text-red-500 text-xl"
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

            <div className="w-full max-w-md bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg ">
              <div className="mb-2 text-gray-500 dark:text-gray-300 flex justify-center">
                <h2>Enter Your Project</h2>
              </div>

              <form
                className="flex flex-col gap-2 w-full max-w-md"
                onSubmit={submitProject}
              >
                <div>
                  <label className="block text-sm/6 font-medium text-gray-500 dark:text-gray-300">
                    Project Name
                  </label>
                  <div className="mt-2">
                    <input
                      type="text"
                      value={projectName}
                      onChange={(e) => setProjectName(e.target.value)}
                      className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-black border border-gray-400 dark:text-gray-300"
                    />
                  </div>
                </div>

                <div className="mt-4">
                  <button
                    type="submit"
                    className="flex w-full justify-center rounded-md bg-indigo-500 px-3 py-1.5 text-sm/6 font-semibold text-white hover:bg-indigo-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
                  >
                    Add Project
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>,

    document.getElementById("root"),
  );
}
