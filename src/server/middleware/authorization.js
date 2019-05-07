const jwt = require("jsonwebtoken");
const config = require("config");

module.exports = (req, res, next) => {
  //Get token from the Authorization Header
  const token = req.header("x-auth-token");

  //Check if the token is present
  if (!token) {
    return res.status(401).json({ message: "Authorization Denied!" });
  }

  try {
    //Verify the token
    const decoded = jwt.verify(token, config.get("jwtSecret"));
    //Request User is gonna be same as the decoded user
    req.user = decoded.user;

    next();
  } catch (error) {
    res.status(401).json({ message: "Invalid Authorization" });
  }
};
