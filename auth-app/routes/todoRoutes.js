const express = require("express");
const TodoModel = require("../models/todoModel");
const authMiddleware = require("../middlewares/authMiddleware");

const TodoRoutes = express.Router();

// Protect the Route first.
// So only login users can access.

//creating post route and protect the route using authmiddleware.
TodoRoutes.post("/add-todos", authMiddleware, async (req, res) => {
    try {
        // creating todo list db along with the user id.
        let todo = await TodoModel.create({ ...req.body, userId: req.user });

        res.status(200).json({ message: "Todo Added", todo });
    } catch (error) {
        res.status(res.status(500).json({ message: "Something went wrong" }))
    }
});

// creating get route to get the all todos and protects the routes.
TodoRoutes.get("/all-todos",authMiddleware , async (req, res) => {
    try {
        //finding todo using userId so only particular user can access their data. (authentication).
        let todos = await TodoModel.find({ userId: req.user });

        res.status(200).json({ message: "Todo List", todos });

    } catch (error) {
        res.status(res.status(500).json({ message: "Something went wrong" }))
    }
})

module.exports = TodoRoutes;