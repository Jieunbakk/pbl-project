const express = require("express");
const fs = require('fs');
const painrecord = require("../SQL/painrecordCRUD.js");
const cors = require("cors");
const router = express.Router();
const verifyjwt = require('../middlewares/verifyjwt.js');//jwt검증 미들웨어

const { swaggerUi, specs } = require("../swagger/swagger.js");
const findbyEmail = require("../SQL/findbyType.js");


router.post("/create", verifyjwt, async (req, res) => {
    const {indensity , area , pattern , detail, frequency}=req.body;
    const email = req.user;
    
    const [rows] =  await findbyEmail("email", email);
    console.log(rows);
    const member_id = rows.member_id;
    console.log(req.body);

    try {
        await painrecord.createRecord(member_id, indensity, area, pattern, detail,frequency); // 데이터 삽입 함수 호출
        res.status(200).json({
            status: 200,
            message: "데이터가 성공적으로 저장되었습니다.",
        });
    } catch (error) {
        console.error(err); // 오류 로그 출력
        res.status(500).json({
            status: 500,
            message: "데이터 저장 중 오류가 발생했습니다.",
        });
    }
});

router.get("/read", verifyjwt,async (req, res) => {
    const email = req.user;
    
    const [rows] =  await findbyEmail("email", email);
    const member_id = rows.member_id;
    console.log(member_id);
    try {
        const result = await painrecord.readRecordAll(member_id);
        res.status(200).json({
            status: 200,
            message: '데이터 조회 성공',
            data: result, // 조회된 데이터 반환
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            status: 500,
            message: '데이터 조회 실패',
            error: error.message,
        });
    }
});

router.put("/update", verifyjwt,async(req, res) => {
    const {pain_record_id,indensity,area,pattern,detail,frequency}=req.body;

    try {
        await painrecordCRUD.updateRecord(pain_record_id, indensity, area, pattern, detail,frequency);
        res.status(200).json({
            status: 200,
            message: "Updated values successfully!"
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({
            status: 500,
            message: "Failed to update values",
            error: err.message
        });
    }
});


router.delete("/:painrecordid", verifyjwt, async(req, res) => {
    const { painrecordid } = req.params;
    try {
        await painrecordCRUD.deleteRecord(painrecordid);
        res.status(200).json({
            status: 200,
            message: "Deleted values successfully!"
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({
            status: 500,
            message: "Failed to delete values",
            error: err.message
        });
    }
});



module.exports = router;