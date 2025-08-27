const { addUserSchema } = require("../libs/validation");
const prisma = require("../prisma");

exports.profile = async (req, res) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.user.userId },
      select: { id: true, email: true, name: true, createdAt: true },
    });
    res.json({ user });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.addUser = async (req, res) => {
  try {
    const validatedData = addUserSchema.parse(req.body);

    if (!validatedData) {
      return res.status(400).json({ error: validatedData.error.errors });
    }
    const user = await prisma.user.create({
      data: validatedData,
    });
    res.status(201).json({
      message: "User created",
      user,
    });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.getAllUsers = async (req, res) => {
  try {
    const users = await prisma.user.findMany({
      select: { id: true, email: true, name: true, createdAt: true },
    });
    res.json({ users });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.getUserById = async (req, res) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        id: parseInt(req.params.id),
      },
    });
    res.json({ user });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.updateUser = async (req, res) => {
  try {
    const user = await prisma.user.update({
      where: { id: parseInt(req.params.id) },
      data: req.body,
    });
    res.json({
      message: "User updated",
      user,
    });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const user = await prisma.user.delete({
      where: { id: parseInt(req.params.id) },
    });
    res.json({
      message: "User deleted",
      user,
    });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
