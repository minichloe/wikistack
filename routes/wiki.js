const express = require("express");
const addPage = require("../views/addPage");
const db = require("../models/index");
const router = express.Router();

module.exports = router;

router.get('/', (req, res, next) => {
  res.send('hello');
})

router.get('/add', (req, res, next) => {
  res.send(addPage());
})

router.post('/',  async (req, res, next) => {
  const title = req.body.title;
  const content = req.body.content;
  const status = req.body.status;
  const name = req.body.name;
  const email = req.body.email;

  const page = new db.Page({
    title: title,
    content: content,
    status: status
  })

  const user = db.User.findOrCreate({
    where: {
      name: name,
      email: email
    }
  })

  try {
    await page.save();
    await user.save();
    res.redirect('/');
  } catch (error) {
    next(error);
  }
});
