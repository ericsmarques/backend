const express = require('express');
const CartManager = require('../CartManager');

const router = express.Router();
const cartManager = new CartManager('./src/data/carts.json');

router.post('/', (req, res) => {
    const newCart = cartManager.createCart();
    res.status(201).json(newCart);
});

router.get('/:cid', (req, res) => {
    const cart = cartManager.getCartById(parseInt(req.params.cid));
    if (cart) {
        res.json(cart);
    } else {
        res.status(404).json({ error: "Carrinho não encontrado" });
    }
});

router.post('/:cid/product/:pid', (req, res) => {
    const cart = cartManager.addProductToCart(parseInt(req.params.cid), parseInt(req.params.pid));
    if (cart) {
        res.json(cart);
    } else {
        res.status(404).json({ error: "Carrinho ou produto não encontrado" });
    }
});

module.exports = router;