module.exports = (req, res, next) => {
  const key = req.headers["admin-key"];

  if (key !== "masstech-admin-2026") {
    return res.status(401).json({
      message: "Unauthorized"
    });
  }

  next();
};