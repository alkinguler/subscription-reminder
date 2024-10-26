import { Router } from "express";
import {
  createSubscription,
  deleteSubscription,
  getSubscriptions,
} from "../controllers/subscriptionController";
import { secureEndpoints } from "../middleware/authMiddleware";

const router = Router();

router.use(secureEndpoints);

router.post("/create", createSubscription);
router.get("/get", getSubscriptions);
router.delete("/delete", deleteSubscription);

export default router;
