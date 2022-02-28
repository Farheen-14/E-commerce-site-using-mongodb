const path = require('path')
const express = require('express');
const bodyParser = require('body-parser')
const shopController = require('../controller/shop')
const router = express.Router();

router.use(bodyParser.urlencoded({extended:false})) //if got error the use this code
// const rootDir = require('../util/path') //no need bcz of controller
// const adminData = require('./admin');
router.get('/', shopController.getIndex)

router.get('/products', shopController.getProducts)
router.get('/products/:productId', shopController.getProduct)
// router.get('/cart' , shopController.getCart)
router.post('/cart',shopController.postCart)
// router.post('/cart-delete-item', shopController.postCartDeleteProduct)
// router.get('/orders', shopController.getOrder)
// router.get('/checkout', shopController.getCheckout)

// router.get('/products/:productId', shopController.getProduct);

// router.get('/index', shopController.getIndex)

// the below code for without controller 
// router.get('/', (req,res, next) => {
//     console.log("2nd middlewale");``
//     // res.sendFile(path.join(__dirname,'../', 'views', 'add-product.html'))
//     res.sendFile(path.join(rootDir, 'views', 'add-product.html'))
//     // res.status(404).send('<h1>Hello First Page </h1>')
// })


//   router.get('/', (req, res, next) => {
//     const products = adminData.products;
//     res.render('shop', {
//       prods: products,
//       pageTitle: 'Shop',
//       path: '/',
//       hasProducts: products.length > 0,
//       activeShop: true,
//       productCSS: true
//     });
//   });

module.exports = router;