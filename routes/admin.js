const path = require('path')
const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser')

// const rootDir = require('../util/path')//using util/path folder

const adminController = require('../controller/admin')

// router.use(bodyParser.urlencoded())
router.use(bodyParser.urlencoded({extended:false})) //if got error the use this code

// const products = [] //storing products into a array and accessing using products //after using controller folder, moved this into this folder.

router.get('/add-product',adminController.getAddProduct)
router.post('/add-product',adminController.postAddProduct)

router.get('/products',adminController.getProducts)

router.get('/edit-product/:productId', adminController.getEditProduct)
router.post('/edit-product', adminController.postEditProduct)
router.post('/delete-product', adminController.postDeletProduct);

// router.delete('/delete-product', adminController.poseDeletProduct)
// router.post('/product',adminController.postAddProduct)

// router.post('/adminproduct',adminController.getAdminProducts)


//without using controller the code look like below..
// router.get('/add-product', (req, res, next) => {
//     res.render('add-product', {
//         pageTitle: 'Add Product',
//         path: '/admin/add-product',
//         formsCSS: true,
//         productCSS: true,
//         activeAddProduct: true
//     });
//    })
// router.post('/add-product', (req, res, next) => {
//     // console.log(); session 79 not implementing 
//     // console.log(req.body);
//     products.push({ title: req.body.title }); //adding into array
//     res.redirect('/')
// })
// exports.routes = router;
// exports.products = products; //no need after controller folder
module.exports = router;