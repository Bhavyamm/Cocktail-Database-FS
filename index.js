const express = require("express");
const connectDB = require("./db");
const userRoutes = require("./routes/userRoutes");
const authRoutes = require("./routes/authRoutes");
const cocktailRoutes = require("./routes/cocktailRoutes");
const uploadRoutes = require("./routes/uploadRoutes");
const orderRoutes = require("./routes/orderRoutes");
const cors = require("cors");
const morgan = require("morgan");
const path = require("path");

const app = express();

connectDB();

app.use(cors());

app.use(morgan("dev"));

app.use(express.json({ extended: false }));

app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/cocktails", cocktailRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/upload", uploadRoutes);

app.use("/uploads", express.static(path.join(__dirname, "/uploads")));

const PORT = 9000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
