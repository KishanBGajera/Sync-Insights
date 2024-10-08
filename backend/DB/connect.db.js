const mongoose = require("mongoose");

const connectDB = async () => {
    try {
        const connectionInstance = await mongoose.connect(process.env.DB_URI);
        console.log(`Connected to MongoDB [DB: ${connectionInstance.connection.name}]`);
    }
    catch (error) {
        console.log(`MongoDB Connection Error: ${error.message}`);
    }
}

connectDB();