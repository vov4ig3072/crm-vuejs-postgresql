import bcrypt from 'bcrypt'
import model from '../model/models.js'
import { validationResult } from 'express-validator'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config()

const { User } = model

class UserController {
    async registration(req, res){
        try{
            const errors = validationResult(req)
            const { email, password, name } = req.body

            if(!errors.isEmpty()){
                return res.status(400).json({errors: errors.array()})
            }

            const candidate = await User.findOne({ where:{ email }})
            if(candidate){
                return res.status(400).json({error: 'User is olredy exist'})
            }

            const hashPassword = await bcrypt.hash(password, 3)
            const user = await User.create({email, name, password: hashPassword})
            
            const token = jwt.sign(
                {userId: user.dataValues.id}, 
                process.env.SECRET_KEY,
                {expiresIn: '4h'}
            )

            res.status(201).json({token, userId: user.dataValues.id})
        }catch (e) {
             res.status(500).json({message: "Sever Error try later"})
        }
    }

    async login(req, res){
        try{
            const errors = validationResult(req)
            const { email, password } = req.body

            if(!errors.isEmpty()){
                return res.status(400).json({errors: errors.array()})
            }

            const candidate = await User.findOne({ where:{ email }})
            if(!candidate){
                return res.status(400).json({error: 'User not found'})
            }

            const isMatch = await bcrypt.compare(password, candidate.dataValues.password) 
            if(!isMatch){
                return res.status(400).json({error: 'Password or email not correct'})
            }
                        
            const token = jwt.sign(
                {userId: candidate.dataValues.id}, 
                process.env.SECRET_KEY,
                {expiresIn: '4h'}
            )

            res.status(200).json({token, userId: candidate.dataValues.id})
        }catch (e) {
            res.status(500).json({message: "Sever Error try later"})
        }
    }

    async getUserInfo (req, res) {
        try{
            const { id } = req.params
            const user = await User.findOne({where : {id}})
            if(!user){
                res.status(401).json({message: "Somesing wentwrong"})
                return
            }
            
            const { name, salary} = user.dataValues
        
            res.json({id, name, salary})
        }catch (e){
            console.log(e);
        }
        
    }
}

export default new UserController()
