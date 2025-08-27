const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

// Hapus komentar Swagger JSDoc jika ingin dokumentasi terpusat
router.get("/profile", userController.profile);
router.post("/add", userController.addUser);
router.get("/", userController.getAllUsers);
router.get("/:id", userController.getUserById);
router.put("/:id", userController.updateUser);
router.delete("/:id", userController.deleteUser);

module.exports = router;
