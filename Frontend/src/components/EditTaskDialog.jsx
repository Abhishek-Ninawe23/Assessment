import React, { useState, useEffect } from "react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import TextField from "@mui/material/TextField";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";


export default function EditTaskDialog({ open, onClose, task, onSave }) {

    const [form, setForm] = useState({
        name: "",
        priority: "low",
        deadline: "",
        stage: 0
    });

    useEffect(() => {
        if (task) {
            setForm({
                name: task.name || "",
                priority: task.priority || "low",
                deadline: task.deadline
                    ? new Date(task.deadline).toISOString().slice(0, 10)
                    : "",
                stage: task.stage ?? 0
            });
        }
    }, [task]);


    const handleSave = () => {
        if (!form.name.trim())
            return alert("Name Required");
        onSave(form);
    }


    return (
        <Dialog key={task?._id || 'new'} open={open} onClose={onClose}>
            <DialogTitle>Edit Task</DialogTitle>
            <DialogContent>

                <TextField
                    label="Name"
                    fullWidth
                    margin="dense"
                    multiline
                    minRows={1}
                    maxRows={4}
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    inputProps={{
                        style: { whiteSpace: "wrap", wordBreak: "break-word" }
                    }}
                />

                <TextField
                    select
                    label="Priority"
                    fullWidth
                    margin="dense"
                    value={form.priority}
                    onChange={(e) =>
                        setForm({ ...form, priority: e.target.value })} >
                    <MenuItem value="low">Low</MenuItem>
                    <MenuItem value="medium">Medium</MenuItem>
                    <MenuItem value="high">High</MenuItem>
                </TextField>

                <TextField
                    label="Deadline"
                    type="date"
                    fullWidth
                    margin="dense"
                    value={form.deadline}
                    onChange={(e) =>
                        setForm({ ...form, deadline: e.target.value })}
                    slotProps={{
                        inputLabel: {
                            shrink: true
                        }
                    }} />
            </DialogContent>

            <DialogActions>
                <Button onClick={onClose}>Cancel</Button>
                <Button
                    variant="contained"
                    onClick={handleSave}>Save</Button>
            </DialogActions>
        </Dialog>
    );
}

