import { Router } from "express";
import authMiddleware from "../middleware/auth.middleware.js";
import newEnteryController from '../controller/newEnteryController.js'
import model from '../model/models.js'

const { Income, User, Consuntion } = model


const router = Router()

router.post("/income", authMiddleware, async (req, res) => {
    try{
        const {userId, sum, comment} = req.body,
              income = await Income.create({sum, comment, userId}),
              user = await User.findOne({where: {id: userId}})

        await User.update({
            salary: user.salary + sum
        },
        {where: {
            id: userId
            }
        })

        res.status(201).json(income)
    }catch (e){
        res.status(500).json({message: "Sever Error try later"})
    }
    
})

router.post("/consumption", authMiddleware, async (req, res) => {
    try{
        const {userId, categoryId, sum, comment} = req.body,
              consuntion = Consuntion.create({userId, categoryId, sum, comment}),
              user = User.findOne({where: {id: userId}}),
              updateUser = User.update({salary: user.salary - sum},{where: {id: userId}})

        res.status(201).json(consuntion)
    }catch (e){
        res.status(500).json({message: "Sever Error try later"})
    }
    
})
// router.get("/categories/:id", authMiddleware, categoryController.getCategories)


export default router