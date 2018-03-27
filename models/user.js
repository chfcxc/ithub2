
const db = require('../controllers/db-helper');


// 查询
exports.findAll = (callback)=>{
    const sqlStr = 'select * from `users`';
    db.query(sqlStr,(err,results)=>{
        if(err){
            return callback(err)
        }
        callback(null,results);
    })
}


// 通过邮箱查询
exports.checkByEmail = (email,callback)=>{
    const sqlStr = 'select * from `users` where `email`=?';
    db.query(
        sqlStr,
        [email],
        (err,results) => {
            if(err){
                return callback(err)
            }
            callback(null,results[0])
        }
    )
}

// 通过昵称查询
exports.checkByNickname = (nickname,callback)=>{
    const sqlStr = 'select * from `users` where `nickname`=?';
    db.query(
        sqlStr,
        [nickname],
        (err,results)=>{
            if(err){
                return callback(err)
            }
            callback(null,results[0])
        }
    )
}

// 插入新数据
exports.create = (user,callback)=>{
    const sqlStr = 'insert into `users` set ?';
    db.query(
        sqlStr,
        user,
        (err,results)=>{
            if(err){
                return callback(err)
            }
            callback(null,results[0])
        }
    )
}

