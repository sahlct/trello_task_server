import { Router } from "express";
import { listUsers } from "../controllers/userController.js";
import { auth } from "../middleware/auth.js";

const router = Router();

// All routes require authentication
router.use(auth);

// GET /api/users - list all users
router.get("/", listUsers);

export default router;
