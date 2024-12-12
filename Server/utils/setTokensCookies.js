const setTokensCookies = (res, accessToken, refreshToken, newAccessTokenExp, newRefreshTokenExp) => {
  const accessTokenMaxAge = Math.max((newAccessTokenExp - Math.floor(Date.now() / 1000)) * 1000, 0);
  const refreshTokenMaxAge = Math.max((newRefreshTokenExp - Math.floor(Date.now() / 1000)) * 1000, 0);

  // Set Cookie for Access Token
  res.cookie('accessToken', accessToken, {
    httpOnly: true,
    secure: false, // Set to true for production
    maxAge: accessTokenMaxAge,
  });

  // Set Cookie for Refresh Token
  res.cookie('refreshToken', refreshToken, {
    httpOnly: true,
    secure: false, // Set to true for production
    maxAge: refreshTokenMaxAge,
  });

  // Set Cookie for is_auth
  res.cookie('is_auth', true, {
    httpOnly: false,
    secure: false, // Set to true for production
    maxAge: refreshTokenMaxAge,
  });
};

export default setTokensCookies;
