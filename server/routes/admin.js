const express = require("express");
const router = express.Router();

const ADMIN_USER = "sehan";
const ADMIN_PASS = "123456";

/* ADMIN LOGIN */
router.post("/login", (req, res) => {
  const { username, password } = req.body;

  if (username === ADMIN_USER && password === ADMIN_PASS) {
    return res.json({
      success: true,
      token: "admin-token-123",
    });
  }

  return res.status(401).json({
    success: false,
    message: "Invalid login",
  });
});

module.exports = router;