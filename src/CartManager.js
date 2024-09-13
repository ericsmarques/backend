const fs = require('fs');

class CartManager {
    constructor(path) {
        this.path = path;
        this.carts = [];
        this.loadCarts();
    }

    loadCarts() {
        try {
            if (fs.existsSync(this.path)) {
                const data = fs.readFileSync(this.path, 'utf-8');
                this.carts = JSON.parse(data);
            }
        } catch (err) {
            console.error("Erro ao carregar os carrinhos:", err);
        }
    }

    saveCarts() {
        try {
            fs.writeFileSync(this.path, JSON.stringify(this.carts, null, 2));
        } catch (err) {
            console.error("Erro ao salvar os carrinhos:", err);
        }
    }

    createCart() {
        const newCart = {
            id: this.carts.length + 1,
            products: []
        };
        this.carts.push(newCart);
        this.saveCarts();
        return newCart;
    }

    getCartById(id) {
        return this.carts.find(cart => cart.id === id);
    }

    addProductToCart(cartId, productId) {
        const cart = this.getCartById(cartId);
        if (cart) {
            const product = cart.products.find(p => p.id === productId);
            if (product) {
                product.quantity += 1;
            } else {
                cart.products.push({ id: productId, quantity: 1 });
            }
            this.saveCarts();
            return cart;
        } else {
            return null;
        }
    }
}

module.exports = CartManager;