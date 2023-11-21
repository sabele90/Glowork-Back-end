const ContactInfo = require("../models/contactInfo.model");
const User = require("../models/user.model");

async function getUserContactInfo(req, res) {
  try {
    const user = await User.findOne({
      where: {
        id: req.params.user_id,
      },
      include: ContactInfo,
    });

    const contactInfo = await user.getContact_info();

    return res.status(200).json({ user, contactInfo });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "Error al obtener la información de contacto del usuario",
    });
  }
}

async function getAllUser(req, res) {
  try {
    const user = await User.findAll();
    return res.status(200).json(user);
  } catch (error) {
    res.status(500).send(error.message);
  }
}

async function getOneUser(req, res) {
  try {
    const user = await User.findByPk(req.params.user_id);
    if (user) {
      return res.status(200).json(user);
    } else {
      return res.status(404).json({ error: "User not found" });
    }
  } catch (error) {
    return res.status(500).send(error.message);
  }
}

async function createUser(req, res) {
  try {
    const user = await User.create(req.body);
    return res.status(200).json({
      message: "User created",
      user: user,
    });
  } catch (error) {
    res.status(500).send(error.message);
  }
}

async function updateUser(req, res) {
  try {
    const [userExist, user] = await User.update(req.body, {
      returning: true,
      where: {
        id: req.params.user_id,
      },
    });
    if (userExist !== 0) {
      return res.status(200).json({
        message: "User updated",
        user: user,
      });
    } else {
      return res.status(404).send("User not found");
    }
  } catch (error) {
    return res.status(500).send(error.message);
  }
}

async function deleteUser(req, res) {
  try {
    const user = await User.destroy({
      where: {
        id: req.params.user_id,
      },
    });
    if (user) {
      return res.status(200).json("User deleted");
    } else {
      return res.status(404).send("User not found");
    }
  } catch (error) {
    return res.status(500).send(error.message);
  }
}

module.exports = {
  getUserContactInfo,
  getAllUser,
  getOneUser,
  createUser,
  updateUser,
  deleteUser,
};
