const jwt = require('jsonwebtoken');
const jwtAuth = (token) =>{
    return jwt.verify(token, process.env.JWT_SECRET, (err, decoded) =>{
        if(err){
            throw err;
        }
        return decoded;
    });
};
module.exports=jwtAuth;