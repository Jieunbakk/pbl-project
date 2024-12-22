const jwt = require('jsonwebtoken');
const jwtMaker = (email) => {
    const payload = {email : email};
    const secret = process.env.JWT_SECRET;
    const options = {
        expiresIn: '30m',
    };
    const token = jwt.sign(payload,secret, options);
    return token;
};

module.exports=jwtMaker;