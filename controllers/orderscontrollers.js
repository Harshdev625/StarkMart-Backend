const Order = require("../models/Order");
exports.fetchOrderByUser = async (req, res) => {
    const {user}= req.query
  try {
    const orders = await Order.find({user:user}).populate('user').populate('product');
    res.status(200).json(orders);
  } catch (error) {
    res.status(400).json(error);
  }
};

exports.createOrder = async (req, res) => {
  const order = new Order(req.body);
  try {
    const response = await order.save();
    const result= await response.populate('product')
    console.log(result);
    res.status(201).json(result);
  } catch (error) {
    console.error(error);
    res.status(400).json(error);
  }
};

exports.deleteFromOrder = async (req, res) => {
    const { id } = req.params;
    try {
      const order = await Order.findByIdAndDelete(id);
      console.log(order);
      res.status(201).json(order);
    } catch (error) {
      console.error(error);
      res.status(400).json(error);
    }
  };

exports.updateOrder = async (req, res) => {
    const { id } = req.params;
    try {
      const order = await Order.findByIdAndUpdate(id,req.body,{new:true});
      console.log(order);
      res.status(200).json(order);
    } catch (error) {
      console.error(error);
      res.status(400).json(error);
    }
  };