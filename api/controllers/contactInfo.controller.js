const ContactInfo = require("../models/contactInfo.model");
const User = require("../models/user.model");

async function getAllContactInfo(req, res) {
  try {
    const contactInfo = await ContactInfo.findAll();
    return res.status(200).json(contactInfo);
  } catch (error) {
    res.status(500).send(error.message);
  }
}

async function getOneContactInfo(req, res) {
  try {
    const contactInfo = await ContactInfo.findByPk(req.params.contactInfo_id);
    if (contactInfo) {
      return res.status(200).json(contactInfo);
    } else {
      return res.status(404).send("ContactInfo not found");
    }
  } catch (error) {
    res.status(200).send(error.message);
  }
}

async function createContactInfo(req, res) {
  try {
    const contactInfo = await ContactInfo.create(req.body);
    return res.status(200).json({
      message: "ContactInfo created",
      contactInfo: contactInfo,
    });
  } catch (error) {
    res.status(500).send(error.message);
  }
}

async function updateContactInfo(req, res) {
  try {
    const [contactInfoExist, contactInfo] = await ContactInfo.update(req.body, {
      returning: true,
      where: {
        id: req.params.contactInfo_id,
      },
    });
    if (contactInfoExist !== 0) {
      return res.status(200).json({
        message: "contactInfo updated",
        contactInfo: contactInfo,
      });
    } else {
      return res.status(404).send("ContactInfo not found");
    }
  } catch (error) {
    return res.status(500).send(error.message);
  }
}

async function deleteContactInfo(req, res) {
  try {
    const contactInfo = await ContactInfo.destroy({
      where: {
        id: req.params.contactInfo_id,
      },
    });
    if (contactInfo) {
      return res.status(200).json("ContactInfo deleted");
    } else {
      return res.status(404).send("ContactInfo not found");
    }
  } catch (error) {
    return res.status(500).send(error.message);
  }
}

module.exports = {
  getAllContactInfo,
  getOneContactInfo,
  createContactInfo,
  updateContactInfo,
  deleteContactInfo,
};
