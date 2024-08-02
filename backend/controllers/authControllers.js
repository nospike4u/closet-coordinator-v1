import asyncHandler from 'express-async-handler';
import ErrorResponse from '../utils/ErrorResponse.js';
import User from '../models/usersModel.js';
import bcrypt from 'bcryptjs';
import { generateToken } from '../utils/auth.js';

export const login = asyncHandler(async (req, res, next) => {
  const {
    body: { email, password, rememberMe },
  } = req;

  if (!email || !password) {
    return next(new ErrorResponse('invalid input!', 400));
  }

  const data = await User.findOne({ email });
  if (!data || !bcrypt.compareSync(password, data.password)) {
    return next(new ErrorResponse('invalid input!', 400));
  }

  const user = { rememberMe, id: data._id, role: data.role };
  const token = generateToken(user);

  res.status(200).json({ success: true, data: token });
});

export const logout = asyncHandler(async (req, res, next) => {
  res
    .status(201)
    .json({ success: true, data: { message: `Logout successful` } });
});
