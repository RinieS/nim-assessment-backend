const MenuItems = require("../db/models/menuItems.js");

const getAll = async (req, res) => {
  try {
    const menu = await MenuItems.getAll();
    res.send(menu);
  } catch (error) {
    res.status(500).send(error);
  }
};

const getOne = async (req, res) => {
  try {
    const menu = await MenuItems.getOne(req.params.id);
    res.send(menu);
  } catch (error) {
    res.status(500).send(error);
  }
};

const create = async (req, res) => {
  try {
    const menu = await MenuItems.create(req.body);
    res.send(menu);
  } catch (error) {
    res.status(500).send(error);
  }
};

// task 1a

const update = async (req, res) => {
  try {
    const menu = await MenuItems.update(req.params.id, req.body);
    res.send(menu);
  } catch (error) {
    res.status(500).send(error);
  }
};

// task 1b

const remove = async (req, res) => {
  try {
    const menu = await MenuItems.remove(req.params.id);
    res.send(menu);
  } catch (error) {
    res.status(500).send(error);
  }
};

// task 1c

const getByNameOrDescription = async (req, res) => {
  try {
    const menu = await MenuItems.getByNameOrDescription(req.query.q);
    res.send(menu);
  } catch (error) {
    res.status(500).send(error);
  }
};
module.exports = {
  getAll,
  getOne,
  create,
  update,
  remove,
  getByNameOrDescription
};
