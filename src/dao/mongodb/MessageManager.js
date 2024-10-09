const Message = require('../models/messageModel');

class MessageManager {
  async getAll() {
    return await Message.find({});
  }

  async create(messageData) {
    return await Message.create(messageData);
  }
}

module.exports = MessageManager;
