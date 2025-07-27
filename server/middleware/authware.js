const jwt = require("jsonwebtoken");
const secret = '12345';
 function authFunction(req, res, next){
    try{
    const token = req.headers.authorization.split(' ')[1];
    const decodedId = jwt.verify(token, secret);
    req.userId = decodedId.userId;
    next();
    }
    catch(error){
        res.send({
            message: error.message,
            success: false
        })
    }
}

module.exports = {
     authFunction
}