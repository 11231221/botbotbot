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
 module.exports = sequelize.define('result',{
    id: {type:DataTypes.INTEGER, primaryKey: true, unique: true, autoIncrement: true},
    chatId: {type: DataTypes.STRING},
    result: {type: DataTypes.STRING, allowNull: true},
    type: {type: DataTypes.STRING, allowNull: true}
})