const connectMySQL = require('./db');

const selectQuery=async(value)=>{
    const connect = await connectMySQL();
    const SQL = `
    SELECT pain_record_id, member_id, pain_area, pain_indensity, pain_frequency, pain_pattern, pain_details 
    FROM painlist.PainRecord 
    WHERE pain_record_id = ${value};`;
    const [rows] = await connect.execute(SQL);
    return rows;
};

module.exports = selectQuery;