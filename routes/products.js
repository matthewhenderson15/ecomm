const express = require('express');
const productsRepo = require('../repositories/products');
const productsIndexTemplace = require('../views/products/index');

const router = express.Router();

router.get('/', async (req, res) => {
    const products = await productsRepo.getAll();
    res.send(productsIndexTemplace({ products }));
});

module.exports = router;