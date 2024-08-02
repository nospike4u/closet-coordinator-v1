import asyncHandler from 'express-async-handler';
import ErrorResponse from '../utils/ErrorResponse.js';
import User from '../models/usersModel.js';

export const getAllUsers = asyncHandler(async (req, res, next) => {
  const data = await User.find().select('-password -role');
  if (!data) {
    return next(new ErrorResponse(`Server error`, 500));
  }
  res.status(200).json({ success: true, data });
});

export const getUser = asyncHandler(async (req, res, next) => {
  const {
    params: { id },
  } = req;
  if (!id) {
    return next(new ErrorResponse(`Invalid input`, 400));
  }
  const data = await User.findById(id).select('-password -role');
  if (!data) {
    return next(new ErrorResponse(`User not found`, 404));
  }
  res.status(200).json({ success: true, data });
});

export const createUser = asyncHandler(async (req, res, next) => {
  const { body } = req;

  if (!body.userName || !body.email || !body.password) {
    return next(new ErrorResponse('invalid input!', 400));
  }

  const data = await User.create(req.body);
  if (!data) {
    return next(new ErrorResponse('Server Error!', 500));
  }
  const { password, ...rest } = data._doc;
  res.status(201).json({ success: true, data: rest });
});

export const updateUser = asyncHandler(async (req, res) => {
  const {
    body,
    params: { id },
  } = req;

  if (!body.userName || !body.email || !body.password) {
    return next(new ErrorResponse('Invalid input!', 400));
  }

  const data = await User.findByIdAndUpdate(id, body, {
    new: true,
    runValidators: true,
  });

  if (!data) {
    return next(new ErrorResponse('User not found!', 404));
  }

  res.status(200).json({ success: true, data });
});

export const deleteUser = asyncHandler(async (req, res) => {
  const {
    params: { id },
  } = req;

  if (!id) {
    return next(new ErrorResponse('Invalid input!', 400));
  }

  const data = await User.findByIdAndDelete(id);

  if (!data) {
    return next(new ErrorResponse('User not found!', 404));
  }
  res
    .status(200)
    .json({ success: true, data: { message: 'user was deleted!' } });
});
