// Import Sequelize
const { name } = require('ejs');
const { Sequelize, DataTypes, Model, TEXT } = require('sequelize')
var db = {};

// Creation of database link
const sequelize = new Sequelize({
    dialect: "sqlite",
    storage: "preparatoryproject.sqlite"
})

class User extends Model{}

class User_Email extends Model{}

class User_Post extends Model{}

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
}, {
    sequelize,
    modelName: 'User'
});

User_Email.init({
    id : {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        unique: true,
    },
    mail: {
        type: DataTypes.TEXT,
        allowNull: false,
        unique: true,
    },
    user_name: {
        type: DataTypes.TEXT,
        references: {
            model: User,
            key: 'name'
        }
    }
}, {
    sequelize,
    modelName: 'User_Email'
});

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
    },
    loc: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    pst_date: {
        type: DataTypes.DATE,
        allowNull: false
    }
}, {
    sequelize,
    modelName: 'Event'
});

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
}, {
    sequelize,
    modelName: 'User_Post'
});
  
User.hasMany(User_Email);

db.sequelize = sequelize;
db.Sequelize = Sequelize;
db.user = User;
db.user_email = User_Email;
db.event = Event;
db.description = Event;
db.location = Event;
db.date = Event;



db.sequelize.sync({force: true});  



module.exports = db;