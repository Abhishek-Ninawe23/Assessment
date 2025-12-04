import React from "react";
import Button from "@mui/material/Button";

const Pagination = ({ page, totalPages, setPage }) => {
    return (
        <div className="flex justify-center items-center gap-6 mt-10">

            {/* PREVIOUS BUTTON */}
            <Button
                variant="contained"
                disabled={page === 1}
                onClick={() => setPage(page - 1)}
                sx={{
                    textTransform: "none",
                    paddingInline: "1.5rem",
                    borderRadius: "0.6rem",
                    height: 42,
                }}
            >
                Previous
            </Button>

            {/* PAGE INFO */}
            <div className="flex items-center justify-center">
                {
                    // generate page numbers using totalPages
                    [...Array(totalPages)].map((_, index) => (
                        <button
                            key={index}
                            onClick={() => setPage(index + 1)}
                            className={`mx-1 px-3 py-1 rounded-lg ${page === index + 1 ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'} transition-colors`}
                        >
                            {index + 1}
                        </button>
                    ))
                }
            </div>

            {/* NEXT BUTTON */}
            <Button
                variant="contained"
                disabled={page === totalPages}
                onClick={() => setPage(page + 1)}
                sx={{
                    textTransform: "none",
                    paddingInline: "1.5rem",
                    borderRadius: "0.6rem",
                    height: 42,
                }}
            >
                Next
            </Button>

        </div>
    );
};

export default Pagination;
