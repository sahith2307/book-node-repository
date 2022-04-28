const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const Schema = mongoose.Schema;
const userSchema = new Schema({
  firstName: { type: String, required: true, min: 2, max: 100 },
  lastName: { type: String, required: true, min: 2, max: 100 },
  userName: { type: String, required: true, unique: true, min: 5, max: 36 },
  gender: {
    type: String,
    required: true,
    enum: ["MALE", "FEMALE", "OTHERS"],
  },
  email: {
    type: String,
    required: true,
    unique: true,
    min: 8,
    max: 100,
    validate: [emailValidate, "give a valid email formate"],
  },
  password: {
    type: String,
    required: true,
    unique: true,
    min: 8,
    max: 36,
    validate: [
      passwordValidate,
      " the password should contain one spacial character and one lower and upper case letters and one number and maximum 36 letters",
    ],
  },
  createdOn: { type: Date, required: true, default: Date.now },
});
///^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,36}$/
function passwordValidate (value) {
  return /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,36}$/.test(
    value
  );
};
function emailValidate (value) {
  return /^.+@.+\..+$/.test(value);
};
userSchema.pre("save", async function (next) {
  try {
    const salt = await bcrypt.genSalt(11);
    const hashed = await bcrypt.hash(this.password, salt);
    this.password = hashed;
    next();
  } catch (error) {
    next(error);
  }
});
userSchema.methods.isPasswordValid = async function (value) {
  try {
    return await bcrypt.compare(value, this.password);
  } catch (error) {
    throw new Error(error);
  }
};
module.exports = mongoose.model("users", userSchema);
