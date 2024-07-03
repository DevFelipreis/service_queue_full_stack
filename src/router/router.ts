import { Router } from "express";
import { createServiceQueue, getServiceQueue } from "../controllers/serviceQueue";
import { validationNameServiceQueue } from "../middleware/queue";
import { createOperators, loginOperator, updateOperators } from "../controllers/operators";
import { validationEmailOperator, validationTicketWindow } from "../middleware/operator";
import { loginValidation } from "../jwt/jwtTokenUser";

const router = Router();

export default router;

router.post("/login", loginOperator);

<<<<<<< HEAD
router.post("/queue", createServiceQueue);

router.use(loginValidation);

=======
router.use(loginValidation);

router.post("/queue", createServiceQueue);
>>>>>>> 5e2cc84fb165898db4b5dd507af2b98cf90d9ce2
router.get("/queue", validationNameServiceQueue, getServiceQueue);

router.post("/operator", validationTicketWindow, validationEmailOperator, createOperators);
router.put("/operator", validationTicketWindow, validationEmailOperator, updateOperators);
