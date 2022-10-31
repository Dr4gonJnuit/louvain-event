// Import Sequelize
const { Sequelize, DataTypes, Model } = require('sequelize')

// Creation of database link
const sequelize = new Sequelize({
    dialect: " sqlite ",
    storage: " preparatoryproject . sqlite "
})

class Utilisateur extends Model{}

class Incident extends Model{}