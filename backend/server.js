const path = require("path");
const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const { notFound, errorHandler } = require("./middlewares/errorMiddleware");
const { connectDB } = require("./config/db");

const bookRoutes = require("./routes/bookRoutes");
const userRoutes = require("./routes/userRoutes");
const orderRoutes = require("./routes/orderRoutes");
const uploadRoutes = require("./routes/uploadRoutes");

dotenv.config();

connectDB();

const app = express();

// log request
app.use(morgan("dev"));

app.use(express.json());

app.get("/", (req, res) => {
  res.send("API is running...");
});

app.use("/api/books", bookRoutes);
app.use("/api/users", userRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/upload", uploadRoutes);

const dirname = path.resolve();
app.use("/uploads", express.static(path.join(dirname, "/uploads")));

app.use(notFound);
app.use(errorHandler);

// const PORT = process.env.PORT || 5000;

app.listen(5000, console.log("Server running on port 5000"));
