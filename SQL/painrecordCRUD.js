const connectMySQL = require('./db');

const createRecord =async(member_id ,indensity , area , pattern , detail,frequency)=>{
    try {
        const connect = await connectMySQL();
        const SQL = `
            INSERT INTO painlist.PainRecord (member_id, pain_indensity, pain_area, pain_pattern, pain_details,pain_frequency) 
            VALUES (${member_id}, ${indensity}, ${area}, ${pattern}, ${detail},${frequency})`;
        await connect.execute(SQL); // Prepared statement 사용
    } catch (err) {
        console.error(err);
        throw new Error('데이터 삽입 중 오류 발생');
    }
};

const readRecordAll = async(member_id) =>{
    try{
        console.log("hi");
        const connect=await connectMySQL();
        const SQL=
        `SELECT  pain_record_id, pain_indensity, pain_area, pain_pattern, pain_details,pain_frequency
        FROM painlist.PainRecord 
        where member_id = ${member_id}`;
        const [rows] = await connect.execute(SQL);
        console.log(rows);
        return rows;
    } catch(err){
        console.err
    }
};

const readRecordOne = async(pain_record_id)=>{
    try{
        const connect = await connectMySQL();
        const SQL=
        `SELECT  pain_indensity, pain_area, pain_pattern, pain_details,pain_frequency
        FROM painlist.PainRecord 
        where pain_record_id = ${pain_record_id}`;
        const [rows] = await connect.execute(SQL);
        return rows;
    }catch(err){
        console.err
    }
}


const updateRecord = async(pain_record_id,indensity,area,pattern,detail,frequency)=>{
    const connect=await connectMySQL();
    const SQL=`
    UPDATE painlist.PainRecord 
    SET pain_indensity = ${indensity}, pain_area = ${area}, pain_pattern = ${pattern}, pain_details = ${detail} ,pain_frequency = ${frequency}
    WHERE pain_record_id = ${pain_record_id};`;
    connect.execute(SQL);
};

const deleteRecord = async(painrecordid)=>{
    const connect=await connectMySQL();
    const SQL =`
    DELETE FROM painlist.PainRecord WHERE pain_record_id = ${painrecordid}`;
    connect.execute(SQL)
}

module.exports = {
    createRecord,
    readRecordAll,
    readRecordOne,
    updateRecord,
    deleteRecord,
};