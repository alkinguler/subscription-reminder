import { Router } from "express";
import { createSubscription } from "../controllers/subscriptionController";
import { secureEndpoints } from "../middleware/authMiddleware";

const router = Router();

router.use(secureEndpoints);

router.post("/create", createSubscription);

export default router;
