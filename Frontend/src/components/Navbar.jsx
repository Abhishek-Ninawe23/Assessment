import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { logout } from "../store/authSlice.js";

const Navbar = () => {
    const { user } = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const location = useLocation();
    const currentPath = location.pathname;

    const handleLogout = () => {
        const confirmLogout = window.confirm("Are you sure you want to Logout?");
        if (confirmLogout) {
            dispatch(logout());
            navigate("/login");
            return;
        }
    };

    return (
        <nav className="m-5 bg-white shadow-xl border-b rounded-2xl border-gray-200 sticky top-0 z-50">
            <div className="max-w-full mx-auto px-4">
                <div className="flex items-center justify-between py-3">

                    {/* Left Section */}
                    {/* if user is authenticated then only show NavLinks */}
                    {user ?
                        <div className="flex items-center gap-8">

                            <h1 className="text-xl font-bold tracking-wide text-indigo-600">
                                <span className="hidden sm:inline">KanbanBoard</span>
                                <span className="inline sm:hidden">KB</span>
                            </h1>

                            {/* Navigation Links */}
                            <div className="flex items-center gap-4 sm:gap-2 mr-4">

                                {/* Show Kanban link only if NOT on Kanban page */}
                                {currentPath !== "/kanban" && (
                                    <Link
                                        to="/kanban"
                                        className="text-xl font-bold text-gray-600 hover:text-indigo-600 transition-colors duration-200"
                                    >
                                        Kanban
                                    </Link>
                                )}

                                {/* Show Dashboard link only if NOT on Dashboard page */}
                                {currentPath !== "/dashboard" && (
                                    <Link
                                        to="/dashboard"
                                        className="text-xl font-bold text-gray-600 hover:text-indigo-600 transition-colors duration-200"
                                    >
                                        Dashboard
                                    </Link>
                                )}
                            </div>
                        </div>
                        :
                        <div>
                            <h1 className="text-xl font-bold tracking-wide text-indigo-600">
                                <span className="hidden sm:inline">KanbanBoard</span>
                                <span className="inline sm:hidden">KB</span>
                            </h1>
                        </div>}

                    {/* Right Section - User Area */}
                    <div className="flex items-center sm:items-center max-w-[150px] sm:max-w-none">

                        {user ? (
                            <div className=" flex flex-col sm:flex-row items-center sm:items-center gap-1 sm:gap-3 bg-gray-50 border border-gray-200 px-2 py-2 rounded-2xl shadow-sm w-full sm:w-auto overflow-hidden" >
                                {/* Username */}
                                <span className="text-xl sm:text-lg text-gray-700 text-center w-full truncate">
                                    Hi,{" "}
                                    <span className="font-semibold text-indigo-600 truncate">
                                        {user.name?.split(" ")[0] || user.username}
                                    </span>
                                </span>

                                {/* Logout Button */}
                                <button
                                    onClick={handleLogout}
                                    className=" w-full sm:w-auto px-3 py-1.5 rounded-xl bg-indigo-600 text-white text-lg sm:text-lg font-medium hover:bg-indigo-700 transition-all duration-200 shadow-xl"
                                >
                                    Logout
                                </button>
                            </div>
                        ) : (
                            <div className="flex items-center gap-1 bg-gray-50 border border-gray-200 px-2 py-2 rounded-2xl shadow-sm">
                                <Link
                                    to="/login"
                                    className="text-sm sm:text-sm text-gray-600 hover:text-indigo-600 transition-colors"
                                >
                                    Login
                                </Link>
                                <span className="text-gray-400">/</span>
                                <Link
                                    to="/register"
                                    className="text-sm sm:text-sm text-indigo-600 font-medium hover:text-indigo-700 transition-colors"
                                >
                                    Register
                                </Link>
                            </div>
                        )}
                    </div>

                </div>
            </div>
        </nav>
    );
};

export default Navbar;
