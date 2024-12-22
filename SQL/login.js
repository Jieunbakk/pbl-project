const connectMySQL = require('./db');
const login=async(email,pw)=>{
    const connect = await connectMySQL();
    const SQL = 'SELECT email, password, salt from Member';
    const [rows] = await connect.execute(SQL);
    return rows;
};

module.exports = login;