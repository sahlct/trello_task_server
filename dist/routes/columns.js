import { Router } from "express";
import { auth } from "../middleware/auth.js";
import { renameColumn } from "../controllers/columnController.js";
const router = Router();
router.use(auth);
router.patch("/:columnId", renameColumn);
export default router;
