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
            <div className="
                px-4 py-2 
                bg-white shadow-md rounded-lg 
                text-gray-800 font-semibold
                border border-gray-200
            ">
                Page {page} of {totalPages}
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
