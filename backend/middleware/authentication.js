const CustomError = require("../errors");
const { isTokenValid } = require("../utils");

const authenticateUser = async (req, res, next) => {
  const token = req.signedCookies.token;

  if (!token) {
    return res.status(401).json({ error: "Authentication Invalid" });
  }

  try {
    const { first_name, userId, role } = isTokenValid({ token });
    req.user = { first_name, userId, role };
    next();
  } catch (error) {
    return res.status(401).json({ error: "Authentication Invalid" });
  }
};

const authorizePermissions = (...roles) => {
  return (req, res, next) => {
    if (!req.user || !roles.includes(req.user.role)) {
      return res
        .status(403)
        .json({ error: "Unauthorized to access this route" });
    }
    next();
  };
};

module.exports = {
  authenticateUser,
  authorizePermissions,
};
