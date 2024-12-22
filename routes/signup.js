const express = require('express');
const signup = require('../SQL/signup');
const router = express.Router();
router.post('/', async(req, res) => {
    const {name, email,gender,age,pw} = req.body;
    try{
        await signup.signup(name, email, gender, age,pw);
        res.status(200).json({
            status: 200,
            message: '회원가입 성공',
        });
    } catch(err){
        res.status(500).json({
            status:500,
            message: '회원가입 실패',
        });
    }
});

router.post('/dupli',async(req,res) =>{
    const {email} =  req.body;
    console.log(req.body);
    try{
        const result = await signup.dupli(email);
        if (result){
            res.status(200).json({
                status: 200,
                message: '사용가능한 이메일입니다.'
            })
        }
        else{
            res.status(401).json({
                status: 400,
                message: '사용할 수 없는 이메일입니다.'
            });
        }
    }

    catch(err){
        console.log(err)
        res.status(500).json({
            status : 500,
            message : '이메일 중복 검사 실패'
        })
    }

});

module.exports = router;