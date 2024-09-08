const mongoose = require("mongoose");
mongoose
    .connect(process.env.DB_URI)
    .then(() => console.log("DB connection is success...!"))
    .catch((err) => {
        console.log(`DATABASE connection failed !!! ${err}`)
    });