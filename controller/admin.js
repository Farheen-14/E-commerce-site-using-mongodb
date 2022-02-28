// const mongodb = require('mongodb')
const Product = require('../models/product') //product  for getting table 

// const objectId = mongodb.ObjectId

exports.getAddProduct = (req, res, next) => {
    res.render('admin/add-product', {  //this is to access the edit-product
        pageTitle: 'Add Product',
        path: '/admin/add-product',  //add-product for url for users
        editing : false
         // formsCSS: true,
        // productCSS: true,
        // activeAddProduct: true
    });
}

exports.postAddProduct = (req, res, next) => {
    const title = req.body.title;
    const imageUrl = req.body.imageUrl;
    const price = req.body.price;
    const description = req.body.description;
    const product = new Product(title,price,description,imageUrl, req.user._id) 
    product.save() //after this it will calling save function from product.js file using save function.
      .then(result => {
        console.log('Created Product', product);
        res.redirect('/admin/products');
      })
      .catch(err => {
        console.log(err);
      });
  };

// exports.postAddProduct = (req, res, next) => {
//     const title = req.body.title;
//     const imageUrl = req.body.imageUrl;
//     const price = req.body.price;
//     const description = req.body.description;  
//     console.log("req user from admin page",req.user);
//     Product.create({
//     // req.user.create({
//         title : title,
//         imageUrl : imageUrl,
//         price : price,
//         description : description,
//         userId : req.user.id //this is sequelize user object/ helper method //manually setting user id but we don't want like
//     })
//     .then(result => {
//         console.log('post data saving : ', result);
//         res.redirect('/admin/products')
//     })
//     .catch(err => {console.log('err in post data :', err)})
// }


exports.getEditProduct = (req, res, next) => {
    // const editMode = req.query.edit
    const editMode= true
    if(!editMode){
        return res.redirect('/')
    }
    const prodId = req.params.productId;
    Product.findById(prodId)
    .then(product => {
        if (!product){
            return res.redirect('/')
        }
        res.render('admin/edit-product', {  //this is to access the edit-product
            pageTitle: 'Edit Product',
            path: '/admin/edit-product',  //add-product for url for users
            editing : editMode,
            product : product
        });
    })
    .catch(err => console.log(err))
}

exports.postEditProduct = (req, res, next)=>{
    const prodId = req.body.productId;
    const updatedTitle = req.body.title;
    const updatedImage = req.body.imageUrl;
    const updatedPrice  = req.body.price;
    const updatedDesc  = req.body.description;   
    const product = new Product(updatedTitle,updatedPrice,updatedDesc,updatedImage, prodId) //this objectid define b4 to access id from mongodb
    product.save()
    // Product.findByPk(prodId)
    // .then(product => {
    //     product.title = updatedTitle,
    //     product.imageUrl = updatedImage,
    //     product.price = updatedPrice,
    //     product.description = updatedDesc
    //     return product.save()
    // }) 
    .then(result => {      //for any success then it will work after the
        console.log('Product Updated');
        res.redirect('/admin/products')
    })         
    .catch(err => console.log(err)) //this is for 1st .then
}

exports.getProducts = (req, res, next) => {
    // Product.findAll() changed here
    // req.user.getProducts()
    Product.fetchAll()
    .then(products => {
        res.render('admin/products', {
            prods: products,
            pageTitle: 'Admin Products',
            path: '/admin/products',
          });  
    })
    .catch(err => console.log(err))
}


// // Product.fetchAll(products => {
// //     res.render('admin/products', {
// //         prods: products,
// //         pageTitle: 'Admin Products',
// //         path: '/admin/products',
// //       });
// // })

exports.postDeletProduct =(req, res, next) =>{
    const prodId = req.body.productId; //getting from hidden input delete btn
    Product.deleteById(prodId)
    // Product.findByPk(prodId)
    // .then(product => {
    //     return product.destroy()       //it will return promise so we will use return here    
    // }) 
    .then(() => {
      // .then(result => {
        console.log("Successfully Deleted ");
        res.redirect('/admin/products')
    })
    .catch(err => console.log(err))
    // Product.deleteById(prodId)
}



exports.getAdminProducts = (req, res, next) => {
    Product.fetchAll(products => {
        res.render('/products', {
            prods: products,
            pageTitle: 'Admin Products',
            path: '/adminproduct',
          });
    })
}