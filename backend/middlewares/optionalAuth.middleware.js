import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

export const optionalAuth = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      // no token — do not block, continue as guest
      req.user = null;
      return next();
    }

    const token = authHeader.split(" ")[1];
    if (!token) {
      req.user = null;
      return next();
    }

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const user = await User.findById(decoded.id).select("-password");
      if (user) {
        req.user = user;
      } else {
        req.user = null;
      }
    } catch (innerErr) {
      // invalid token — proceed as guest (do not block)
      req.user = null;
    }

    return next();
  } catch (error) {
    console.error("Optional auth error:", error.message);
    req.user = null;
    return next();
  }
};
