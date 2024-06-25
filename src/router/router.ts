import { Router } from "express";
import { createServiceQueue } from "../controllers/serviceQueue";

const router = Router();

export default router;

router.post("/queue", createServiceQueue);