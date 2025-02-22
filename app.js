const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors"); // ✅ Import CORS
const employeeRoutes = require("./routes/employeeRoutes");

dotenv.config();
const app = express();

// ✅ Use CORS middleware to allow requests from your frontend
app.use(cors({
    origin: "*", // Allow requests from any origin
    methods: ["GET", "POST", "PUT", "DELETE"], // Allowed HTTP methods
    allowedHeaders: ["Content-Type", "Authorization"] // Allowed headers
}));

// ✅ Connect to MongoDB
async function connectDB() {
    try {
        await mongoose.connect(process.env.MongoDb_Url, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            serverSelectionTimeoutMS: 5000,
        });
        console.log("✅ Connected to MongoDB");
    } catch (error) {
        console.error("❌ MongoDB Connection Error:", error.message);
        process.exit(1);
    }
}
connectDB();

app.use(bodyParser.json());
app.use("/employees", employeeRoutes);

const port = 5000;
app.listen(port, () => {
    console.log(`🚀 Server running on port ${port}`);
});
