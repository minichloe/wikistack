const express = require('express');
const morgan = require('morgan');
const bodyP = require('body-parser');
const model = require('./models');
const app = express();
const user = require('./routes/user');
const wiki = require('./routes/wiki');

app.use(morgan('dev'));
app.use(express.static(__dirname + '/views'));
app.use(bodyP.json());
app.use(bodyP.urlencoded({ extended: false }));
app.use('/users', user);
app.use('/wiki', wiki);

model.db.authenticate().
    then(() => {
        console.log('connected to the database');
    })

app.get('/', (req, res) => {
    res.redirect("/wiki");
})

const init = async () => {
    await model.db.sync();

    const PORT = 3000;
    app.listen(PORT, () => {
        console.log(`App listening in port ${PORT}`);
    });
}

init();
