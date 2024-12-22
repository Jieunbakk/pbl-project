const express = require('express');
const axios = require('axios');
const selectQuery = require('../SQL/selectQuery');
const painReportQuery = require('../SQL/painReportQUERY');
const router = express.Router();
const verifyjwt = require('../middlewares/verifyjwt.js');//jwt검증 미들웨어
const findbyEmail = require("../SQL/findbyType.js");

const url = "https://pain-management-api-210589588344.asia-northeast3.run.app"

// 공통 엔드포인트 처리
router.post('/:pain_type', verifyjwt, async (req, res) => {

    try {
        const { pain_type } = req.params; // chest_pain, back_pain 등
        const { pain_id} = req.body;

        const email = req.user;
    
        const [rows] =  await findbyEmail("email", email);
        const member_id = rows.member_id;

        // 데이터 생성 및 외부 서버 요청
        const jsonDataObj = await createPainData(pain_id);
        console.log(jsonDataObj);
        const response = await sendPainData(pain_type, jsonDataObj);

        console.log(response.data[0]);

        // 클라이언트로 응답 전달
        await painReportQuery.painreportInsert(member_id, pain_id, response.data[0]);
        res.status(response.status).json(response.data);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred while processing the request.' });
    }
});


async function createPainData(pain_id){
    const [rows] = await selectQuery(pain_id);
    console.log(rows);
    // return {
    //     "통증 위치": `${rows.pain_area}`,
    //     "통증 강도": rows.pain_indensity,
    //     "통증 빈도": rows.pain_frequency,
    //     "통증 양상": `${rows.pain_pattern}`,
    //     "추가 증상": [`${rows.pain_details}`]
    // }
    return {
        "통증 위치": `가슴 중앙`,
        "통증 강도": 1,
        "통증 빈도": 6,
        "통증 양상": `박동성 통증`,
        "추가 증상": ""
    }
}

async function sendPainData(endpoint, data) {
    return axios.post(`${url}/predict/${endpoint}`, data, {
        headers: { 'Content-Type': 'application/json' }
    });
}

module.exports = router