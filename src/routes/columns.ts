import { Router } from "express";
import { auth } from "../middleware/auth.js";
import { createColumn, deleteColumn, listColumns, renameColumn } from "../controllers/columnController.js";
const router = Router();
router.use(auth);
router.patch("/:columnId", renameColumn);
router.get("/", listColumns);
router.post("/", createColumn)
router.delete("/:columnId", deleteColumn)
export default router;
