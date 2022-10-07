import mongoose from 'mongoose';
const connection=()=>{
    const connect=async()=>{
        try {
            await mongoose.connect(process.env.DB,{dbName:process.env.DB_NAME});
          } catch (error) {
            throw error;
          }
    };
    mongoose.connection.on("disconnect",()=>{
        console.log("DB is disconnected!");
    });
    mongoose.connection.on("connected",()=>{
        console.log("DB is connected!");
    })
    connect();

}
export default connection