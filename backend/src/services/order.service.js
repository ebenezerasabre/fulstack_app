const orderModel = require('../models/order.model');

exports.getAllOrders = async () => {
  try {
    return await orderModel.getAllOrders();
  } catch (err) {
    throw new Error(err);
  }
};

exports.getOrderById = async (id) => {
  try {
    return await orderModel.getOrderById(id);
  } catch (err) {
    throw new Error(err);
  }
};

exports.createOrder = async (orderData) => {
  try {
    return await orderModel.createOrder(orderData);
  } catch (err) {
    throw new Error(err);
  }
};

exports.updateOrder = async (id, orderData) => {
  try {
    return await orderModel.updateOrder(id, orderData);
  } catch (err) {
    throw new Error(err);
  }
};

exports.deleteOrder = async (id) => {
  try {
    return await orderModel.deleteOrder(id);
  } catch (err) {
    throw new Error(err);
  }
};
