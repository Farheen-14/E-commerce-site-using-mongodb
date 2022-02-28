// const mongoConnect = require('../util/database') //now we change we are using getDB directly
const mongodb = require('mongodb') //installing to access this mongodb id bcz it was an object format
const getDb = require('../util/database').getDb;

class Product{
    constructor(title, price, description, imageUrl,userId){
        this.title = title,
        this.price = price,
        this.description = description,
        this.imageUrl = imageUrl;
        // this._id = id ? new mongodb.ObjectId(id) : null;
        this.userId = userId;
        // console.log(this._id);
    }

    save(){
        const db = getDb();
        let dboper;
        if(this._id){
            dboper = db.collection('products').updateOne({_id : new mongodb.ObjectId(this._id)}, {$set : this}) //$set - object as a value understand by mongodb //this means it will use constructor
            dboper = db.collection('products').updateOne({_id : this._id}, {$set : this}) //$set - object as a value understand by mongodb //this means it will use constructor
        }else{
            dboper= db.collection('products').insertOne(this)

        }
    //    return db.collection('products').insertOne(this) //products is the table name in database, if it is not created then it will create automatically , and using insertOne(this) it takes objects like insertOne({name : 'farheen'}) or we can use (this) and insertmany will takes array ([])
       return dboper.then(result => {
           console.log(result);
       }).catch(err => {
           console.log(err);           
       });
    //    db.collection('products')
    }
    static fetchAll(){
        const db = getDb();
        return db.collection('products').find() //find method provide what we want next like an array format.
        .toArray()
        .then(products => {
            // console.log("Product is : ", products);
            return products;
        })
        .catch(err=> console.log(err))
    }

    static findById(prodId){
        const db = getDb();
        return db.collection('products').findOne({_id : new mongodb.ObjectId(prodId)})
        // db.collection('products').find({_id : prodId}).next()
        .then(product => {
            console.log('under method findbyid');
            console.log(product);
            return product;
        }).catch(err => console.log(err))
 
    }
    static deleteById(prodId){
        const db = getDb();
        return db.collection('products').deleteOne({_id : new mongodb.ObjectId(prodId)})
        // db.collection('products').find({_id : prodId}).next()
        .then(result => {
            console.log('Deleted');
            console.log(result);
            // return product;
        }).catch(err => console.log(err))
 


    }
}
module.exports = Product;