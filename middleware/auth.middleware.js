import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config()

export default (req, res ,next) => {
    try{

       const token = req.headers.authorization.split(' ')[1]
       if(!token){
         return res.status(401).json({error: "User no authorization"})
       }

       const decodet = jwt.verify(token, process.env.SECRET_KEY)
       req.user = decodet
       next()

    } catch (e) {
        res.status(401).json({error: "User no authorization"})
    }
}
