import model from '../model/models.js'

const { Income, User, Consuntion } = model

class NewEnteryController{
    async income(req, res) {
        try{
            const {userId, sum, comment} = req.body,
                  user = await User.findOne({where: {id: userId}})
          
            await Income.create({sum, comment, userId}),
            await User.update({ salary: +user.salary + +sum }, {where: { id: userId }})
    
            res.status(201).json({message: `New income created`})
        }catch (e){
            res.status(500).json({message: "Sever Error try later"})
        }
    }

    async outcome(req, res) {
        try{
            const {userId, categoryId, sum, comment} = req.body,
                  user = await User.findOne({where: {id: userId}})
    
            await Consuntion.create({userId, categoryId, sum, comment})
            await User.update({salary: user.salary - sum},{where: {id: userId}})
            
            res.status(201).json({message: `New outcome created`})
        }catch (e){
            res.status(500).json({message: "Sever Error try later"})
        }
    }

    async getOutcome(req,res) {
        try{
            const userId = req.params.id,
                  outcome = await Consuntion.findAll({where: {userId}})
    
            res.status(200).json(outcome)
        }catch (e){
            res.status(500).json({message: "Sever Error try later"})
        }
    }

    async getIncome(req,res) {
        try{
            const userId = req.params.id,
                  income = await Income.findAll({where: {userId}})
    
            res.status(200).json(income)
        }catch (e){
            res.status(500).json({message: "Sever Error try later"})
        }
    }
}

export default new NewEnteryController()
// try{

// }catch (e) {
//      res.status(500).json({message: "Sever Error try later"})
// }