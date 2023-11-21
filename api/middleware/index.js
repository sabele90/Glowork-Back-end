const jwt = require("jsonwebtoken");
const User = require("../models/user.model");
const Company = require("../models/company.model");

function checkAuthCompany(req, res, next) {
  if (!req.headers.authorization) {
    console.log("Token not found");
    return res.status(401).send("Token not found");
  }

  jwt.verify(
    req.headers.authorization,
    process.env.SECRET,
    async (err, result) => {
      if (err) {
        console.log("Token not valid");
        return res.status(401).send("Token not valid");
      }
      const user = await User.findOne({
        where: {
          email: result.email,
        },
      });
      const company = await Company.findOne({
        where: {
          email: result.email,
        },
      });

      console.log("Company:", company);

      const model = user || company;

      if (company) {
        res.locals.company = model;
      } else {
        res.locals.user = model;
      }
      next();
    }
  );
}

function checkAuthUser(req, res, next) {
  if (!req.headers.authorization)
    return res.status(401).send("Token not found");

  jwt.verify(
    req.headers.authorization,
    process.env.SECRET,
    async (err, result) => {
      if (err) return res.status(401).send("Token not valid");

      const user = await User.findOne({
        where: {
          email: result.email,
        },
      });

      if (!user) return res.status(401).send("User not found");

      res.locals.user = user;
      next();
    }
  );
}

function checkAdminCompanyOrUser(req, res, next) {
  const company = res.locals.company;
  const user = res.locals.user;

  if (company || (user && user.role === "admin")) {
    next();
  } else {
    return res.status(401).send("User not authorized");
  }
}

function checkEmail(req, res, next) {
  const regexp =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  if (!regexp.test(req.body.email)) {
    return res.status(401).send("checkEmail: Email not Valid");
  } else {
    next();
  }
}

function checkPassword(req, res, next) {
  const password = req.body.password;

  console.log("Received password:", password);

  if (
    password.length < 8 ||
    !password.match(
      /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%^&*()_+\-={}|;:",.<>/?]).{8,}$/
    )
  ) {
    console.log("Invalid password");
    return res.status(400).send("Your password is invalid");
  }

  next();
}

module.exports = {
  checkAdminCompanyOrUser,
  checkAuthCompany,
  checkAuthUser,
  checkEmail,
  checkPassword,
};
