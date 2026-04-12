const express = require("express");
const connectToDB = require("./config/mongodb.config");
require("dotenv").config();



const PORT = process.env.PORT || 3000;
const app = express();
connectToDB();

app.use(express.json()); // body parser middleware.


//test route.
app.get("/test", (req, res) => {
    try {
        res.status(200).json({ message: "This is the Test Route" })
    } catch (error) {
        console.log("Something went Wrong!")
        res.status(400).json({ message: "Bad Request" })
    }
});


// handlling unknown routes.
app.use((req, res) => {
    try {
        res.status(404).json({ message: "Unknown Route" })
    } catch (error) {
        console.log("Something Went Wrong");
        res.status(400).json({ message: "Bad Request" })
    }
})


app.listen(PORT,()=>{
    console.log(`server started on PORT : http://localhost:${PORT}`);
})