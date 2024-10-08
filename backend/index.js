require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const PORT = process.env.PORT || 5000;
const cookieParser = require("cookie-parser");

require("./DB/connect.db");

app.use(express.json());

// CORS middleware
app.use(cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true
}));

app.use(cookieParser());
app.use("/api", require("./routes/routers.routes"))

app.listen(PORT, () => {
    console.log(`listening on port ${PORT}`);
});