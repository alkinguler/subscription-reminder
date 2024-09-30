import { Router } from "express";
import {
  signInController,
  checkSessionValidity,
} from "../controllers/authController";

const router = Router();

router.post("/signin", signInController);
router.get("/check-session", checkSessionValidity);

export default router;
