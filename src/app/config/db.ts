import mongoose from "mongoose";
import config from ".";

const connectDB = async () => {
    try {
        await mongoose.connect(config.database_url as string);
        console.log(" MongoDB Connected Successfully");
    } catch (error) {
        console.log(" MongoDB Connection Failed");
        console.log(error);
        process.exit(1);
    }
};

export default connectDB;