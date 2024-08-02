import asyncHandler from '../utils/asyncHandler.js';

export const getAllImages = asyncHandler(async (req, res) => {
  res.status(200).json({ success: true, data: 'all images' });
});
