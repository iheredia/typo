const express = require('express');
const render = require('./render');

const router = express.Router();

router.get('/', render);


module.exports = router;
