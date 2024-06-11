const orderDetailService = require('../services/order_detail.service');

exports.getAllOrderDetails = async (req, res) => {
  try {
    const orderDetails = await orderDetailService.getAllOrderDetails();
    res.status(200).json(orderDetails);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getOrderDetailById = async (req, res) => {
  try {
    const orderDetail = await orderDetailService.getOrderDetailById(req.params.id);
    if (orderDetail) {
      res.status(200).json(orderDetail);
    } else {
      res.status(404).json({ message: 'Order detail not found' });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.createOrderDetail = async (req, res) => {
  try {
    const newOrderDetail = await orderDetailService.createOrderDetail(req.body);
    res.status(201).json(newOrderDetail);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.createMultipleOrderDetails = async (req, res) => {
    try {
      const newOrderDetails = await orderDetailService.createMultipleOrderDetails(req.body);
      res.status(201).json(newOrderDetails);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };

exports.updateOrderDetail = async (req, res) => {
  try {
    const updatedOrderDetail = await orderDetailService.updateOrderDetail(req.params.id, req.body);
    if (updatedOrderDetail) {
      res.status(200).json(updatedOrderDetail);
    } else {
      res.status(404).json({ message: 'Order detail not found' });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.deleteOrderDetail = async (req, res) => {
  try {
    const deletedOrderDetail = await orderDetailService.deleteOrderDetail(req.params.id);
    if (deletedOrderDetail) {
      res.status(200).json(deletedOrderDetail);
    } else {
      res.status(404).json({ message: 'Order detail not found' });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
