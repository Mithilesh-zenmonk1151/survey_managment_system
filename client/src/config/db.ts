import mongoose from 'mongoose';
import { ConnectOptions } from 'mongoose';

const connect = async (): Promise<void> => {
    if (mongoose.connections[0].readyState) return;

    try {
        await mongoose.connect(process.env.MONGO_URL as string, {
            dbName: process.env.DB_NAME,
            useNewUrlParser: true,
        } as ConnectOptions);
        console.log("Connection established successfully");
    } catch (err) {
        console.error(err);
        throw new Error("Error connecting to Mongoose");
    }
}

export default connect;
