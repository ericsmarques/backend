const express = require('express');
const ProductManager = require('../ProductManager');

const router = express.Router();
const productManager = new ProductManager('./src/data/products.json');

router.get('/', (req, res) => {
    const limit = parseInt(req.query.limit);
    const products = productManager.getProducts(limit);
    res.json(products);
});

router.get('/:pid', (req, res) => {
    const product = productManager.getProductById(parseInt(req.params.pid));
    if (product) {
        res.json(product);
    } else {
        res.status(404).json({ error: "Produto não encontrado" });
    }
});

router.post('/', (req, res) => {
    const product = req.body;
    const newProduct = productManager.addProduct(product);
    res.status(201).json(newProduct);
});

router.put('/:pid', (req, res) => {
    const updatedProduct = req.body;
    const product = productManager.updateProduct(parseInt(req.params.pid), updatedProduct);
    if (product) {
        res.json(product);
    } else {
        res.status(404).json({ error: "Produto não encontrado" });
    }
});

router.delete('/:pid', (req, res) => {
    const product = productManager.deleteProduct(parseInt(req.params.pid));
    if (product) {
        res.json(product);
    } else {
        res.status(404).json({ error: "Produto não encontrado" });
    }
});

module.exports = router;