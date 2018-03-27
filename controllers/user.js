const connection = require('./db-helper');
const User = require('../models/user');
const md5 = require('md5');

const moment = require('moment');


exports.showSignin = (req, res) => {
    res.render('signin.html');
}


exports.signin = (req, res) => {
    // res.send('signin')
    const body = req.body;
    User.checkByEmail(body.email,(err,user)=>{
        if(err){
            return res.send({
                code:500,
                message:err.message
            })
        }
        if(!user){
            return res.send({
                code:1,
                message:'用户不存在'
            })
        }
        // 检测密码
        if(md5(body.password) != user.password){
            return res.send({
                code:2,
                message:'密码不正确'
            })
        }

        // 存入session
        req.session.user = user;

        // 登录成功保持登录状态
        res.send({
            code:200,
            message:'成功'
        })
    })
}


exports.showSignup = (req, res) => {
    res.render('signup.html')
}


exports.signup = (req, res) => {

    const body = req.body;
    // 检测邮箱
    User.checkByEmail(body.email, (err, user) => {
        if (err) {
            return res.send({
                code: 500,
                message: err.message
            })
        }
        if (user) {
            return res.send({
                code: 1,
                message: "邮箱被占用"
            })
        }
        User.checkByNickname(body.nickname, (err, user) => {
            if (err) {
                return res.send({
                    code: 500,
                    message: err.message
                })
            }
            if (user) {
                return res.send({
                    code: 2,
                    message: "昵称被占用"
                })
            }
            body.createdAt = moment().format('YYYY-MM-DD HH:mm:ss')
            body.password = md5(body.password);

            User.create(body, (err, results) => {
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
    // res.send('signout')
    delete req.session.user;
    res.redirect('/signin')
}