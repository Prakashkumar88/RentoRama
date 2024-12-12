import cloudinary from '../config/cloudinary.js';

const uploadToCloudinary = async (file) => {
  try {
    const result = await cloudinary.uploader.upload(file.tempFilePath, {
      folder: process.env.CLOUDINARY_FOLDER_NAME || 'default_folder',
    });
    return result.secure_url;
  } catch (error) {
    throw new Error('Cloudinary upload failed');
  }
};

export default uploadToCloudinary;
