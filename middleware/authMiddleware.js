const jwt = require("jsonwebtoken");
//Authentication
exports.verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  console.log(authHeader)
  if (!authHeader) {
    return res
      .status(401)
      .json({ message: "Access denied. No token provided" });
  }
  const token = authHeader.split(" ")[1];
  console.log("Token",token)
  try {
    const decode = jwt.verify(token, process.env.JWT_SECRET);
    console.log("decode",decode)
    req.user = decode;
    next();
  } catch (error) {
    return res.status(500).json({ message: "Invalid Token" });
  }
};
