const fs = require('fs');
const path = require('path');

class ProductManager {
    constructor() {
        this.path = path.join(__dirname, '../../data/products.json');
        this.currentId = 1;
        this.products = [];
        this.loadProducts();
    }

    loadProducts() {
        try {
            if (fs.existsSync(this.path)) {
                const data = fs.readFileSync(this.path, 'utf-8');
                this.products = JSON.parse(data);

                if (this.products.length > 0) {
                    this.currentId = this.products[this.products.length - 1].id + 1;
                }
            } else {
                console.log("Arquivo não encontrado."); // Mensagem de erro para depuração
            }
        } catch (err) {
            console.error("Erro ao carregar os produtos:", err);
        }
    }

    saveProducts() {
        try {
            fs.writeFileSync(this.path, JSON.stringify(this.products, null, 2));
        } catch (err) {
            console.error("Erro ao salvar os produtos:", err);
        }
    }

    addProduct(product) {
        const newProduct = {
            id: this.products.length + 1,
            status: true,
            ...product
        };
        this.products.push(newProduct);
        this.saveProducts();
        return newProduct;
    }

    getProductById(id) {
        return this.products.find(product => product.id === id);
    }

    updateProduct(id, updatedProduct) {
        const index = this.products.findIndex(product => product.id === id);
        if (index !== -1) {
            this.products[index] = { ...this.products[index], ...updatedProduct };
            this.saveProducts();
            return this.products[index];
        } else {
            return null;
        }
    }

    deleteProduct(id) {
        const index = this.products.findIndex(product => product.id === id);
        if (index !== -1) {
            const deletedProduct = this.products.splice(index, 1);
            this.saveProducts();
            return deletedProduct[0];
        } else {
            return null;
        }
    }

    getProducts(limit) {
        return limit ? this.products.slice(0, limit) : this.products;
    }
}

module.exports = ProductManager;