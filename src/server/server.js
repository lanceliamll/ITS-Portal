const express = require("express");
const connectToDatabase = require("../../config/database");

//Initialize Exress
const app = express();

//Connect to MongoDB
connectToDatabase();

//Define the API Routes
app.use("/api/auth", require("./routes/api/auth"));
app.use("/api/user", require("./routes/api/user"));
app.use("/api/subject", require("./routes/api/subject"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server Started on PORT ${PORT}`));
