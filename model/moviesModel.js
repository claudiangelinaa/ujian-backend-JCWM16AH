const pool = require('../config/db');

exports.selectAll = (data) =>{
    return new Promise(function(resolve,reject){
        var sql = `SELECT movies.name, movies.release_date, movies.release_month, movies.release_year, movies.duration_min, movies.genre, movies.description, movie_status.status, locations.location, show_times.time
        FROM movies, movie_status, schedules, locations, show_times 
        WHERE movies.id = schedules.movie_id AND movies.status = movie_status.id AND schedules.location_id = locations.id AND schedules.time_id = show_times.id`
        pool.query(sql, [data], (err,result)=>{
            console.log(err,result);
            if(err) reject(err)
            resolve(result)
        })
    })
}

exports.selectByParams = (params) => {
    return new Promise(function(resolve, reject) {
        let where = '';
        for (const param in params) {
            params[param] = params[param].replace("%"," ")
            // console.log(params[param]);
            if (param === "status") {
                where += ` AND movie_status.status = '${params[param]}'`
            } else {
                where += ` AND ${param} = '${params[param]}'`
            }
        }
        // console.log(where);
        var sql = `SELECT movies.name, movies.release_date, movies.release_month, movies.release_year, movies.duration_min, movies.genre, movies.description, movie_status.status AS status, locations.location, show_times.time
        FROM movies, movie_status, schedules, locations, show_times 
        WHERE movies.id = schedules.movie_id AND movies.status = movie_status.id AND schedules.location_id = locations.id AND schedules.time_id = show_times.id` + where;
        // console.log(sql);
        pool.query(sql, (err, result) => {
            if (err) reject(err);
            resolve(result);
        })
    })
}

exports.insert = (data) =>{
    return new Promise(function(resolve,reject){
        var sql = `insert into movies set ?`
        pool.query(sql, [data], (err,result)=>{
            if(err) reject(err)
            resolve(result)
        })
    })
}

exports.edit = (data) =>{
    return new Promise(function(resolve,reject){
        var sql = `update movies set ? where id = '${data.id}'`
        pool.query(sql, [data], (err,result)=>{
            if(err) reject(err)
            resolve(result)
        })
    })
}

exports.updateSchedule = (data) =>{
    return new Promise(function(resolve,reject){
        var sql = `insert into schedules set ?`
        pool.query(sql, [data], (err,result)=>{
            if(err) reject(err)
            resolve(result)
        })
    })
}