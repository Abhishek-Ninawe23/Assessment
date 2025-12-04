import React from "react";
import Button from "@mui/material/Button";
import RestartAltIcon from "@mui/icons-material/RestartAlt";

const Filters = ({ search, limit, priorityFilter, setSearch, setLimit, setPriorityFilter, resetFilters, }) => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 bg-white shadow-lg rounded-xl p-6 items-end mb-10">
            {/* Search */}
            <div className="flex flex-col w-full">
                <label className="font-semibold text-gray-700 mb-1">
                    Search Task
                </label>
                <input
                    type="text"
                    placeholder="Search tasks..."
                    className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
            </div>

            {/* Limit */}
            <div className="flex flex-col w-full">
                <label className="font-semibold text-gray-700 mb-1">
                    Limit
                </label>
                <select
                    className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                    value={limit}
                    onChange={(e) => setLimit(Number(e.target.value))}
                >
                    {[8, 16, 24, 32].map((n) => (
                        <option key={n} value={n}>
                            {n}
                        </option>
                    ))}
                </select>
            </div>

            {/* Priority */}
            <div className="flex flex-col w-full">
                <label className="font-semibold text-gray-700 mb-1">
                    Priority
                </label>
                <select
                    className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                    value={priorityFilter}
                    onChange={(e) => setPriorityFilter(e.target.value)}
                >
                    <option value="all">All</option>
                    <option value="high">High Only</option>
                    <option value="medium">Medium Only</option>
                    <option value="low">Low Only</option>
                </select>
            </div>

            {/* Reset Button */}
            <div className="flex justify-start md:justify-end w-full">
                <Button
                    fullWidth
                    variant="contained"
                    startIcon={<RestartAltIcon />}
                    onClick={resetFilters}
                    sx={{
                        height: 48,
                        paddingInline: "1.5rem",
                        borderRadius: "0.6rem",
                        fontWeight: "bold",
                        textTransform: "none",
                    }}
                >
                    Reset Filters
                </Button>
            </div>
        </div>
    );
};

export default Filters;
