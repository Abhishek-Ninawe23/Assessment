import joi from "joi";

// Task Creation Schema
const createTaskSchema = joi.object({
    name: joi.string().trim().min(2).max(500).required(),
    priority: joi.string().valid('low', 'medium', 'high').required(),
    deadline: joi.date().optional().allow(null)
    // stage : at the time of creating a task, status will be always 'Backlog'
});

const updateTaskSchema = joi.object({
    name: joi.string().trim().min(2).max(500).optional(),
    priority: joi.string().valid('low', 'medium', 'high').optional(),
    deadline: joi.date().optional().allow(null),
    stage: joi.number().integer().valid(0, 1, 2, 3).optional()
})

export { createTaskSchema, updateTaskSchema };