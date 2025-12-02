import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchTasks } from "../store/taskSlice";
import { Link } from "react-router-dom";

const Dashboard = () => {
    const dispatch = useDispatch();
    const { list } = useSelector((state) => state.tasks);

    // Fetch ALL tasks for dashboard
    useEffect(() => {
        dispatch(fetchTasks({ page: 1, limit: 9999, search: "" }));
    }, [dispatch]);

    const total = list.length;
    const completed = list.filter(t => Number(t.stage) === 3).length;
    const pending = total - completed;

    return (
        <div>
            <h1>Dashboard</h1>

            <div className="flex flex-wrap gap-12 text-center justify-center my-5">
                <div className="bg-blue-400 p-5 rounded-3xl">
                    Total tasks: <strong>{total}</strong>
                </div>

                <div className="bg-green-400 p-5 rounded-3xl">
                    Completed tasks: <strong>{completed}</strong>
                </div>

                <div className="bg-yellow-400 p-5 rounded-3xl">
                    Pending tasks: <strong>{pending}</strong>
                </div>
            </div>

            <div className="mt-6">
                <Link to="/kanban">
                    Go to <span className="text-indigo-600" >Kanban</span>
                </Link>
            </div>
        </div>
    );
};

export default Dashboard;
