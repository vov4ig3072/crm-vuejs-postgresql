import { Router } from "express";
import authMiddleware from "../middleware/auth.middleware.js";
import categoryController from '../controller/categoryController.js'

const router = Router()

router.post("/create", authMiddleware, categoryController.create)
router.post("/edit", authMiddleware, categoryController.edit)
router.get("/categories/:id", authMiddleware, categoryController.getCategories)


export default router