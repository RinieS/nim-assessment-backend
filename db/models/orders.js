const mongoose = require("../db.js");
const { MenuItems } = require("./menuItems.js");

const orderSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true
  },
  items: [
    {
      item: {
        type: mongoose.Schema.ObjectId,
        ref: "MenuItems"
      },

      quantity: {
        type: Number,
        required: true
      }
    }
  ],
  status: {
    type: String,
    required: true,
    enum: ["pending", "confirmed", "delivered", "cancelled"],
    default: "pending"
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});
orderSchema.set("toJSON", {
  virtuals: true
});
orderSchema.statics.calcTotal = async (items) =>
  items.reduce(async (total, item) => {
    const menuItem = await MenuItems.findById(item.item);
    return (await total) + menuItem.price * item.quantity;
  }, Promise.resolve(0));

// order model
const Order = mongoose.model("Order", orderSchema);

const getAll = async () => {
  // populate each item
  const orders = await Order.find().populate("items.item");

  return orders;
};

const getOne = async (id) => {
  const order = await Order.findById(id).populate("items.item");
  return order;
};

const create = async (body) => {
  const order = await Order.create(body);
  return order;
};

const update = async (id, body) => {
  const order = await Order.findByIdAndUpdate(id, body, { new: true });
  return order;
};

const remove = async (id) => {
  const order = await Order.findByIdAndDelete(id);
  return order.id;
};

// task 2b
const getByStatus = async (s) => {
  const orders = await Order.find({ status: s }).populate("items.item");
 
  return orders;
};

// task 2a
const getTotalSales = async () => {
  const orders = await Order.find({ status: { $ne: "cancelled" } }).populate(
    "items.item"
  );

  const totalSales = await orders.reduce(
    async (total, order) =>
      (await total) + (await Order.calcTotal(order.items)),
    Promise.resolve(0)
  );
  return totalSales.toFixed(2);
};

module.exports = {
  getAll,
  getOne,
  create,
  update,
  remove,
  getByStatus,
  getTotalSales,
  Order
};
