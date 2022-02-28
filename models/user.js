const mongodb = require('mongodb')
const getDb = require('../util/database').getDb;

const ObjectId = mongodb.ObjectId;

class User {
    constructor(username, email , cart ,id){ //passing cart to store into db
        this.name = username;
        this.email = email;
        this.cart = cart; //in cart we have some items like {items : []} in array
        this._id = id
    }
    save(){
        const db = getDb();
        return db.collection('users').insertOne(this)
    }

    addToCart(product){
        const cartProductIndex = this.cart.items.findIndex(cp => {
            // cp._id === product._id;
            // console.log("cartProductIndex", cartProductIndex);
            return cp.productId.toString() == product._id.toString(); //productId becz we get id below in this
        }); 
        let newQuantity =1;
        const updatedCartItems = [...this.cart.items] //copy cart into updatedcartitem
        // console.log("updatedCartItems", updatedCartItems); //show quantity, which is availbl 
        if(cartProductIndex >= 0){ //if exist the add + 1
            newQuantity = this.cart.items[cartProductIndex].quantity + 1;
            updatedCartItems[cartProductIndex].quantity = newQuantity;
            // console.log("newQuantity",newQuantity);
        } else{
            updatedCartItems.push({ productId : new ObjectId(product._id), quantity : newQuantity }) //if not exist then add new one
            // console.log("updatedCartItems else ",updatedCartItems); //what we updated it will shown here (final qty)
        }

        // items : [{ productId : new ObjectId(product._id), quantity :1 }]

        // const updatedCart = {items : [{ productId : new ObjectId(product._id), quantity :1 }]} //we are getting products and bydefault qty -1
        const updatedCart = { items : updatedCartItems } 
        const db = getDb();
        return db.collection('users').updateOne({_id : new mongodb.ObjectId(this._id)}, {$set : {cart : updatedCart}})
    }

    static findById(userId){
        const db= getDb();
        return db.collection('users').findOne({_id : new ObjectId(userId)}).then((user) => {
            // console.log("user id : ", result);
            return user //reaturn a user
        }).catch((err) => {
            console.log("err : ",err); 
        });

    }
}



// const Sequelize = require('sequelize')
// const sequelize = require('../util/database')

// const User = sequelize.define('user', {
//     id : {
//         type : Sequelize.INTEGER,
//         // autoIncrementIdentity : true,
//         autoIncrement : true,
//         allowNull : false,
//         primaryKey : true
//     },
//     name : Sequelize.STRING,
//     email : Sequelize.STRING
// })

module.exports = User;