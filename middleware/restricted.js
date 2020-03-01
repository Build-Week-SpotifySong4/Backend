const jwt = require("jsonwebtoken");
const jwtSecret = process.env.JWT_SECRET;

module.exports = (req, res, next) => {
  const token = req.headers.authorization;

  if (token) {
    jwt.verify(token, jwtSecret, (err, decoded) => {
      if (err) {
        res.status(401).json({ error: "Token is invalid" });
      } else {
        req.user = { id: decoded.userid, name: decoded.username };
        next();
      }
    });
  } else {
    res.status(401).json({ error: "Your token is missing" });
  }
};
