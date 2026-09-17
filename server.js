const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Database
require("./config/db");

// Routes
const authRoutes = require("./routes/authRoutes");
const cakeRoutes = require("./routes/cakeRoutes");
const cartRoutes = require("./routes/cartRoutes");
const categoryRoutes = require("./routes/categoryRoutes");
const customOrderRoutes = require("./routes/customOrderRoutes");
const orderRoutes = require("./routes/orderRoutes");

// API routes
app.use("/api/auth", authRoutes);
app.use("/api/cakes", cakeRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/custom-orders", customOrderRoutes);
app.use("/api/orders", orderRoutes);

// Home route
app.get("/", (req, res) => {
    res.json({
        message: "CakeWeb Backend API is running"
    });
});

// 404 route
app.use((req, res) => {
    res.status(404).json({
        message: "Route not found"
    });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});