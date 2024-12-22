const mysql=require("mysql2/promise");


//mysql database info
const connectInfo={
    user: "root",
    host: "localhost",
    password: "root",
    database: "painlist"
}

const connectMySQL = async () =>{
    const connect = await mysql.createConnection(connectInfo);
    connect.connect();
    return connect;
}

module.exports=connectMySQL;
