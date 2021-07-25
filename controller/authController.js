const authModel = require('../model/authModel');
const bcrypt = require('../lib/bcrypt');
const jwt = require('../lib/jwt')
const helper = require('../helper/helper')

exports.register = async(req,res) =>{
    let data ={
        username: req.body.username,
        email: req.body.email,
        password: bcrypt.Encrypt(req.body.password),
        uid: Date.now()
    }
    if(data.username.length <6){
        res.json({
            message: 'Username minimal 6 karakter'
        })
        return
    }

    if(!helper.validateEmail(data.email)){
        res.json({
            message: 'Format email tidak sesuai'
        })
        return
    }
    
    if(req.body.password.length<6){
        res.json({
            message: 'Password minimal 6 karakter'
        })
        return
    }

    if(!helper.validatePassword(req.body.password)){
        res.json({
            message: 'Password harus mengandung angka dan special character'
        })
        return
    }

    authModel.register(data)
    .then((result)=>{
        // console.log(result);
        let tokenData = {
            uid: result[1][0].uid,
            role: result[1][0].role
        }
        let token = jwt.Encode(tokenData)
        res.json({
            id: result[1][0].id,
            uid: result[1][0].uid,
            username: result[1][0].username,
            email: result[1][0].email,
            token
        })
    })
    .catch(err=>{
        res.json({
            status: 'error',
            message: 'Failed to register user',
            error_message: err
        })
    })
}

exports.login = async(req,res) =>{
    let data = {
        email: req.body.email,
        username: req.body.username,
        password: bcrypt.Encrypt(req.body.password)
    }
    // console.log(data);
    if(data.username=== undefined && data.email!==undefined){
        authModel.loginWithEmail(data)
        .then((result)=>{
            // console.log(result[0].status===2);
            if(result[0].status!==1) {
                res.json({
                    status: 'error',
                    message: 'gagal login, akun sudah deactive/close'
                })
                return
            }
            let tokenData ={
                uid: result[0].uid,
                role: result[0].role
            }
            let token = jwt.Encode(tokenData)
            res.json({
                id: result[0].id,
                uid: result[0].uid,
                username: result[0].username,
                status: result[0].status,
                role: result[0].role,
                token
            })
        })
        .catch(err=>{
            // console.log('err', err)
            res.json({
                status: 'error',
                message: 'failed to login'
            })
        })
    }else{
        authModel.loginWithUsername(data)
        .then((result)=>{
            // console.log(result);
            if(result[0].status!==1) {
                res.json({
                    status: 'error',
                    message: 'gagal login, akun sudah deactive/close'
                })
                return
            }
            let tokenData ={
                uid: result[0].uid,
                role: result[0].role
            }
            let token = jwt.Encode(tokenData)
            res.json({
                    id: result[0].id,
                    uid: result[0].uid,
                    username: result[0].username,
                    status: result[0].status,
                    role: result[0].role,
                    token
            })
        })
        .catch(err=>{
            // console.log('err', err)
            res.json({
                status: 'error',
                message: 'failed to login'
            })
        })
    }
}

exports.deactive = async(req,res)=>{
    if(req.body.token===undefined){
        res.json({
            status: 'error',
            message: "token can't be empty"
        })
        return;
    }
    let data = jwt.Decode(req.body.token)
    // console.log(data);

    let deactiveData = {
        uid: data.uid,
        status: 2
    }
    authModel.deactive(deactiveData)
    .then(()=>{
        res.json({
            uid: parseInt(data.uid),
            status: 'deactive'
        })
    })
}

exports.activate = async(req,res)=>{
    if(req.body.token===undefined){
        res.json({
            status: 'error',
            message: "token can't be empty"
        })
        return;
    }
    let data = jwt.Decode(req.body.token)
    // console.log(data);

    let activeData = {
        uid: data.uid,
        status: 1
    }
    authModel.selectByUid(data)
    .then((result)=>{
        if(result[0].status===2){
            authModel.activate(activeData)
            .then(()=>{
                res.json({
                    uid: parseInt(data.uid),
                    status: 'active'
                })
            })
            .catch(err=>{
                res.json({
                    status: 'error',
                    error_message: err
                })
            })
        }else{
            res.json({
                status: 'error',
                error_message: 'status akun bukan deactive'
            })
        }
    })
    .catch(err=>{
        res.json({
            status: 'error',
            error_message: err
        })
    })
}

exports.close = async(req,res)=>{
    if(req.body.token===undefined){
        res.json({
            status: 'error',
            message: "token can't be empty"
        })
        return;
    }
    let data = jwt.Decode(req.body.token)
    // console.log(data);

    let closeData = {
        uid: data.uid,
        status: 3
    }
    authModel.close(closeData)
    .then(()=>{
        res.json({
            uid: parseInt(data.uid),
            status: 'closed'
        })
    })
}