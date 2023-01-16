import { Router } from "express";
import authMiddleware from "../middleware/auth.middleware.js";
import newEnteryController from '../controller/newEnteryController.js'

const router = Router()

router.post("/income", authMiddleware, newEnteryController.income)
router.post("/outcome", authMiddleware, newEnteryController.outcome)
router.get("/get-outcome/:id", authMiddleware, newEnteryController.getOutcome)
router.get("/get-income/:id", authMiddleware, newEnteryController.getIncome)

export default router