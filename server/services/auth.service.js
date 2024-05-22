const { User } = require("../models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const CustomError = require("../libs/error");

const { profile } =require('passport-google-oauth20');

exports.findOrCreateUser = async (payload) => {
  console.log("Payload Body");
  const [user] = await User.findOrCreate({
    where: { email: profile.emails[0].value },
    defaults: { name: profile.displayName },
  });
  return user;
};

exports.signup = async (payload) => {
  try {
    const {full_name,  email, password, confirm_passwword} =
      payload.body;
    const isUserExists = await User.findOne({ where: { email: email } });
    console.log("Payllooofdff..BBBBOOODDDY", payload.body);
    if (isUserExists) {
      throw new  CustomError("User All ready signedup",409)
    }
    if (!(password === confirm_passwword)) {
      throw new CustomError(
        "password and confirm password does  not match",
        408
      );
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      full_name: full_name,
      email: email,
      password: hashedPassword,
      
    });
    return user;
  } catch (error) {
    throw error;
  }
};
exports.login = async (payload) => {
  try {
    const { email, password } = payload.body;
    console.log("payload..", payload.body);

    if (!email && !password) {
      throw new CustomError("User credentials not found", 422);
    }
    const user = await User.findOne({ where: { email: email } });
    if (!user) {
      throw new CustomError("User doesn't exist", 404);
    }
    console.log("Login Userjsdgdfo", user);
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      console.log("Password is not matched");
      throw new CustomError("User password is wrong", 401);
    }
    if (isValidPassword) {
      var token = jwt.sign(
        { email: user.email, id: user._id, role: user.role },
        process.env.JWT_SECRET,
        {
          expiresIn: "24h",
        }
      );
    }
    console.log("usser--=>", user.password);
    if (!token) {
      throw new CustomError("Token not generating", 500);
    }
    console.log("token---->", token);
    console.log("LoginSuccesssssss");
    user.token = token;
    user.password = undefined;
    return { user, token };
  } catch (error) {
    throw error;
  }
};
exports.getAllUser = async (payload) => {
  try {
    const allUsers = await users.findAll();
    console.log("users");
    return allUsers;
  } catch (error) {
    throw error;
  }
};
