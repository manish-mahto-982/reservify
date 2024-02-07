import mongoose from "mongoose";
const connectDatabase =()=> mongoose
  .connect(process.env.MONGODB_URL as string)
  .then(() => console.log("connected to DB"))
  .catch((err) => console.error(err));

export default connectDatabase;
