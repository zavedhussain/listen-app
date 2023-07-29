const jwt = require("jsonwebtoken");
const { UnauthenticatedError } = require("../errors");

const authMiddleware = async (req, res, next) => {
  //   console.log(req.headers.authorization);

  //check header
  const authHeader = req.headers.authorization;

  //if header does not have token
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    throw new UnauthenticatedError("Authentication invalid");
  }

  const token = authHeader.split(" ")[1];

  //get payload and verify id
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    const { userId, name } = payload;
    //attach the user to job routes
    req.user = { userId, name };
    next();
  } catch (error) {
    throw new UnauthenticatedError("Authentication invalid");
  }
};

module.exports = authMiddleware;
