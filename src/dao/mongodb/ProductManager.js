const Product = require('../models/productModel');

class ProductManager {
  async getAll() {
    return await Product.find({});
  }

  async getById(id) {
    return await Product.findById(id);
  }

  async create(productData) {
    return await Product.create(productData);
  }

  async update(id, updatedData) {
    return await Product.findByIdAndUpdate(id, updatedData, { new: true });
  }

  async delete(id) {
    return await Product.findByIdAndDelete(id);
  }
}

module.exports = ProductManager;
