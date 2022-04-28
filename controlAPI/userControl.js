const userSchema = require("../Schemas/userSchema");
const dotenv = require("dotenv");
const jwtToken = require("jsonwebtoken");
dotenv.config();
const secret_key = process.env.secret_key;
exports.signup = async (req, res, next) => {
  const { firstName, lastName, userName, gender, email, password } = req.body;
  console.log("object");
  const findUserName = await userSchema.findOne({ userName });
  if (findUserName)
    return res.status(403).json({ message: "userName is already exists" });
  const findUser = await userSchema.findOne({ email });
  console.log(findUser);
  if (findUser)
    return res.status(403).json({ message: "Email is already exists" });
  const newUserBody = {
    firstName,
    lastName,
    userName,
    gender,
    email,
    password,
  };
  const newUser = new userSchema(newUserBody);
  try {
    await newUser.save();
    res.status(200).json({ success: "successfully registered" });
  } catch (error) {
    error.status = 400;
    next(error);
  }
};

exports.signin = async (req, res) => {
  const { userName, password } = req.body;
  const findUser = await userSchema.findOne({ userName });
  if (!findUser) return res.status(403).json({ message: "Invalid userName" });
  const isValidPass = await findUser.isPasswordValid(password);
  if (!isValidPass)
    return res.status(403).json({ error: { message: "invalid password" } });
  const token = getTheToken(findUser);
  res.status(200).json({ token });
};

getTheToken = (user) => {
  return jwtToken.sign(
    {
      id: user._id,
      userName: user.userName,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
    },
    secret_key,
    { expiresIn: "12h" }
  );
};
