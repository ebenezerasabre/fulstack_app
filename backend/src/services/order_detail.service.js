const orderDetailModel = require('../models/order_detail.model');

exports.getAllOrderDetails = async () => {
  try {
    return await orderDetailModel.getAllOrderDetails();
  } catch (err) {
    throw new Error(err);
  }
};

exports.getOrderDetailById = async (id) => {
  try {
    return await orderDetailModel.getOrderDetailById(id);
  } catch (err) {
    throw new Error(err);
  }
};

exports.createOrderDetail = async (orderDetailData) => {
  try {
    return await orderDetailModel.createOrderDetail(orderDetailData);
  } catch (err) {
    throw new Error(err);
  }
};

exports.createMultipleOrderDetails = async (orderDetailsData) => {
    try {
      return await orderDetailModel.createMultipleOrderDetails(orderDetailsData);
    } catch (err) {
      throw new Error(err);
    }
  };

exports.updateOrderDetail = async (id, orderDetailData) => {
  try {
    return await orderDetailModel.updateOrderDetail(id, orderDetailData);
  } catch (err) {
    throw new Error(err);
  }
};

exports.deleteOrderDetail = async (id) => {
  try {
    return await orderDetailModel.deleteOrderDetail(id);
  } catch (err) {
    throw new Error(err);
  }
};
