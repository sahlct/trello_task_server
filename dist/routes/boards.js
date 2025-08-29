import { Router } from "express";
import { auth } from "../middleware/auth.js";
import { createBoard, listBoards, inviteMember } from "../controllers/boardController.js";
const router = Router();
router.use(auth);
router.post("/", createBoard);
router.get("/", listBoards);
router.post("/invite", inviteMember);
export default router;
