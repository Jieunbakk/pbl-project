const express = require('express');
const painReportQuery = require('../SQL/painReportQUERY');
const router = express.Router();
const verifyjwt = require('../middlewares/verifyjwt.js');
const painrecordCRUD = require('../SQL/painrecordCRUD.js');

router.post('/',verifyjwt, async(req,res) =>{
    const {pain_record_id} = req.body;
    console.log(pain_record_id);
    try {
        const pain_report = await painReportQuery.painreportSELECT(pain_record_id);
        const pain_record = await painrecordCRUD.readRecordOne(pain_record_id);
        console.log(pain_record);
        if(pain_report){
            res.status(200).json({
                status: 200,
                painreport: pain_report,
                painrecord: pain_record
            })
        }
    } catch (error) {
        res.status(500).json({
            status: 500,
            message: '통증 보고서 정보 전달시 문제 발생'
        })
    }
});

module.exports = router;