import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchTasks, updateTaskStatus } from "../api/firestoreOperations";

export const loadTasks = createAsyncThunk(
  "employee/loadTasks",
  async (userId) => {
    const tasks = await fetchTasks(userId);
    return tasks;
  }
);

export const changeTaskStatus = createAsyncThunk(
  "employee/changeTaskStatus",
  async ({ taskId, status }) => {
    await updateTaskStatus(taskId, status);
    return { taskId, status };
  }
);

const employeeSlice = createSlice({
  name: "employee",
  initialState: {
    tasks: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loadTasks.pending, (state) => {
        state.status = "loading";
      })
      .addCase(loadTasks.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.tasks = action.payload;
      })
      .addCase(loadTasks.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(changeTaskStatus.fulfilled, (state, action) => {
        const { taskId, status } = action.payload;
        const existingTask = state.tasks.find((task) => task.id === taskId);
        if (existingTask) {
          existingTask.status = status;
        }
      });
  },
});

export default employeeSlice.reducer;
