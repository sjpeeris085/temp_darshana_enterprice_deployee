import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import cryptoRandomString from "crypto-random-string";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";
import decode from "jwt-decode";

// For working with Strings
//https://superchargejs.com/docs/3.x/strings#available-methods
//import Str from "@supercharge/strings";

import crypto from "crypto";

import MailGenerator from "../utill/MailGenerator.js";
import User from "../models/user.js";
import { USER_ROLE } from "../constants/constants.js";

export const signin = async (req, res) => {
  const { email, password } = req.body;
  try {
    const existingUser = await User.findOne({ email });
    if (!existingUser)
      return res.status(404).json({ message: "User doesn't exists." });

    const isPasswordCorrect = await bcrypt.compare(
      password,
      existingUser.password
    );
    if (!isPasswordCorrect)
      return res.status(400).json({ message: "Invalid Credentials" });

    if (!existingUser.is_email_verified)
      return res
        .status(400)
        .json({ message: "Email not verified", action: "email_verification" });

    const token = jwt.sign(
      { email: existingUser.email, id: existingUser._id },
      "secret_key_xyz",
      { expiresIn: "1h" }
    );

    res.status(200).json({ result: existingUser, token });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong." });
  }
};

export const signup = async (req, res) => {
  if (req.token)
    return res.status(201).json({
      message: `${req.result.role} has been successfuly signup`,
      data: req.emailer_info,
    });

  return res.status(500).json({
    message: "Something went wrong!",
    data: {},
  });
};

export const verifyEmail = async (req, res) => {
  const { verification_code, email } = req.body;

  try {
    const user = await User.findOne({
      email_verification_code: verification_code,
      email,
    });
    if (user) {
      if (user.is_email_verified)
        return res.status(200).json({
          message: "Email has already verified",
        });

      const updatedUser = await User.findByIdAndUpdate(
        user._id,
        { is_email_verified: true },
        { new: true }
      );
      if (!updatedUser)
        return res.status(500).json({ message: "Something went wrong." });

      // {new :true}  To receive updated version of the object
      return res.status(200).json({
        message: "Email has been verified successfully",
        data: updatedUser,
      });
    }
    return res.status(400).json({ message: "Invalid Verification Code" });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Something went wrong.", error: error.message });
  }
};

export const resetPassword = async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user)
      return res.status(200).json({
        message: "You will receive a email with password reset link.",
      });

    const n = crypto.randomInt(0, 1000000);
    const pass_reset_code = n.toString().padStart(6, "0");

    const result = await User.findByIdAndUpdate(
      user._id,
      { email_verification_code: pass_reset_code },
      { new: true }
    );

    const token = jwt.sign(
      { email: result.email, id: result._id },
      "secret_key_xyz",
      { expiresIn: "1h" }
    );

    if (!result)
      return res.status(500).json({ message: "Something went wrong." });

    sendMail(
      {
        id: pass_reset_code,
        email,
        name: user.name,
        code: `http://localhost/driving-penalty-web/client/driving-panalty/reset-password.php?token=${token}`,
      },
      "reset-psw",
      "You've receive Password reset code 👻",
      (info) => {
        res.status(200).json({ result: info });
      }
    );
  } catch (error) {
    res
      .status(500)
      .json({ message: "Something went wrong.", error: error.message });
  }
};

export const updatePasswordForReset = async (req, res) => {
  const { token, reset_code, new_password, confirm_password } = req.body;

  if (new_password !== confirm_password)
    return res.status(400).json({ message: "Password doesn't match." });

  const decodedToken = decode(token);
  // console.log(decodedToken);
  if (decodedToken.exp * 1000 < new Date().getTime())
    return res.status(400).json({
      message: "Password Rest link has been expired",
    });

  try {
    const user = await User.findOne({
      email: decodedToken.email,
      email_verification_code: reset_code,
    });
    if (!user)
      return res.status(400).json({
        message: "Invalid Reset Code, Try again",
      });

    const hashPassword = await bcrypt.hash(new_password, 12);

    const updatedUser = await User.findByIdAndUpdate(
      user._id,
      {
        password: hashPassword,
        email_verification_code: "",
      },
      { new: true }
    );
    if (!updatedUser)
      return res.status(500).json({ message: "Something went wrong." });

    sendMail(
      {
        id: updatedUser._id,
        email: user.email,
        name: user.name,
        code: new Date().toISOString(),
      },
      "update-psw-success",
      "Your have updated your password successfully 👻",
      (info) => {
        res.status(200).json({
          message: "Your have updated your password successfully",
          result: info,
        });
      }
    );
  } catch (error) {
    res
      .status(500)
      .json({ message: "Something went wrong.", error: error.message });
  }
};

