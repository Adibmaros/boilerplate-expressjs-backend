const { z } = require("zod");

const registerSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
  name: z.string().min(1),
});

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

const addUserSchema = z.object({
  name: z
    .string({
      required_error: "Name is required",
    })
    .min(1, {
      message: "Name must be at least 1 character long",
    }),
  email: z.string().email({
    required_error: "Email is required",
  }),
  password: z.string().min(6, {
    required_error: "Password is required",
  }),
});

module.exports = { registerSchema, loginSchema, addUserSchema };
