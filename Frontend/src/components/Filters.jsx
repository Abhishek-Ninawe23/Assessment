import React from "react";
import Button from "@mui/material/Button";

const Filters = ({ search, limit, priorityFilter, setSearch, setLimit, setPriorityFilter, resetFilters }) => {
    return (
        <div
            className=" bg-white shadow-lg rounded-xl p-6  grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4  gap-6 items-end mb-10"
        >

            {/* Search */}
            <div className="flex flex-col w-full">
                <label className="font-semibold text-gray-700 mb-1">Search Task</label>
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
                <label className="font-semibold text-gray-700 mb-1">Limit</label>
                <select
                    className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                    value={limit}
                    onChange={(e) => setLimit(Number(e.target.value))}
                >
                    <option value={5}>5</option>
                    <option value={10}>10</option>
                    <option value={15}>15</option>
                    <option value={20}>20</option>
                </select>
            </div>

            {/* Priority Filter */}
            <div className="flex flex-col w-full">
                <label className="font-semibold text-gray-700 mb-1">Priority</label>
                <select
                    className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                    value={priorityFilter}
                    onChange={(e) => setPriorityFilter(e.target.value)}
                >
                    <option value="all">All Priorities</option>
                    <option value="high">High Only</option>
                    <option value="medium">Medium Only</option>
                    <option value="low">Low Only</option>
                </select>
            </div>

            {/* Reset Button */}
            <div className="flex justify-start md:justify-end w-full">
                <Button
                    variant="contained"
                    onClick={resetFilters}
                    sx={{
                        height: 48,
                        paddingInline: "1.5rem",
                        textTransform: "none",
                        borderRadius: "0.6rem",
                        fontWeight: "bold"
                    }}
                >
                    Reset
                </Button>
            </div>

        </div>
    );
};

export default Filters;
