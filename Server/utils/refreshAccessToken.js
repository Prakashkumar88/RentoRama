import UserModel from "../models/User.js";
import UserRefreshTokenModel from "../models/UserRefreshToken.js";
import generateTokens from "./generateTokens.js";
import verifyRefreshToken from "./verifyRefreshToken.js";

const refreshAccessToken = async (req) => {
  try {
    const oldRefreshToken = req.cookies.refreshToken;

    const { tokenDetails, error } = await verifyRefreshToken(oldRefreshToken);
    if (error) {
      return { error: "Invalid refresh token" };
    }

    const user = await UserModel.findById(tokenDetails._id);
    if (!user) {
      return { error: "User not found" };
    }

    const userRefreshToken = await UserRefreshTokenModel.findOne({ userId: tokenDetails._id });
    if (!userRefreshToken || oldRefreshToken !== userRefreshToken.token || userRefreshToken.blacklisted) {
      return { error: "Unauthorized access" };
    }

    const { accessToken, refreshToken, accessTokenExp, refreshTokenExp } = await generateTokens(user);
    return {
      newAccessToken: accessToken,
      newRefreshToken: refreshToken,
      newAccessTokenExp: accessTokenExp,
      newRefreshTokenExp: refreshTokenExp,
    };
  } catch (error) {
    console.error("Error refreshing access token:", error);
    return { error: "Internal server error" };
  }
};


export default refreshAccessToken;
