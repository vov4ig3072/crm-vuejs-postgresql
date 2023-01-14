import { Router } from "express";
import userRoutes from './user.routes.js'
import categoryRoutes from './category.routes.js'
import newEnteryRoutes from './newentery.routes.js'
const router = Router()

router.use("/user",userRoutes)
router.use("/category", categoryRoutes)
router.use("/new-entery", newEnteryRoutes)

export default router