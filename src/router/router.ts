import { Router } from "express";
import { createServiceQueue, getServiceQueue } from "../controllers/serviceQueue";
import { validationNameServiceQueue } from "../middleware/queue";

const router = Router();

export default router;

router.post("/queue", createServiceQueue);
router.get("/queue", getServiceQueue);