import React from "react";
import IconButton from "@mui/material/IconButton";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

const TaskCard = React.memo(function TaskCard({
    task,
    onDragStart,
    onDragEnd,
    onBack,
    onForward,
    onEdit,
    onDelete,
}) {
    // Priority color badge
    const priorityColor = {
        low: "bg-green-100 text-green-700 border-green-300",
        medium: "bg-yellow-100 text-yellow-700 border-yellow-300",
        high: "bg-red-100 text-red-700 border-red-300",
    };

    return (
        <div
            draggable
            onDragStart={(e) => onDragStart(e, task)}
            onDragEnd={onDragEnd}
            className="bg-white shadow-md rounded-xl p-4 mb-4 cursor-grab active:cursor-grabbing hover:shadow-lg transition-shadow duration-200 border border-gray-200 justify-center text-center"
        >
            {/* Top Section */}
            <div className="flex sm:flex-wrap lg:flex-nowrap justify-center items-center mb-2">
                <div className="font-semibold text-gray-800 text-base break-all w-full">
                    {task.name}
                </div>


                <span
                    className={`px-2 py-1 text-xs border rounded-md font-medium ${priorityColor[task.priority]}`}
                >
                    {task.priority}
                </span>
            </div>

            {/* Deadline */}
            <div className="text-sm font-bold text-gray-600 mb-3">
                {task.deadline ? `Due ${new Date(task.deadline).toLocaleDateString()}` : "No deadline"}
            </div>

            {/* Action Buttons */}
            <div className="flex items-center space-x-1 mt-2">

                {/* Back Button */}
                <IconButton
                    size="small"
                    onClick={() => onBack(task)}
                    disabled={task.stage === 0}
                    title="Move Back"
                    className="p-1"
                >
                    <ArrowBackIosNewIcon fontSize="small" />
                </IconButton>

                {/* Forward Button */}
                <IconButton
                    size="small"
                    onClick={() => onForward(task)}
                    disabled={task.stage === 3}
                    title="Move Forward"
                    className="p-1"
                >
                    <ArrowForwardIosIcon fontSize="small" />
                </IconButton>

                {/* Right-side buttons */}
                <div className="ml-auto flex space-x-1">
                    <IconButton
                        size="small"
                        onClick={() => onEdit(task)}
                        title="Edit Task"
                        className="p-1"
                    >
                        <EditIcon fontSize="small" />
                    </IconButton>

                    <IconButton
                        size="small"
                        onClick={() => onDelete(task._id)}
                        title="Delete Task"
                        className="p-1"
                    >
                        <DeleteIcon fontSize="small" className="text-red-500" />
                    </IconButton>
                </div>
            </div>
        </div >
    );
});

export default TaskCard;
