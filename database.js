// Import Sequelize
const { name } = require('ejs');
const { Sequelize, DataTypes, Model, TEXT } = require('sequelize')

// Creation of database link
const sequelize = new Sequelize({
    dialect: "sqlite",
    storage: "preparatoryproject.sqlite"
})

class User extends Model{}

class User_Email extends Model{}

class User_Post extends Model{}

class Event extends Model{}

class Event_Loc extends Model{}

class Event_Date extends Model{}

class Loc_Date extends Model{}

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

User_Email.init({
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

User_Post.init({
    name: {
        type: DataTypes.TEXT,
        allowNull: false,
        references: {
            model: User,
            key: 'name'
        }
    },
    post: {
        type: DataTypes.TEXT,
        references: {
            model: Event,
            key: 'title'
        }
    }
}, { sequelize });

Event.init({
    title: {
        type: DataTypes.TEXT,
        allowNull: false,
        primaryKey: true
    },
    descr: {
        type: DataTypes.TEXT,
        allowNull: false,
        primaryKey: true
    }
}, { sequelize });

Event_Loc.init({
    title: {
        type: DataTypes.TEXT,
        allowNull: false,
        references: {
            model: Event,
            key: 'title'
        }
    },
    loc: {
        type: DataTypes.TEXT,
        allowNull: false
    }
}, { sequelize });

Event_Date.init({
    title: {
        type: DataTypes.TEXT,
        allowNull: false,
        primaryKey: true,
        references: {
            model: Event,
            key: 'title'
        }
    },
    pst_date: {
        type: DataTypes.DATE,
        allowNull: false
    }
}, { sequelize })

Loc_Date.init({
    loc: {
        type: DataTypes.TEXT,
        allowNull: false,
        unique: true,
        references: {
            model: Event_Loc,
            key: 'loc'
        }
    },
    pst_date: {
        type: DataTypes.DATE,
        allowNull: false,
        unique: true,
        references: {
            model: Event_Date,
            key: 'pst_date'
        }
    }
}, { sequelize })