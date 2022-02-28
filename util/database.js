const mongodb = require('mongodb')
const MongoClient = mongodb.MongoClient;

let _db;

//this is for connecting 
const mongoConnect = (callback)=> {
    MongoClient.connect('mongodb+srv://newuser:farheen123@mydata.ji48y.mongodb.net/myShop?retryWrites=true&w=majority')
    .then(client => {
        console.log("Database Connected!");
        _db = client.db() //storiing connection into database
        callback(client)
    })
    .catch(err=> {
        console.log("Connection Err : ",err);
        throw err;
    })

}

//return accesss to getdatabase
const getDb = ()=>{
    if (_db){
        return _db;
    }
    throw "No Database Found!"
}
// module.exports = mongoConnect;
exports.mongoConnect = mongoConnect;
exports.getDb = getDb;






// const {Sequelize} = require('sequelize')
// const sequelize = new Sequelize('products', 'newuser', 'F@rheen123', {
//     dialect : 'mysql',
//     host : 'localhost'
// });

// module.exports = sequelize;



// using mysql 
// const mysql = require('mysql2');

// const pool = mysql.createPool({
//     host : 'localhost',
//     user : 'newuser',
//     database : 'products',
//     password : 'F@rheen123'
// });

// module.exports = pool.promise();