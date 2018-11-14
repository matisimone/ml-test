// apis a consultar
// /api/items?q= :query -> https://api.mercadolibre.com/sites/MLA/search?q= :query
// /api/items/ :id -> https://api.mercadolibre.com/items/ :id
//                    https://api.mercadolibre.com/items/ :id /description

const express = require('express');
const router = express.Router();

// @route  GET api/items/test
// @desc   Test items route
// @access Public
router.get('/test', (req, res) => res.json({ msg: 'items works' }));

module.exports = router;