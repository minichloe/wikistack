const express = require('express');
const addPage = require('../views/addPage');
const wikiPage = require('../views/wikipage')
const {Page, User} = require('../models');
const router = express.Router();

module.exports = router;

router.get('/', (req, res, next) => {
  res.send('hello');
})

router.get('/add', (req, res, next) => {
  res.send(addPage());
})

router.get('/:slug', async (req, res, next) => {
  const slug = req.params.slug;
  try {
    const slugPage = await Page.findOne({
    where: {
      slug: slug
    }
  });

  res.json(wikiPage(slugPage));
  } catch (error) {
    next(error);
  }
})

router.post('/',  async (req, res, next) => {
  const title = req.body.title;
  const content = req.body.content;
  const status = req.body.status;
  const name = req.body.name;
  const email = req.body.email;

  const page = new Page({
    title: title,
    content: content,
    status: status
  })

  const user = User.findOrCreate({
    where: {
      name: name
    },
    defaults: {
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
