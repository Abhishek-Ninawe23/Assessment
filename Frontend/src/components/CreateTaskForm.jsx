import React, { useState } from "react";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import { validateTaskInput } from "../utils/validators";
import { useDispatch, useSelector } from "react-redux";

import { createTask } from "../store/taskSlice";


const CreateTaskForm = () => {

    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);


    // Create Task Fields
    const [name, setName] = useState("");
    const [priority, setPriority] = useState("low");
    const [deadline, setDeadline] = useState("");


    // Create Task
    const handleCreate = async (e) => {
        e.preventDefault();
        const err = validateTaskInput({ name, priority });
        if (err) return alert(err);

        setLoading(true);
        const res = await dispatch(createTask({ name, priority, deadline: deadline || null }));

        if (res.meta.requestStatus === "fulfilled") {
            setName("");
            setPriority("low");
            setDeadline("");
        }
        setLoading(false);
    };

    return (
        <form
            onSubmit={handleCreate}
            className="bg-white shadow-lg rounded-xl p-6 grid grid-cols-1 md:grid-cols-4 gap-6 items-end mb-10"
        >

            {/* Task Name */}
            <div className="flex flex-col w-full">
                <label className="font-semibold text-gray-700 mb-1">Task Name</label>
                <input
                    className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                    placeholder="Enter task name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />
            </div>

            {/* Priority */}
            <div className="flex flex-col w-full">
                <label className="font-semibold text-gray-700 mb-1">Priority</label>
                <select
                    className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                    value={priority}
                    onChange={(e) => setPriority(e.target.value)}
                >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                </select>
            </div>

            {/* Deadline */}
            <div className="flex flex-col w-full">
                <label className="font-semibold text-gray-700 mb-1">Deadline</label>
                <input
                    type="date"
                    className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                    value={deadline}
                    onChange={(e) => setDeadline(e.target.value)}
                />
            </div>

            {/* Create Button */}
            <div className="flex justify-start md:justify-end">
                <Button
                    variant="contained"
                    type="submit"
                    startIcon={<AddIcon />}
                    disabled={loading}
                    sx={{
                        height: 48,
                        paddingInline: "1.5rem",
                        fontWeight: "bold",
                        textTransform: "none",
                        borderRadius: "0.6rem",
                    }}
                >
                    {loading ? "Creating..." : "Create Task"}
                </Button>
            </div>

        </form>
    );
};

export default CreateTaskForm;
