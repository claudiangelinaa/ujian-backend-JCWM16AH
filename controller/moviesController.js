const moviesModel = require('../model/moviesModel')
const jwt = require('../lib/jwt')

exports.selectAll = async(req,res) =>{
    moviesModel.selectAll()
    .then((result)=>{
        res.json({
            result
        })
    })
    .catch(err=>{
        res.json({
            status: 'error',
            message: 'failed to fetch data',
            error_message: err
        })
    })
}

exports.selectByParams = async(req,res) =>{
    // console.log(req.query);
    moviesModel.selectByParams(req.query)
    .then((result)=>{
        res.json({
            result
        })
    })
    .catch(err=>{
        res.json({
            status: 'error',
            message: 'failed to fetch data',
            error_message: err
        })
    })
}

exports.insert = async(req,res)=>{
    if(req.body.token===undefined){
        res.json({
            status: 'error',
            message: "token can't be empty"
        })
        return;
    }
    let tokenData = jwt.Decode(req.body.token)

    if(tokenData.role !== 1){
        res.json({
            status: 'error',
            message: 'unauthorized',
        })
    }

    let data = {
        name: req.body.name,
        genre: req.body.genre,
        release_date: req.body.release_date,
        release_month: req.body.release_month,
        release_year: req.body.release_year,
        duration_min: req.body.duration_min,
        description: req.body.description
    }
    
    moviesModel.insert(data)
    .then((result)=>{
            res.json({
                id: result.insertId,
                name: req.body.name,
                genre: req.body.genre,
                release_date: req.body.release_date,
                release_month: req.body.release_month,
                release_year: req.body.release_year,
                duration_min: req.body.duration_min,
                description: req.body.description
        })
    })
}
exports.edit = async(req,res)=>{
    if(req.body.token===undefined){
        res.json({
            status: 'error',
            message: "token can't be empty"
        })
        return;
    }
    let tokenData = jwt.Decode(req.body.token)
    if(tokenData.role !== 1){
        res.json({
            status: 'error',
            message: 'unauthorized',
        })
    }
    let editedData ={
        status: req.body.status,
        id: req.params.id
    }
    moviesModel.edit(editedData)
    .then(()=>{
        res.json({
            id: parseInt(req.params.id),
            message: 'status has been changed'
        })
    })
    .catch(err=>{
        res.json({
            status: 'error',
            message: 'failed to change status',
            error_message: err
        })
    })
}
exports.updateSchedule = async(req,res) =>{
    if(req.body.token===undefined){
        res.json({
            status: 'error',
            message: "token can't be empty"
        })
        return;
    }
    let tokenData = jwt.Decode(req.body.token)
        if(tokenData.role !== 1){
            res.json({
                status: 'error',
                message: 'unauthorized',
            })
        }
    
        let data = {
            movie_id: req.params.id,
            location_id: req.body.location_id,
            time_id: req.body.time_id,
        }
        
        moviesModel.updateSchedule(data)
        .then((result)=>{
                res.json({
                    id: parseInt(req.params.id),
                    message: 'schedule has been added'
            })
        })
}
