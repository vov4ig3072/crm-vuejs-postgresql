import { Router } from "express";
import { check} from 'express-validator'
import userController from "../controller/userController.js";
import authMiddleware from "../middleware/auth.middleware.js";

const router = Router()

router.post(
    "/registration", [
        check('email', 'Email is not correct').isEmail(),
        check('password', 'Min lenght 6 simbols').isLength({ min: 6}),
        check('name', 'This field is empty').isLength({ min: 1})
    ], 
    userController.registration)

router.post(
    "/login", [
        check('email', 'Email is not correct').isEmail(),
        check('password', 'Min lenght 6 simbols').isLength({ min: 6})
    ], 
    userController.login)

router.get("/user-info/:id", authMiddleware , userController.getUserInfo)
router.put("/user-info/:id", authMiddleware , userController.updateUserInfo)

export default router