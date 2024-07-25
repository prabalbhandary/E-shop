const mongoose = require("mongoose")

const connectDB = async () => {
    try {
        const username = process.env.USER;
        const password = process.env.PASSWORD;
        const cluster = process.env.CLUSTER;
        const dbName = process.env.DB;
        const uri = `mongodb+srv://${username}:${password}@${cluster}.ejkvh93.mongodb.net/${dbName}?retryWrites=true&w=majority&appName=prabal`;
        const conn = await mongoose.connect(uri);
        console.log(`MongoDB Connected: ${conn.connection.host}`.bgMagenta.white);
    } catch (error) {
        console.error(`Error connecting to MongoDB: ${error.message}`.bgRed.white);
    }
};

module.exports = connectDB