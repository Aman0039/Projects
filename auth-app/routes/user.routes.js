const express = require('express');

const UserRouter = express.Router();

UserRouter.get("/:id", (req, res) => {
    const ID = Number(req.params.id);
    if (ID === 1) {
        res.json({ msg: "Hello World" });
    }
    else {
        res.json({ msg: "Route is working" });
    }
})

module.exports = UserRouter;
