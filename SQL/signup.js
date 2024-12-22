const connectMySQL = require('./db');
const crypto = require('crypto');

const signup = async(name, email, gender, age, pw)=>{
    const salt = crypto.randomBytes(128).toString('base64');
    console.log(name, email);
    const hashedPassword = crypto
        .createHash('sha512')
        .update(pw + salt)//입력받은 pw에 salt합침
        .digest('hex');
    const connect = await connectMySQL();
    const signupSQL = `
    INSERT INTO Member(name, email, gender, member_age, password, salt) 
    VALUES ('${name}', '${email}', '${gender}', ${age}, '${hashedPassword}', '${salt}')`;
    connect.execute(signupSQL);
};

const dupli = async(email)=>{
    const connect = await connectMySQL();
    const dupliSQL = `
    SELECT COUNT(*) AS count
    FROM Member 
    WHERE email = '${email}';`;
    const [rows] = await connect.execute(dupliSQL);
    const count = rows[0].count;
    if (count === 0 ){
        console.log(count)

        return true;
    }else{
        return false;
    }
}
module.exports={
    signup,
    dupli
};