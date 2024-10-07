import { Router } from "express";
import {
  loginController,
  refreshToken,
  logoutController,
} from "../controllers/authController";
import { rateLimiter } from "../middleware/authMiddleware";

const router = Router();

router.post("/signin", rateLimiter, loginController);
router.get("/refresh", refreshToken);
router.get("/logout", logoutController);

export default router;
