import { Router } from "express";
import { createServiceQueue, getServiceQueue } from "../controllers/serviceQueue";
import { validationNameServiceQueue } from "../middleware/queue";
import { createOperators } from "../controllers/operators";
import { validationEmailOperator } from "../middleware/operator";

const router = Router();

export default router;

router.post("/queue", createServiceQueue);
router.get("/queue", validationNameServiceQueue, getServiceQueue);

router.post("/operator", validationEmailOperator, createOperators)