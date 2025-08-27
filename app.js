require("dotenv").config();
const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const cors = require("cors");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");

const morgan = require("morgan");

const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./swagger");

const authRouter = require("./routes/auth");
const userRouter = require("./routes/user");
const { authenticateJWT } = require("./middleware/auth");

// Tambahkan helmet untuk keamanan
app.use(helmet());

// Tambahkan rate limiter
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 menit
  max: 100, // maksimal 100 request per windowMs
  standardHeaders: true,
  legacyHeaders: false,
});
app.use(limiter);

app.use(express.json());
app.use(morgan("dev"));
app.use(cors());

// Public routes
app.use("/auth", authRouter);

// Protected routes
app.use("/users", authenticateJWT, userRouter);

// Endpoint dokumentasi Swagger
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.get("/", (req, res) => {
  res.json({
    message: "Hello World",
  });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
