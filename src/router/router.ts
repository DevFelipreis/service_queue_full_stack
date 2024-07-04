import { Router } from "express";
import { createServiceQueue, getServiceQueueName, getServiceQueueOpenServiceFalse, getServiceQueueOpenServiceTrue, getServiceQueuePreferentialFalse, getServiceQueuePreferentialTrue, getServiceQueueAll } from "../controllers/serviceQueue";
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

router.get("/queue-name", validationNameServiceQueue, getServiceQueueName);
router.get("/queue-open-service-true",  getServiceQueueOpenServiceTrue);
router.get("/queue-open-service-false",  getServiceQueueOpenServiceFalse);
router.get("/queue-preferential-false", getServiceQueuePreferentialFalse);
router.get("/queue-preferential-true",  getServiceQueuePreferentialTrue);
router.get("/queue-all",  getServiceQueueAll);

router.post("/operator", validationTicketWindow, validationEmailOperator, createOperators);
router.put("/operator", validationTicketWindow, validationEmailOperator, updateOperators);
router.delete("/operator", deleteOperators);
