const Order = require("../models/Order");
const Product = require("../models/Product");

// Create new order
exports.createOrder = async (req, res) => {
  try {
    const { items, shippingAddress, paymentDetails, totalAmount } = req.body;

    if (!items || items.length === 0) {
      return res.status(400).json({ message: "No hay items en la orden" });
    }

    // Verify stock and update it
    for (const item of items) {
      const product = await Product.findById(item._id);
      if (!product) {
        return res
          .status(404)
          .json({ message: `Producto ${item._id} no encontrado` });
      }
      if (product.stock < item.quantity) {
        return res
          .status(400)
          .json({ message: `Stock insuficiente para ${product.name}` });
      }
      product.stock -= item.quantity;
      await product.save();
    }

    // Format items for order
    const orderItems = items.map((item) => ({
      product: item._id,
      name: item.name,
      quantity: item.quantity,
      price: item.price,
    }));

    const order = new Order({
      user: req.user._id,
      items: orderItems,
      shippingAddress,
      paymentDetails,
      totalAmount,
    });

    const createdOrder = await order.save();

    // Populate product details for the response
    await createdOrder.populate("items.product", "name price image");

    res.status(201).json(createdOrder);
  } catch (error) {
    console.error("Error al crear orden:", error);
    res.status(500).json({
      message: "Error al crear orden",
      error: error.message,
    });
  }
};

// Get order by ID
exports.getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id)
      .populate("user", "name email")
      .populate("items.product", "name price image");

    if (order) {
      res.json(order);
    } else {
      res.status(404).json({ message: "Orden no encontrada" });
    }
  } catch (error) {
    res.status(500).json({
      message: "Error al obtener orden",
      error: error.message,
    });
  }
};

// Get logged in user orders
exports.getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id })
      .populate("items.product", "name price image")
      .sort("-createdAt");
    res.json(orders);
  } catch (error) {
    res.status(500).json({
      message: "Error al obtener órdenes",
      error: error.message,
    });
  }
};

// Get all orders (admin)
exports.getOrders = async (req, res) => {
  try {
    const orders = await Order.find({})
      .populate("user", "id name email")
      .populate("items.product", "name price image")
      .sort("-createdAt");
    res.json(orders);
  } catch (error) {
    res.status(500).json({
      message: "Error al obtener órdenes",
      error: error.message,
    });
  }
};

// Update order status (admin)
exports.updateOrderStatus = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);

    if (order) {
      order.status = req.body.status;
      const updatedOrder = await order.save();
      res.json(updatedOrder);
    } else {
      res.status(404).json({ message: "Orden no encontrada" });
    }
  } catch (error) {
    res.status(500).json({
      message: "Error al actualizar orden",
      error: error.message,
    });
  }
};
