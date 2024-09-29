import { hashPassword } from "../middleware/userMiddleware";
import { Router } from "express";
import { createUser, getAllUsers } from "../controllers/userController";
const router = Router();

router.post("/createUser", hashPassword, createUser);

router.get("/getUsers", getAllUsers);

export default router;
