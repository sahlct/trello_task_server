import { Router } from "express";
import { auth } from "../middleware/auth.js";
import { createTask, moveTask, updateTask, commentOnTask } from "../controllers/taskController.js";
const router = Router();
router.use(auth);
router.post("/", createTask);
router.patch("/move/:taskId", moveTask);
router.patch("/:taskId", updateTask);
router.post("/:taskId/comments", commentOnTask);
export default router;
router.get("/:taskId", async (req, res) => {
    const task = await (await import("../models/Task.js")).default.findById(req.params.taskId);
    if (!task)
        return res.status(404).json({ message: "Not found" });
    res.json(task);
});
