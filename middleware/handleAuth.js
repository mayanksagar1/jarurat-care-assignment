import User from "../model/userModel.js";
import jwt from "jsonwebtoken";

const authenticate = async (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decoded.userId).select("-password");
      next();
    } catch (error) {
      res.status(401).send("Not Authorized , token failed");
    }
  } else {
    res.status(401).send("Not Authorized , token not found");
  }
};

const authorizeAdmin = (req, res, next) => {
  if (req.user && req.user.role === "admin") {
    next();
  } else {
    res.status(403).send("not authorized as a admin");
  }
};

export { authenticate, authorizeAdmin };