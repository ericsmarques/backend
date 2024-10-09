const Cart = require('../models/cartModel');

class CartManager {
  async create() {
    return await Cart.create({ products: [] });
  }

  async getById(id) {
    return await Cart.findById(id).populate('products.productId');
  }

  async addProductToCart(cartId, productId) {
    const cart = await Cart.findById(cartId);
    const productIndex = cart.products.findIndex(p => p.productId.equals(productId));

    if (productIndex > -1) {
      cart.products[productIndex].quantity += 1;
    } else {
      cart.products.push({ productId, quantity: 1 });
    }

    return await cart.save();
  }
}

module.exports = CartManager;
