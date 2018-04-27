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
        validate: {
            len: [200]
        }
    },
    status: {
        type: Sequelize.ENUM('open', 'closed'),
        defaultValue: 'closed'
    }
})

Page.beforeCreate((pageInstance, optionsObj)=> {
    pageInstance.slug = slugify(pageInstance.title);
})

const slugify = (str) => str.replace(/\s+/g, '_').replace(/\W/g, '');

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

module.exports = {db};
