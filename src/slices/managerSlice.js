// src/slices/managerSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  fetchAllTasks,
  addTask,
  fetchEmployees,
  deleteTaskFromDb, // Import the delete task function
} from "../api/firestoreOperations";

export const loadAllTasks = createAsyncThunk(
  "manager/loadAllTasks",
  async () => {
    const tasks = await fetchAllTasks();
    return tasks;
  }
);

export const loadEmployees = createAsyncThunk(
  "manager/loadEmployees",
  async () => {
    const employees = await fetchEmployees();
    return employees;
  }
);

export const createTask = createAsyncThunk(
  "manager/createTask",
  async (task) => {
    const taskId = await addTask(task);
    return { id: taskId, ...task };
  }
);

// Define the deleteTask async thunk
export const deleteTask = createAsyncThunk(
  "manager/deleteTask",
  async (taskId) => {
    await deleteTaskFromDb(taskId);
    return taskId;
  }
);

const managerSlice = createSlice({
  name: "manager",
  initialState: {
    tasks: [],
    employees: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loadAllTasks.pending, (state) => {
        state.status = "loading";
      })
      .addCase(loadAllTasks.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.tasks = action.payload;
      })
      .addCase(loadAllTasks.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(loadEmployees.pending, (state) => {
        state.status = "loading";
      })
      .addCase(loadEmployees.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.employees = action.payload;
      })
      .addCase(loadEmployees.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(createTask.fulfilled, (state, action) => {
        state.tasks.push(action.payload);
      })
      .addCase(deleteTask.fulfilled, (state, action) => {
        state.tasks = state.tasks.filter((task) => task.id !== action.payload);
      });
  },
});

export default managerSlice.reducer;
