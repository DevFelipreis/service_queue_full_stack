import { Router } from "express";
import { createServiceQueue, getServiceQueue } from "../controllers/serviceQueue";
import { validationNameServiceQueue } from "../middleware/queue";
import { createOperators } from "../controllers/operators";

const router = Router();

export default router;

router.post("/queue", createServiceQueue);
router.get("/queue", validationNameServiceQueue, getServiceQueue);

router.post("/operator", createOperators)