const express = require('express');
const cors = require("cors");
const morgan = require('morgan');
const dotenv = require('dotenv');

const app = express({path: ".env"});
dotenv.config();
console.log(process.env.JWT_SECRET);
app.set('port', 3000);
app.use(
    cors({
        origin: '*',
    })
);

app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.listen(app.get('port'),() =>{
    console.log(app.get('port'), "번 포트로 서버 On");
});

const LoginRouter = require('./routes/login.js');
const signupRouter = require('./routes/signup.js');
const PainrecordRouter = require('./routes/index.js');
const aiRouter = require('./routes/ai.js');
const PainrepostRouter = require('./routes/painreport.js')

app.use('/login', LoginRouter);
app.use('/signup', signupRouter);
app.use('/predict', aiRouter);
app.use('/painrecord',PainrecordRouter);
app.use('/painreport', PainrepostRouter);