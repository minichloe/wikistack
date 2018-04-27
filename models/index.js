const Sequelize = require('sequelize');
const db = new Sequelize('postgres://localhost:5432/wikistack', {logging: false});

const Page = db.define('pages', {
    title: {
        type: Sequelize.STRING,
        allowNull: false
    },
    slug: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            is: /^[\w]+$/i
        }
    },
    content: {
        type: Sequelize.TEXT,
        allowNull: false,
    },
    status: {
        type: Sequelize.ENUM('open', 'closed')
    }
})

const slugify = (str) => str.replace(/\s+/g, '_').replace(/\W/g, '');
Page.beforeValidate((pageInstance, optionsObj)=> {
    pageInstance.slug = slugify(pageInstance.title);
})

const User = db.define('users', {
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            isEmail: true
        }
    }
})

Page.belongsTo(User, {as: 'author'});
// User.hasMany(Page);

module.exports = {db, Page, User};
