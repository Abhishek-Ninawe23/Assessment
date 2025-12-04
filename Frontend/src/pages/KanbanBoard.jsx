import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTasks, updateTask, deleteTask } from "../store/taskSlice";
import Column from "../components/Column";
import EditTaskDialog from "../components/EditTaskDialog";
import CreateTaskForm from "../components/CreateTaskForm";
import Filters from "../components/Filters";
import Pagination from "../components/Pagination";
import TrashBin from "../components/TrashBin";
import { toast } from "react-toastify";

const StageLabels = { 0: "Backlog", 1: "To Do", 2: "Ongoing", 3: "Done" };
const stageColors = { 0: "bg-red-100", 1: "bg-blue-100", 2: "bg-yellow-100", 3: "bg-green-100" };
const KanbanBoard = () => {

    const dispatch = useDispatch();
    const { list: tasks, pages: totalPages } = useSelector((state) => state.tasks);


    // Filters & Pagination
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(8);
    const [search, setSearch] = useState("");
    const [priorityFilter, setPriorityFilter] = useState("all");

    const [dragging, setDragging] = useState(false);
    const [editTask, setEditTask] = useState(null);

    useEffect(() => {
        dispatch(fetchTasks({ page, limit, search }));
    }, [dispatch, page, limit, search, tasks.length]);

    // Filter by Priority
    let filteredTasks = [...tasks];
    if (priorityFilter !== "all") {
        filteredTasks = filteredTasks.filter(t => t.priority === priorityFilter);
    }

    // Group By Stage
    const byStage = { 0: [], 1: [], 2: [], 3: [] };
    filteredTasks.forEach(t => byStage[t.stage].push(t));



    const resetFilters = () => {
        setPage(1);
        setLimit(8);
        setSearch("");
        setPriorityFilter("all");
    };

    // ---- DRAGGING ----
    const onDragStart = (e, task) => {
        e.dataTransfer.setData("id", task._id);
        setDragging(true);
    };

    const onDragEnd = () => setDragging(false);

    const allowDrop = (e) => e.preventDefault();

    const onDropToStage = async (e, newStage) => {
        e.preventDefault();
        const id = e.dataTransfer.getData("id");
        setDragging(false);

        const task = tasks.find((t) => t._id === id);
        if (!task) return;

        if (task.stage === newStage) return;

        await dispatch(updateTask({ id, data: { stage: newStage } }));
    };

    // ---- DROP TO DELETE ----
    const onDropToDelete = async (taskId) => {
        setDragging(false);

        const confirmDelete = window.confirm("Are you sure you want to delete this task?");
        if (!confirmDelete) return;

        const res = await dispatch(deleteTask(taskId));

        if (res.meta.requestStatus === "fulfilled") {
            toast.success("Task Deleted Successfully");
        } else {
            toast.error("Failed to delete task");
        }
    };


    // ---- MOVE TASK BACK/FORWARD ----
    const moveTask = async (task, accumulator) => {
        const newStage = task.stage + accumulator;
        if (newStage < 0 || newStage > 3) {
            toast.error("Invalid stage");
            return;
        };

        await dispatch(updateTask({ id: task._id, data: { stage: newStage } }));
    };

    // ---- UPDATE TASK ----
    const handleEditSave = async (data) => {
        const res = await dispatch(updateTask({ id: editTask._id, data }));

        if (res.meta.requestStatus === "fulfilled") {
            toast.success("Task updated successfully!");
            setEditTask(null);
        } else {
            toast.error(res.payload || "Task Update failed");
        }
    };


    // ---- DELETE TASK ----
    const handleDelete = async (id) => {
        if (!confirm("Delete this task?")) {
            setDragging(false);
            return;
        };
        await dispatch(deleteTask(id));
        setDragging(false);
    };


    return (
        <div className="px-6 rounded-2xl py-8 bg-gray-100 min-h-fit">

            <div className="flex sm:flex-row flex-col gap-3">
                {/* Create Task Form */}
                <CreateTaskForm />

                {/* Filters */}
                <Filters
                    search={search}
                    limit={limit}
                    priorityFilter={priorityFilter}
                    setSearch={setSearch}
                    setLimit={setLimit}
                    setPriorityFilter={setPriorityFilter}
                    resetFilters={resetFilters}
                />

            </div>

            {/* Kanban Columns */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
                {[0, 1, 2, 3].map((stage) => (
                    <Column
                        key={stage}
                        title={StageLabels[stage]}
                        tasks={byStage[stage]}
                        className={stageColors[stage]}

                        // DROP
                        onDrop={(e) => onDropToStage(e, stage)}

                        // DRAG
                        onDragOver={allowDrop}
                        onDragStart={onDragStart}
                        onDragEnd={onDragEnd}

                        // MOVE
                        onBack={(t) => moveTask(t, -1)}
                        onForward={(t) => moveTask(t, +1)}

                        // EDIT
                        onEdit={(t) => setEditTask(t)}

                        // DELETE
                        onDelete={handleDelete}
                    />
                ))}
            </div>

            {/* Edit Modal */}
            <EditTaskDialog
                open={editTask}
                task={editTask}
                onClose={() => setEditTask(null)}
                onSave={handleEditSave}
            />

            {/* TrashBin for Task Deletion */}
            <TrashBin
                visible={dragging}
                onDropDelete={onDropToDelete}
            />


            {/* Pagination */}
            <Pagination
                page={page}
                totalPages={totalPages}
                setPage={setPage}
            />

        </div>
    );
};

export default KanbanBoard;
