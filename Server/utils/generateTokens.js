import jwt from "jsonwebtoken";
import UserRefreshTokenModel from "../models/UserRefreshToken.js";

const generateTokens = async (user) => {
  try {
    const payload = { _id: user._id, roles: user.roles };

    // Generate access token with expiration time (10 minutes)
    const accessToken = jwt.sign({ ...payload }, process.env.JWT_ACCESS_TOKEN_SECRET_KEY, { expiresIn: '10m' });

    // Generate refresh token with expiration time (5 days)
    const refreshToken = jwt.sign({ ...payload }, process.env.JWT_REFRESH_TOKEN_SECRET_KEY, { expiresIn: '5d' });

    // Delete or blacklist the old refresh token
    const userRefreshToken = await UserRefreshTokenModel.findOne({ userId: user._id });
    if (userRefreshToken) {
      userRefreshToken.blacklisted = true;
      await userRefreshToken.save();
    }

    // Save the new refresh token
    await new UserRefreshTokenModel({ userId: user._id, token: refreshToken }).save();

    return {
      accessToken,
      refreshToken,
      accessTokenExp: Date.now() + 1000 * 60 * 10, // Access token expiration time
      refreshTokenExp: Date.now() + 1000 * 60 * 60 * 24 * 5, // Refresh token expiration time
    };
  } catch (error) {
    console.error("Error generating tokens:", error);
    throw new Error("Error generating tokens");
  }
};

export default generateTokens;
