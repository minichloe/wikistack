const express = require('express');
const router = express.Router();
const addPage = require('../views/addPage');
const wikiPage = require('../views/wikipage')
const main = require('../views/main');
const {Page, User} = require('../models');

module.exports = router;

router.get('/', async (req, res, next) => {
  try {

  const pages = await Page.findAll({
    where: {
      status: 'open'
    }
  })
  res.send(main(pages));
} catch (error) { next(error) };
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

  res.send(wikiPage(slugPage));
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

  const user = await User.findOrCreate({
    where: {
      name: name
    },
    defaults: {
      email: email
    }
  })

  const page = new Page({
    title: title,
    content: content,
    status: status,
  })

  try {
    await page.save();
    page.setAuthor(user);
    res.redirect(`/wiki/${page.slug}`);
  } catch (error) {
    next(error);
  }
});
