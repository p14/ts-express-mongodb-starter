import dotenv from 'dotenv';
import mongoose from 'mongoose';

dotenv.config();

// Connect to MongoDB and log a success or failure message
const dbConnect = async () => {
    try {
        const connectionString = String(process.env.MDB_CONNECTION);
        await mongoose.connect(connectionString);
        console.log('Connected to DB');
    } catch {
        console.log('Could not connect to DB');
        process.exit(1);
    }
}

export default dbConnect;
