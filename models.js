const {DataTypes, Sequelize} = require('sequelize');


const sequelize= new Sequelize(
    'tg',
    'postgres',
    'admin',
    {
        host: 'localhost',
        port: '5432',
        dialect: 'postgres'
    }
)
sequelize.authenticate()
sequelize.sync()
 module.exports = sequelize.define('user',{
    id: {type:DataTypes.INTEGER, primaryKey: true, unique: true, autoIncrement: true},
    chatId: {type: DataTypes.STRING, unique: true},
    
})