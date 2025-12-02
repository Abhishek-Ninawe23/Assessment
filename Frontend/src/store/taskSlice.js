import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../api/axiosInstance.js";

//Get all tasks
export const fetchTasks = createAsyncThunk(
    "tasks/fetchTasks",
    async ({ stage, search, page = 1, limit = 5, sort }, thunkAPI) => {
        try {

            const params = new URLSearchParams();

            if (stage !== undefined) {
                params.append("stage", stage);
            }
            if (search) {
                params.append("search", search);
            }
            if (page) {
                params.append("page", page);
            }
            if (limit) {
                params.append("limit", limit);
            }
            if (sort) {
                params.append("sort", sort);
            }

            const res = await api.get(`/tasks?${params.toString()}`);
            //backend responds with {tasks,total,page,TotalPages}
            return {
                list: res.data.tasks,
                total: res.data.total,
                page: res.data.page,
                pages: res.data.TotalPages,
            };

        } catch (error) {
            return thunkAPI.rejectWithValue(error.response?.data?.message || "Could not fetch tasks")
        }
    }
);

//Create Task
export const createTask = createAsyncThunk(
    "tasks/createTask",
    async (payload, thunkAPI) => {
        try {
            const res = await api.post("/tasks", payload);
            return res.data.task; //return created task
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response?.data?.message || "Creating Task failed");
        }
    }
);

//Update Task
export const updateTask = createAsyncThunk(
    "tasks/updateTask",
    async ({ id, data }, thunkAPI) => {
        try {

            const res = await api.put(`/tasks/${id}`, data);
            return res.data.task; //return updated task

        } catch (error) {
            return thunkAPI.rejectWithValue(error.response?.data?.message || "Updating task failed");
        }
    }
);

//Delete Task
export const deleteTask = createAsyncThunk(
    "tasks/deleteTask",
    async (id, thunkAPI) => {
        try {

            await api.delete(`/tasks/${id}`)
            return id; //return deleted task id

        } catch (error) {
            return thunkAPI.rejectWithValue(error.response?.data?.message || "Deleting task failed");
        }
    }
);


//tasks slice
const taskSlice = createSlice({
    name: "tasks",
    initialState: {
        list: [],
        loading: false,
        error: null,
        total: 0,
        page: 1,
        pages: 1
    },
    reducers: {},

    extraReducers: (builder) => {
        builder
            //GET
            .addCase(fetchTasks.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchTasks.fulfilled, (state, action) => {
                state.loading = false;
                state.list = action.payload.list;
                state.total = action.payload.total;
                state.page = action.payload.page;
                state.pages = action.payload.pages;
            })
            .addCase(fetchTasks.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            //CREATE
            .addCase(createTask.fulfilled, (state, action) => {
                state.list.unshift(action.payload);
            })

            //UPDATE
            .addCase(updateTask.fulfilled, (state, action) => {
                state.list = state.list.map((t) =>
                    t._id === action.payload._id ? action.payload : t
                );
            })

            //DELETE
            .addCase(deleteTask.fulfilled, (state, action) => {
                state.list = state.list.filter((t) =>
                    t._id !== action.payload);
            });
    }
})

export const { setTasks } = taskSlice.actions;
export default taskSlice.reducer;