import model from '../model/models.js'

const { Category } = model

class CategoryController{
    async create(req, res){
        try{
            const { userId, title, limit} = req.body

            const candidate = await Category.findOne({where: {title}})
            if(candidate){
                return res.status(401).json({message: 'Category is olredy exist'})
            }

            await Category.create({title, limit, userId})

            res.status(201).json({message: 'Category created'})
        }catch (e) {
            res.status(500).json({message: "Sever Error try later"})
        }
    }

    async edit(req, res) {
        try{
    
            const { categoryId, userId, title, limit} = req.body           
    
            const category = await Category.findOne({where: {userId, id: categoryId}})
            
            if(!category){
                return res.status(401).json({message: 'Category no find'})
            }
    
            await Category.update({limit, title},{ where: { id: categoryId } })

            res.status(201).json({ message: 'Category updated' })
        }catch (e) {
            res.status(500).json({ message: "Sever Error try later" })
        }
    }

    async getCategories (req, res) {
        try{
            const userId = req.params.id         
    
            const category = await Category.findAll({ where:{userId} })
            if(!category){
                return res.status(401).json({ message: 'Category no find' })
            }
    
            res.status(201).json(category)
        }catch (e) {
            res.status(500).json({message: "Sever Error try later"})
        }
    }
}

export default new CategoryController()
