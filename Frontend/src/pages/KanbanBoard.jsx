import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTasks, createTask, updateTask, deleteTask } from "../store/taskSlice";
import Column from "../components/Column";
import EditTaskDialog from "../components/EditTaskDialog";
import TrashBin from "../components/TrashBin";
import CreateTaskForm from "../components/CreateTaskForm";
import Filters from "../components/Filters";
import Pagination from "../components/Pagination";
import { validateTaskInput } from "../utils/validators";

const StageLabels = { 0: "Backlog", 1: "To Do", 2: "Ongoing", 3: "Done" };
const stageColors = { 0: "bg-red-100", 1: "bg-blue-100", 2: "bg-yellow-100", 3: "bg-green-100" };
const KanbanBoard = () => {

    const dispatch = useDispatch();
    const { list: tasks, pages: totalPages } = useSelector((state) => state.tasks);


    // Filters & Pagination
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(5);
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
        setLimit(5);
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


    // ---- MOVE TASK BACK/FORWARD ----
    const moveTask = async (task, increment) => {
        const newStage = task.stage + increment;
        if (newStage < 0 || newStage > 3) return;

        await dispatch(updateTask({ id: task._id, data: { stage: newStage } }));
    };


    // ---- DELETE TASK ----
    const handleDelete = async (id) => {
        if (!confirm("Delete this task?")) return;
        await dispatch(deleteTask(id));
        setDragging(false);
    };


    return (
        <div className="px-6 py-8 bg-gray-100 min-h-screen">

            <h2 className="text-3xl font-bold text-gray-800 mb-6">Kanban Board</h2>

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

            {/* Kanban Columns */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[0, 1, 2, 3].map((stage) => (
                    <Column
                        key={stage}
                        title={StageLabels[stage]}
                        tasks={byStage[stage]}
                        className={stageColors[stage]}


                        onDrop={(e) => onDropToStage(e, stage)}
                        onDragOver={allowDrop}

                        // DRAG
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
                onSave={(data) =>
                    dispatch(updateTask({ id: editTask._id, data }))
                }
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
