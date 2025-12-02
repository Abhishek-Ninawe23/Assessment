//small helper functions for client-side validation

export function validateTaskInput({ name, priority }) {
    if (!name || !name.trim()) return "Task name is required";
    if (!["low", "medium", "high"].includes(priority)) return "Invalid priority";
    return null;
}