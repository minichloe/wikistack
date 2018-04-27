<<<<<<< HEAD
const express = require('express');
const router = express.Router();

module.exports = router;
=======
const express = require("express");
const router = express.Router();

module.exports = router;

router.get('/', (req, res, next) => {
  res.send('ok')
})

router.post('/', (req, res, next) => {

});

>>>>>>> 6923792cb8107b1b30eb2cf468102bd8a4ddeb36
