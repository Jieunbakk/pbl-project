const express = require('express');
const login = require('../SQL/login');
const crypto = require('crypto');
const { access, stat } = require('fs');
const jwtMaker = require('../jwt/jwtMaker');
const verifyjwt = require('../middlewares/verifyjwt.js');//jwt검증 미들웨어
const findbyEmail = require('../SQL/findbyType.js');

const router = express.Router();

router.post('/', async(req, res) => {
    const {email: reqEmail, pw:reqPw} = req.body;
    const result = await login();
    let success = false;
    result.forEach((info) => {
        const {email,password,salt} = info;
        const compareHash = crypto
            .createHash('sha512')
            .update(reqPw + salt)//입력받은 pw에 salt합침
            .digest('hex');
        console.log(`email: ${email}, reqEmail: ${reqEmail}, pw: ${password}, compareHash: ${compareHash}`)
        if (email===reqEmail && password === compareHash){
            const response={
                status: 200,
                message:'로그인 성공',
                access_token : jwtMaker(reqEmail),
                
            };
            res.json(response);
            success=true;
        }    
        
    });
    if(!success){
        res.status(401).send('로그인 실패');
    }
});

router.get('/getuser', verifyjwt, async(req,res)=>{
    const email = req.user;

    const [rows] = await findbyType("email", email);
    const member_id = rows.member_id;

    try{
        res.status(200).json({
            status: 200,
            member_id: member_id
        });
    }catch(error){
        console.error(err);
        res.status(500).json({
            status: 500,
            message: "에러가 발생했습니다."
        })
    }
})

module.exports = router;