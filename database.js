// Import Sequelize
const { name } = require('ejs');
const { Sequelize, DataTypes, Model } = require('sequelize')

// Creation of database link
const sequelize = new Sequelize({
    dialect: "sqlite",
    storage: "preparatoryproject.sqlite"
})

class User extends Model{}

class User_Email extends Model{}

class Event extends Model{}

User.init({
    name: {
        type: DataTypes.TEXT,
        primaryKey: true,
        allowNull: false,
        unique: true
    },
    pswd: {
        type: DataTypes.TEXT,
        allowNull: false
    }
}, { sequelize });

User_Email({
    mail: {
        type: DataTypes.TEXT,
        allowNull: false,
        unique: true,
        references: {
            model: User,
            key: 'name'
        }
    }
}, { sequelize });