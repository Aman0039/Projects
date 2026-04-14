const jwt = require("jsonwebtoken");

// checks the user is authenticated or not.
const authMiddleware = (req, res, next) => {
    try {
        //extracting the token in case token is not present ,
        // so , using optional chaining handle the error.
        var token = req.headers?.authorization?.split(" ")[1];

        if(token){
            // decoding the token.
            var decoded = jwt.verify(token,process.env.JWT_SECRET_KEY);

            // if token decode with the secret key then move to the next.
            if(decoded){
                // adding user and userId in the request.
                req.user = decoded.userId;
                // authentication is done.
                next()
            }
            else{
                // if token decodes fail then handlling the bad request.
                 res.status(400).json({message:"Login Failed Please Login Again!"});
            }
        }
        else{
            res.status(401).json({message:"Unauthorized"});
        }
    } catch (error) {
        res.status(500).json({ message: "Something went wrong" })
    }
}

module.exports = authMiddleware;