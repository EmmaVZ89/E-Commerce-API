const User = require("../models/User");
const { StatusCodes } = require("http-status-codes");
const CustomError = require("../errors");
const { attachCookiesToResponse } = require("../utils");

const register = async (req, res) => {
  const { email, name, password } = req.body;

  // seach if exists email
  const emailAlreadyExists = await User.findOne({ email });
  if (emailAlreadyExists) {
    throw new CustomError.BadRequestError("Email already exists");
  }

  // first registered user is an admin
  const isFirstAccount = (await User.countDocuments({})) === 0;
  const role = isFirstAccount ? "admin" : "user";

  // create user
  const user = await User.create({ name, email, password, role });

  // jwt and cookies
  const tokenUser = { name: user.name, userId: user.id, role: user.role };
  attachCookiesToResponse({res, user:tokenUser});

  res.status(StatusCodes.CREATED).json({ user: tokenUser });
};

const login = async (req, res) => {
  res.send("login user");
};

const logout = async (req, res) => {
  res.send("logout user");
};

module.exports = {
  register,
  login,
  logout,
};
