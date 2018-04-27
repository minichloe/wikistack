const express = require('express');
const morgan = require('morgan');
const bodyP = require('body-parser');
const model = require('./models');
const app = express();

app.use(morgan('dev'));
app.use(express.static(__dirname + '/public'));
app.use(bodyP.json());
app.use(bodyP.urlencoded({ extended: false }));

model.db.authenticate().
    then(() => {
        console.log('connected to the database');
    })

app.get('/', (req, res) => {
    res.send('Hello World');
})

const init = async () => {
    await model.db.sync({force: true});

    const PORT = 3000;
    app.listen(PORT, () => {
        console.log(`App listening in port ${PORT}`);
    });
}

init();