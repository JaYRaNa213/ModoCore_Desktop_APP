// middlewares/error.middleware.js
export default function errorHandler(err, req, res, next) {
  console.error("❌ Error:", err.message);
  res.status(500).json({ message: err.message || "Server Error" });
}
