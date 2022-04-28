const jwtToken = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();
const secret_key = process.env.secret_key;

module.exports = (req, res, next) => {
  const authHeader = req.headers.authorization;
  const error = new Error();
  error.status = 403;
  if (authHeader) {
    const token = authHeader.split(" ")[1];
    if (token) {
      try {
        const user = jwtToken.verify(token, secret_key);
        req.user = user;
        return next();
      } catch (e) {
        error.message = "Invalid authorization";
        next(error);
      }
    } else {
      error.message = "Authorization should have value 'Bearer TOKEN' formate";
    }
  } else {
    error.message = "Authorization is not provided";
    next(error);
  }
};
