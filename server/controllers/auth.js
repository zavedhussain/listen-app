const { UnauthenticatedError, BadRequestError } = require("../errors");
const User = require("../models/User");
const { StatusCodes } = require("http-status-codes");

const registerUser = async (req, res, next) => {
  //Using mongoose validation
  const { email, name, password } = req.body;
  if (!email || !name || !password) {
    throw new BadRequestError("Please provide valid email,name and password");
  }

  //pre hook in schema hashes password before saving
  const user = await User.create({ ...req.body });

  //create jwt token using method defined in schema
  const token = user.createJWT();
  res.status(StatusCodes.CREATED).json({ user: { name: user.name }, token });
};

const authenticateUser = async (req, res, next) => {
  const { email, password } = req.body;

  //empty values
  if (!email || !password) {
    throw new BadRequestError("Please provide valid email and password");
  }

  //check if email matches
  const user = await User.findOne({ email: email }).exec();
  if (!user) {
    throw new UnauthenticatedError("Invalid Credentials");
  }

  //compare password using method defined in schema
  const isPasswordCorrect = await user.comparePassword(password);
  if (!isPasswordCorrect) {
    throw new UnauthenticatedError("Invalid Credentials");
  }

  //create JWT and send resp
  const token = user.createJWT();
  res.status(StatusCodes.OK).json({ user: { name: user.name }, token });
};

module.exports = {
  registerUser,
  authenticateUser,
};
