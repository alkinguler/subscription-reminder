import { Router } from "express";
import { secureEndpoints } from "../middleware/authMiddleware";
import { hashPassword } from "../middleware/userMiddleware";
import { createUser, getAllUsers } from "../controllers/userController";

const router = Router();

router.use(secureEndpoints);

router.post("/createUser", hashPassword, createUser);
router.get("/getUsers", getAllUsers);

export default router;
