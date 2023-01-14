import dotenv from 'dotenv'
import express from 'express'
import sequilize from './database.js'
import router from './routes/index.routes.js'

dotenv.config()
const app = express()
const PORT = process.env.PORT || 8000

app.use(express.json())
app.use("/api", router)



async function start () {
    try{

        await sequilize.authenticate()
        await sequilize.sync()
        
        app.listen(PORT, () => {
            console.log(`Server has been started on port ${ PORT }`)
        })

    }catch (e) {
        console.log(e)
    }
}


start()
