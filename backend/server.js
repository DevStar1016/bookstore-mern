const express = require("express");
// const dotenv = require("dotenv");
const { notFound, errorHandler } = require("./middlewares/errorMiddleware");
const { connectDB } = require("./config/db");

const bookRoutes = require("./routes/bookRoutes");
const userRoutes = require("./routes/userRoutes");

// dotenv.config();

connectDB();

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("API is running...");
});

app.use("/api/books", bookRoutes);
app.use("/api/users", userRoutes);

app.use(notFound);
app.use(errorHandler);

// const PORT = process.env.PORT || 5000;

app.listen(5000, console.log("Server running on port 5000"));
