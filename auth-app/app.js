const express = require("express");
const connectToDB = require("./config/mongodbConfig");
const UserRouter = require("./routes/userRoutes");
const TodoRoutes = require("./routes/todoRoutes");
const authMiddleware = require("./middlewares/authMiddleware");

require("dotenv").config();



const PORT = process.env.PORT || 3000;
const app = express();

// DB Connection.
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

// Handle User Router
app.use("/user", UserRouter)

//Handle Todo Router

app.use("/todos", authMiddleware, TodoRoutes);
// handlling unknown routes.
app.use((req, res) => {
    try {
        res.status(404).json({ message: "Unknown Route" })
    } catch (error) {
        console.log("Something Went Wrong");
        res.status(400).json({ message: "Bad Request" })
    }
})


app.listen(PORT, () => {
    console.log(`server started on PORT : http://localhost:${PORT}`);
})