const mongoose = require("mongoose");

const connectToDB = async()=>{
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("DB Connected");
    } catch (error) {
        console.log("Failed To Connect DB");
    }
}

module.exports = connectToDB;