export const updatePassword = async (req, res) => {
  const { token, current_password, new_password, confirm_password } = req.body;

  try {
    const decodedToken = decode(token);
    const userExists = await User.exists({ email: decodedToken.email });
    if (!userExists)
      return res.status(400).json({
        message: "Invalid Reset Code, Try again",
      });

    if (new_password !== confirm_password)
      return res
        .status(400)
        .json({ message: "Confirm Password doesn't match." });

    const user = await User.findOne({ email: decodedToken.email });

    const isPasswordCorrect = await bcrypt.compare(
      current_password,
      user.password
    );
    if (!isPasswordCorrect)
      return res.status(400).json({ message: "Current Password Not match" });

    const hashPassword = await bcrypt.hash(new_password, 12);

    const updatedUser = await User.findByIdAndUpdate(
      user._id,
      {
        password: hashPassword,
      },
      { new: true }
    );

    res.status(200).json({ message: "Password has been updated." });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Something went wrong.", error: error.message });
  }
};

// NOT A ROUTE
export const createUser = async (req, res, next) => {
  const { role, email, firstName, lastName } = req.body;
  switch (role) {
    case USER_ROLE.ADMIN:
    case USER_ROLE.EMPLOYEE:
      break;
    default:
      return res.status(400).json({ message: "Invalid Role provided." });
  }

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(400).json({ message: "User already exists" });

    const password = cryptoRandomString({ length: 7, type: "alphanumeric" });

    const hashPassword = await bcrypt.hash(password, 12);

    const n = crypto.randomInt(0, 1000000);
    const email_verification_code = n.toString().padStart(6, "0");

    const result = await User.create({
      email,
      role,
      password: hashPassword,
      name: `${firstName} ${lastName}`,
      email_verification_code,
    });

    const token = jwt.sign(
      { email: result.email, id: result._id },
      "secret_key_xyz",
      { expiresIn: "1h" }
    );

    /*
    sendMail(
      {
        id: result._id,
        email,
        name: firstName,
        code: result.email_verification_code,
      },
      "e-verify",
      "New Account has been created for your 👻",
      (info) => {
        // res.status(200).json({ result: info });
        req.emailer_info = info;
      }
    );
    */

    // Attach addition details to request
    req.result = result;
    req.token = token;
    next();
  } catch (error) {
    res
      .status(500)
      .json({ message: "Something went wrong.", error: error.message });
  }
};

async function sendMail(user, mailType, subject, callback) {
  /** Two things do before send emails:
       1. Enable Less secure app access 
          https://myaccount.google.com/lesssecureapps
          
       2.Allow access to your Google account   
          https://accounts.google.com/b/0/DisplayUnlockCaptcha
    */
  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    secure: true,
    auth: {
      user: "evergreen.group.lanka@gmail.com",
      pass: "fbhoxrflwwhmjysx",
    },
    tls: {
      rejectUnauthorized: false,
    },
  });

  let mailOptions = {
    from: "evergreen.group.lanka@gmail.com", // sender address
    to: user.email, // list of receivers
    subject: subject, // Subject line
    html: MailGenerator(user.id, user.name, user.code, mailType),
  };
  let mail_info = {
    message: "",
    info: {},
  };
  // send mail with defined transport object
  let info = await transporter.sendMail(mailOptions, (err, success) => {
    if (err) {
      mail_info.message = "Email didn't send due to error";
      mail_info.info = err;
      console.log("Email didn't send due to error");
      callback(mail_info);
    }
    if (success) {
      mail_info.message = "Email has been successfully send!";
      mail_info.info = success;
      //  console.log("Email has been successfully send!");
      // console.log(success);
      callback(mail_info);
    }
  });
  // callback(mail_info);
}
