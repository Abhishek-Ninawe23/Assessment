import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import React from "react";

const TrashBin = ({ visible, onDropDelete }) => {
    if (!visible) return null;

    const handleDrop = (e) => {
        e.preventDefault();
        const id = e.dataTransfer.getData("id");
        if (id) onDropDelete(id);
    };

    const handleDragOver = (e) => e.preventDefault();

    return (
        <div
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            className=" fixed bottom-6 right-6 bg-black text-white w-40 h-16 rounded-xl shadow-xl flex items-center justify-center gap-3 cursor-pointer z-9999 transition-all animate-bounce-small opacity-60"
        >
            <DeleteForeverIcon fontSize="large" />
            <span className="font-semibold text-sm">Drop to Delete</span>
        </div>
    );
};

export default TrashBin;
