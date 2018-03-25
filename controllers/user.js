
var mysql = require('mysql');

// 创建数据库链接
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '123',
    database: 'ithub'
});

const moment = require('moment');


exports.showSignin = (req, res) => {
    res.render('signin.html');
}


exports.signin = (req, res) => {
    res.send('signin')
}


exports.showSignup = (req, res) => {
    res.render('signup.html')
}


exports.signup = (req, res) => {

    const body = req.body;
    // 检测邮箱
    connection.query('select * from `users` where `email`=?', [body.email], (err, results) => {
        if (err) {
            return res.send({
                code: 500,
                message: err.message
            })
        }
        if (results[0]) {
            return res.send({
                code: 1,
                message: "邮箱被占用"
            })
        }
        connection.query('select * from `users` where `nickname`=?', [body.nickname], (err, results) => {
            if (err) {
                return res.send({
                    code: 500,
                    message: err.message
                })
            }
            if (results[0]) {
                return res.send({
                    code: 2,
                    message: "昵称被占用"
                })
            }
            body.createdAt = moment().format('YYYY-MM-DD HH:mm:ss')

            connection.query('insert into `users` set ?', body, (err, results) => {
                if (err) {
                    return res.send({
                        code: 500,
                        message: err.message
                    })
                }
                res.send({
                    code:200,
                    message:'ok'
                })
            })
        })
    })


    // res.send('signup')    
}

exports.signout = (req, res) => {
    res.send('signout')
}