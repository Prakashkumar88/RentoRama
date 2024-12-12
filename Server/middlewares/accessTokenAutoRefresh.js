import refreshAccessToken from "../utils/refreshAccessToken.js";
import isTokenExpired from "../utils/isTokenExpired.js";
import setTokensCookies from "../utils/setTokensCookies.js";

const accessTokenAutoRefresh = async (req, res, next) => {
  try {
    const accessToken = req.cookies.accessToken;

    // Check if access token is valid
    if (accessToken && !isTokenExpired(accessToken)) {
      req.headers['authorization'] = `Bearer ${accessToken}`;
      return next();
    }

    // Check if a refresh token exists
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) {
      return res.status(401).json({ error: "Unauthorized", message: "Refresh token is missing" });
    }

    // Prevent circular refresh attempts
    if (req.refreshAttempted) {
      return res.status(401).json({ error: "Unauthorized", message: "Token refresh failed" });
    }
    req.refreshAttempted = true;

    const refreshedTokens = await refreshAccessToken(req);
    if (refreshedTokens.error) {
      return res.status(401).json({ status: "failed", message: refreshedTokens.error });
    }

    setTokensCookies(res, refreshedTokens.newAccessToken, refreshedTokens.newRefreshToken, refreshedTokens.newAccessTokenExp, refreshedTokens.newRefreshTokenExp);
    req.headers['authorization'] = `Bearer ${refreshedTokens.newAccessToken}`;
    next();
  } catch (error) {
    console.error("Error adding access token to header:", error.message);

    if (!res.headersSent) {
      res.status(500).json({ error: "Internal Server Error", message: "An unexpected error occurred" });
    }
  }
};

export default accessTokenAutoRefresh;
