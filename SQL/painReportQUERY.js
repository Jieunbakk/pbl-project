const connectMySQL = require('./db');

const painreportInsert=async(member_id, pain_record_id,pain_report)=>{
    try {
        const connect = await connectMySQL();
        const SQL = `
            INSERT INTO painlist.PainReport (member_id, pain_record_id, pain_report) 
            VALUES (${member_id}, ${pain_record_id}, "${pain_report}")`;
        await connect.execute(SQL);
    } catch (error) {
        throw new Error('painreport 데이터 삽입 중 오류 발생');
    }
};

const painreportSELECT=async(pain_record_id)=>{
    try {
        const connect = await connectMySQL();
        const SQL = `
            SELECT report_id, member_id, pain_record_id, pain_report, created_at,pain_report
            FROM painlist.PainReport
            WHERE pain_record_id = ${pain_record_id}`;
        const [rows]= await connect.execute(SQL);
        return rows
    } catch (error) {
        throw new Error('painreport 데이터 찾는 중 오류 발생');
    }
};

module.exports ={
    painreportInsert,
    painreportSELECT
};