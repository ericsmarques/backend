const express = require('express');
const ProductManager = require('./productmanager');

const app = express();
const PORT = 3000;

const productManager = new ProductManager('src/products.json');

app.get('/products', async (req, res) => {
    try {
        const limit = parseInt(req.query.limit, 10);
        const products = await productManager.getProducts();

        if (!isNaN(limit) && limit > 0) {
            return res.json(products.slice(0, limit));
        }

        res.json(products);
    } catch (err) {
        res.status(500).json({ error: 'Erro ao buscar os produtos.' });
    }
});

app.get('/products/:pid', async (req, res) => {
    try {
        const pid = parseInt(req.params.pid, 10);
        const product = await productManager.getProductById(pid);

        if (product) {
            res.json(product);
        } else {
            res.status(404).json({ error: 'Produto não encontrado.' });
        }
    } catch (err) {
        res.status(500).json({ error: 'Erro ao buscar o produto.' });
    }
});

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});