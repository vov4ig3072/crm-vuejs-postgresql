import sequelize from '../database.js'
import { DataTypes } from 'sequelize'


const User = sequelize.define('user',{
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    email: {type: DataTypes.STRING, unique: true},
    password: {type: DataTypes.STRING, allowNull: false},
    name: {type: DataTypes.STRING, allowNull: false},
    salary: {type: DataTypes.INTEGER, defaultValue: 10000},
    locale: {type: DataTypes.STRING, defaultValue: "ua-UA"}
})

const Consuntion = sequelize.define('consuntion',{
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    sum: {type: DataTypes.INTEGER, allowNull: false},
    comment: {type: DataTypes.STRING, allowNull: false},
})

const Income = sequelize.define('income',{
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    sum: {type: DataTypes.INTEGER, allowNull: false},
    comment: {type: DataTypes.STRING, allowNull: false},
})

const Category = sequelize.define('category', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    title: {type: DataTypes.STRING, allowNull: false},
    limit: { type: DataTypes.INTEGER, allowNull: false}
})

User.hasMany(Income)
Income.belongsTo(User)

User.hasMany(Category)
Category.belongsTo(User)

User.hasMany(Consuntion)
Consuntion.belongsTo(User)

Category.hasMany(Consuntion)
Consuntion.belongsTo(Category)

export default {
    User, 
    Consuntion, 
    Income, 
    Category
}