const Company = require("../models/company.model");
const User = require("../models/user.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

async function login(req, res) {
  const { email, password } = req.body;

  try {
    // Check if the email exists in either User or Company
    const user = await User.findOne({ where: { email } });
    const company = await Company.findOne({ where: { email } });

    if (!user && !company) {
      return res.status(404).json("Error: Email incorrect");
    }

    // Choose the appropriate model based on whether the user or company was found
    const model = user || company;

    const comparePass = bcrypt.compareSync(password, model.password);

    if (comparePass) {
      const payload = {
        email: model.email,
        role: model.role,
      };

      const token = jwt.sign(payload, process.env.SECRET, {
        expiresIn: "1h",
      });

      return res.status(200).json({
        token,
        role: model.role,
      });
    } else {
      return res.status(404).json("Error: Email or Password incorrect");
    }
  } catch (error) {
    return res.status(500).send(error.message);
  }
}

async function signUpCompany(req, res) {
  const saltRounds = bcrypt.genSaltSync(parseInt(process.env.SALTROUNDS));
  const hashedPassword = bcrypt.hashSync(req.body.password, saltRounds); // Hash the original password with the number we have provided.

  req.body.password = hashedPassword; // update the body's password with the hased password

  try {
    const company = await Company.create(req.body); // create the user with the hashed password
    const payload = {
      email: company.email,
    };

    const token = jwt.sign(payload, process.env.SECRET, {
      expiresIn: "1h",
    });
    return res.status(200).json({
      token,
    });
  } catch (error) {
    return res.status(500).send(error.message);
  }
}

async function signUpUser(req, res) {
  const saltRounds = bcrypt.genSaltSync(parseInt(process.env.SALTROUNDS));
  const hashedPassword = bcrypt.hashSync(req.body.password, saltRounds); // Hash the original password with the number we have provided.

  req.body.password = hashedPassword; // update the body's password with the hased password

  try {
    const user = await User.create(req.body); // create the user with the hashed password
    const payload = {
      email: user.email,
    };

    const token = jwt.sign(payload, process.env.SECRET, {
      expiresIn: "1h",
    });
    return res.status(200).json({
      token,
    });
  } catch (error) {
    return res.status(500).send(error.message);
  }
}

module.exports = {
  login,
  signUpCompany,
  signUpUser,
};
