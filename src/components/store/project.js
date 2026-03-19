import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  projects: JSON.parse(localStorage.getItem("project")) || [],
};

const projectSlice = createSlice({
  name: "project",
  initialState,
  reducers: {
    addProject(state, action) {
      const newProject = {
        id: Date.now().toString(),
        title: action.payload,
        tasks: {
          todo: [],
          inprogress: [],
          completed: [],
        },
      };
      state.projects.push(newProject);
      localStorage.setItem("project", JSON.stringify(state.projects));
    },
    AddTask(state, action) {
      const { projectId, task } = action.payload;

      const project = state.projects.find((p) => p.id === projectId);
      if (project) {
        project.tasks.todo.push(task);
        localStorage.setItem("project", JSON.stringify(state.projects));
      }
    },
    moveTask(state, action) {
      const { projectId, sourceCol, destCol, taskId } = action.payload;

      const project = state.projects.find((p) => p.id === projectId);
      if (!project) return;
      const task = project.tasks[sourceCol].find((t) => t.id === taskId);
      if (!task) return;
      //remove from source
      project.tasks[sourceCol] = project.tasks[sourceCol].filter(
        (t) => t.id !== taskId,
      );
      //add to destination
      project.tasks[destCol].push(task);

      localStorage.setItem("project", JSON.stringify(state.projects));
    },
    updateTask(state, action) {
      const { projectId, columnId, taskId, updatedTask } = action.payload;

      const project = state.projects.find((p) => p.id === projectId);
      if (!project) return;

      const taskIndex = project.tasks[columnId].findIndex(
        (t) => t.id === taskId,
      );

      if (taskIndex !== -1) {
        project.tasks[columnId][taskIndex] = {
          ...project.tasks[columnId][taskIndex],
          ...updatedTask,
        };
      }

      localStorage.setItem("project", JSON.stringify(state.projects));
    },
    deleteTask(state, action) {
      const { projectId, columnId, taskId } = action.payload;

      const project = state.projects.find((p) => p.id === projectId);
      if (!project) return;

      project.tasks[columnId] = project.tasks[columnId].filter(
        (task) => task.id !== taskId,
      );

      localStorage.setItem("project", JSON.stringify(state.projects));
    },
  },
});

export const projectAction = projectSlice.actions;

export default projectSlice.reducer;
