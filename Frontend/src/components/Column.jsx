import React from "react";
import TaskCard from "./TaskCard";

const Column = ({
    title,
    tasks,
    onDrop,
    onDragOver,
    className,
    onDragStart,
    onDragEnd,
    onBack,
    onForward,
    onEdit,
    onDelete,
}) => {
    return (
        <div
            className={`rounded-xl shadow-md p-4 min-h-[350px] flex flex-col ${className}`}
            onDrop={onDrop}
            onDragOver={onDragOver}
        >
            <h3 className="text-xl font-semibold text-gray-700 mb-4 text-center">
                {title}
            </h3>

            <div className="flex flex-col gap-4">
                {tasks.map((task) => (
                    <TaskCard
                        key={task._id}
                        task={task}
                        onDragStart={onDragStart}
                        onDragEnd={onDragEnd}
                        onBack={onBack}
                        onForward={onForward}
                        onEdit={onEdit}
                        onDelete={onDelete}
                    />
                ))}
            </div>
        </div>
    );
};

export default Column;
