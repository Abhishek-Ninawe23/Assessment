import Task from "../models/Task.model.js";
import { createTaskSchema, updateTaskSchema } from "../validators/taskValidators.js";


////// Controllers //////
// Create Task Controller
export async function createTask(req, res, next) {
    try {
        //check whether the given data is proper or not using joi validator
        // console.log("Request Body:", req.body); // Debugging line
        const { error } = createTaskSchema.validate(req.body);
        if (error) {
            res.status(400);
            throw new Error(error.details?.[0]?.message || "Invalid input data");
        }

        //destructure passed data into variables
        const { name, stage = 0, priority, deadline } = req.body;
        const userID = req.user._id; //extract user

        //create new Task in DB
        const task = await Task.create({ name, priority, stage, deadline, user: userID });

        res.status(201).json({ success: true, task });

    } catch (error) {
        next(error);
    }
}

// Get All Tasks
export async function getTasks(req, res, next) {
    try {
        // optional query params: stage, search, sort, page, limit
        const { stage, search, page = 1, limit = 5 } = req.query;

        //ensures that users can only fetch their own tasks.
        const filter = { user: req.user._id };

        //optional filters based on query parameters.
        if (stage !== undefined) {
            filter.stage = Number(stage);
        }
        if (search) {
            //a case-insensitive regex for the search functionality.
            filter.name = { $regex: search, $options: "i" };
        }

        //calculate the number of documents to skip for pagination.
        const skip = (Number(page) - 1) * Number(limit);

        //fetch the tasks for the current page, sorted by creation date.
        const tasks = await Task.find(filter)
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(Number(limit));

        //count total number of Tasks of the user
        const total = await Task.countDocuments(filter);

        res.json({
            success: true,
            tasks,
            total,
            page: Number(page),
            TotalPages: Math.ceil(total / Number(limit))
        });

    } catch (error) {
        next(error);
    }
}

export async function updateTask(req, res, next) {
    try {
        //check whether the given data is proper or not using joi validator
        const { error } = updateTaskSchema.validate(req.body)
        if (error) {
            res.status(400);
            throw new Error(error.details?.[0]?.message || "Invalid input data");
        }

        //get id from parameters
        const { id } = req.params;

        //find the task by id and ensure it belongs to the authenticated user
        const task = await Task.findOne({ _id: id, user: req.user._id });

        if (!task) {
            res.status(404);
            throw new Error("Task not Found")
        }

        //allowed fields for update
        const allowed = ["name", "priority", "deadline", "stage"];

        //update only the allowed fields present in the request body
        for (const key of allowed) {
            if (req.body[key] !== undefined) {
                task[key] = req.body[key];
            }
        }

        await task.save()
        res.json({
            success: true,
            task
        });
    } catch (error) {
        next(error);
    }
}

export async function deleteTask(req, res, next) {
    try {

        const { id } = req.params;
        // Find and delete the task ensuring it belongs to the authenticated user
        const task = await Task.findOneAndDelete({ _id: id, user: req.user._id });

        // If task wasn't found, respond with 404
        if (!task) {
            res.status(404);
            throw new Error("Task not Found");
        }

        res.json({ success: true, message: "Task Deleted Successfully" });

    } catch (error) {
        next(error);
    }
}