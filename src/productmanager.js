const fs = require('fs');

class ProductManager {
    constructor(path) {
        this.path = path;
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

    addProduct({ title, description, price, thumbnail, code, stock }) {
        if (!title || !description || !price || !thumbnail || !code || !stock) {
            console.log("Erro: Por gentileza, preencher todos os campos. Eles são obrigatórios.");
            return;
        }

        const codeExists = this.products.some(product => product.code === code);
        if (codeExists) {
            console.log("Erro: Este produto já existe no estoque.");
            return;
        }

        const newProduct = {
            id: this.currentId++,
            title,
            description,
            price,
            thumbnail,
            code,
            stock
        };

        this.products.push(newProduct);
        this.saveProducts();
        console.log("Produto adicionado ao estoque:", newProduct);
    }

    getProducts() {
        this.loadProducts();
        return this.products;
    }

    getProductById(id) {
        this.loadProducts();
        const product = this.products.find(product => product.id === id);
        if (product) {
            console.log("Produto encontrado no estoque:", product);
            return product;
        } else {
            console.log("Erro: Este produto não se encontra no estoque.");
            return null;
        }
    }

    updateProduct(id, updatedProduct) {
        this.loadProducts();
        const index = this.products.findIndex(product => product.id === id);
        if (index !== -1) {
            this.products[index] = { ...this.products[index], ...updatedProduct, id };
            this.saveProducts();
            console.log("Produto atualizado com sucesso:", this.products[index]);
        } else {
            console.log("Erro: Produto não encontrado para atualização.");
        }
    }

    deleteProduct(id) {
        this.loadProducts();
        const index = this.products.findIndex(product => product.id === id);
        if (index !== -1) {
            const deletedProduct = this.products.splice(index, 1);
            this.saveProducts();
            console.log("Produto removido do estoque:", deletedProduct[0]);
        } else {
            console.log("Erro: Produto não encontrado para exclusão.");
        }
    }
}

module.exports = ProductManager;