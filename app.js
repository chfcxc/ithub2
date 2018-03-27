// 1.加载express
const express = require('express');

const router = require('./router')
const bodyParser = require('body-parser');
const session = require('express-session');

const MySQLStore = require('express-mysql-session')(session);

const options = {
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: '123',
    database: 'ithub'
};
 
const sessionStore = new MySQLStore(options);

// 调用express方法
const app = express();


app.engine('html',require('express-art-template'))
// 处理静态资源
app.use('/public',express.static('./public/'));
app.use('/node_modules',express.static('./node_modules'));

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json())

app.use(session({
    key: 'session_cookie_name',
    secret:'keyboard cat',
    resave:false,
    saveUninitialized:true,
    store: sessionStore,
}))

// 设置请求对应的处理函数
// app.get('/',(req,res)=>{
//     res.send('hellow word');
// })
app.use(router);

// 配置端口
app.listen(3000,()=>console.log('runing...'))


