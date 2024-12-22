const connectMySQL = require('./db');
const findbyType=async(atribute,value)=>{
    const connect = await connectMySQL();
    const SQL = `
    SELECT member_id 
    FROM Member 
    WHERE ${atribute} = '${value}';`;
    const [rows] = await connect.execute(SQL);
    return rows;
};

module.exports = findbyType;