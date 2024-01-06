const authenticate = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }

  res.status(401).json({
    success: false,
    message: "Unauthorized; Your Session is Expired Please Login Again!",
    status: 401,
  });
};

module.exports = authenticate;
