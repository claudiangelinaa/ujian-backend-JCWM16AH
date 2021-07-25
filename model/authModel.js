const pool = require('../config/db');

exports.register = (data) =>{
    return new Promise(function(resolve,reject){
        var sql = `insert into users set ? ; select * from users where uid= '${data.uid}'`
        pool.query(sql, [data], (err,result)=>{
            if(err) reject(err)
            resolve(result)
        })
    })
}

exports.loginWithEmail = (data) =>{
    return new Promise(function(resolve, reject){
        var sql = `select * from users where email='${data.email}' and password='${data.password}'`
        pool.query(sql, (err,result)=>{
            // console.log(err, result)
            if(err) reject(err)
            resolve(result)
        })
    })
}

exports.loginWithUsername = (data) =>{
    return new Promise(function(resolve, reject){
        var sql = `select * from users where username='${data.username}' and password='${data.password}'`
        pool.query(sql, (err,result)=>{
            // console.log(err, result)
            if(err) reject(err)
            resolve(result)
        })
    })
}

exports.selectByUid = (data) =>{
    return new Promise(function(resolve,reject){
        var sql = `select status from users where uid= '${data.uid}'`
        pool.query(sql, (err,result)=>{
            if(err) reject(err)
            resolve(result)
        })
    })
}

exports.deactive = (data) =>{
    return new Promise(function(resolve,reject){
        var sql = `update users set ? where uid='${data.uid}' `
        pool.query(sql, [data], (err,result) =>{
            if(err) reject(err)
            resolve()
        })
    })
}

exports.activate = (data) =>{
    return new Promise(function(resolve,reject){
        var sql = `update users set ? where uid='${data.uid}' `
        pool.query(sql, [data], (err,result) =>{
            if(err) reject(err)
            resolve()
        })
    })
}

exports.close = (data) =>{
    return new Promise(function(resolve,reject){
        var sql = `update users set ? where uid='${data.uid}' `
        pool.query(sql, [data], (err,result) =>{
            if(err) reject(err)
            resolve()
        })
    })
}