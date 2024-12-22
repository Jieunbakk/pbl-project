const express = require('express');
const router = express.Router();
const jwtAuth = require('../jwt/jwtAuth.js');
const { verify } = require('jsonwebtoken');

const verifyjwt=(req,res,next)=>{
    const token = req.headers.authorization;
    console.log(token);
    if(!token){
        return res.status(401).json({message : "JWT가 필요합니다."})
    }
    try{
        const decoded = jwtAuth(token);
        req.user = decoded.email;
        next();
    } catch (err){
        return res.status(401).json({message : "JWT가 유효하지 않습니다."})
    }
}

module.exports = verifyjwt;