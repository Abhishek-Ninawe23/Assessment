import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../store/authSlice.js";

const Navbar = () => {
    const { user } = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogout = () => {
        dispatch(logout());
        navigate("/login");
    };

    return (
        <nav className="bg-white shadow-md border-b border-gray-200 sticky top-0 z-50">
            <div className="max-w-6xl mx-auto px-4">
                <div className="flex items-center justify-between py-3">

                    {/* Left Section */}
                    <div className="flex items-center gap-8">

                        <h1 className="text-xl font-bold tracking-wide text-indigo-600">
                            <span className="hidden sm:inline">KanbanBoard</span>
                            <span className="inline sm:hidden">KB</span>
                        </h1>

                        {/* Navigation Links */}
                        <div className="flex items-center gap-4 sm:gap-2 mr-4">


                            <Link
                                to="/kanban"
                                className="text-sm text-gray-600 hover:text-indigo-600 transition-colors duration-200"
                            >
                                Kanban
                            </Link>

                            <Link
                                to="/dashboard"
                                className="text-sm text-gray-600 hover:text-indigo-600 transition-colors duration-200"
                            >
                                Dashboard
                            </Link>
                        </div>
                    </div>

                    {/* Right Section - User Area */}
                    <div className="flex flex-col items-center gap-4 shrink-0">

                        {user ? (
                            <div className=" flex flex-col sm:flex-row  items-center gap-2 sm:gap-3  bg-gray-50 border border-gray-200  px-3 py-2 rounded-2xl shadow-sm max-w-full truncate p-15">
                                <span className="text-sm text-gray-700 truncate">
                                    Hi,{" "}
                                    <span className="font-semibold text-indigo-600 truncate">
                                        {user.name || user.username}
                                    </span>
                                </span>

                                <button
                                    onClick={handleLogout}
                                    className=" px-3 py-1.5 rounded-xl bg-indigo-600  text-white text-xs font-medium  hover:bg-indigo-700  transition-all duration-200 w-full sm:w-auto"
                                >
                                    Logout
                                </button>
                            </div>
                        ) : (
                            <div className="items-center bg-gray-50 border border-gray-200  px-1.5 py-2 rounded-2xl shadow-sm max-w-full truncate">
                                <Link
                                    to="/login"
                                    className="text-sm text-gray-600 hover:text-indigo-600 transition-colors"
                                >
                                    Login
                                </Link>
                                <span className="text-gray-400"> / </span>
                                <Link
                                    to="/register"
                                    className="text-sm text-indigo-600 font-medium hover:text-indigo-700 transition-colors"
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
