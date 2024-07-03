import { Router } from "express";
import { createServiceQueue, getServiceQueue } from "../controllers/serviceQueue";
import { validationNameServiceQueue } from "../middleware/queue";
import { createOperators, loginOperator, updateOperators, deleteOperators } from "../controllers/operators";
import { validationEmailOperator, validationTicketWindow } from "../middleware/operator";
import { loginValidation } from "../jwt/jwtTokenUser";

const router = Router();

export default router;

router.post("/login-user", loginOperator);

router.post("/queue", createServiceQueue);

router.use(loginValidation);

router.post("/queue", createServiceQueue);

router.get("/queue", validationNameServiceQueue, getServiceQueue);

router.post("/operator", validationTicketWindow, validationEmailOperator, createOperators);
router.put("/operator", validationTicketWindow, validationEmailOperator, updateOperators);
router.delete("/operator", deleteOperators);
