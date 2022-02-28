// const Logger = require('nodemon/lib/utils/log');
const Product = require('../models/product')
// const Cart = require('../models/cart')


exports.getProducts = (req, res, next) => {
    Product.fetchAll()
        .then(products => {
            res.render('shop/product-list', {
                prods: products,
                pageTitle: 'All Products',
                path: '/products',
            });

        })
        .catch(err => console.log(err))
}


exports.getProduct = async (req, res, next) => {
    const prodId = req.params.productId;
    // console.log(prodId);
    const product = await Product.findById(prodId)
    // console.log("using findbypk", product);
    // res.redirect('/')
    res.render('shop/product-details', {
        //         // i : product,
        path: '/products',
        product: product,
        pageTitle: product.title

    })
}


// products => {
//     // console.log(product);
//     res.render('shop/product-details', {
//         // i : product,
//         path: '/products',
//         product: products,
//         pageTitle: product.title

//     })

exports.getIndex = (req, res, next) => {
            Product.fetchAll()
                .then(products => {
                    res.render('shop/index', {
                        prods: products,
                        pageTitle: 'Shop',
                        path: '/',
                    });

                })
                .catch(err => console.log(err))
        }



exports.getCart = (req, res, next) => {
            req.user.getCart()
                .then(cart => {
                    return cart.getProducts()
                        .then(products => {
                            res.render('shop/cart', {
                                path: '/cart',
                                pageTitle: 'Your Cart',
                                products: products
                            });
                        })
                        .catch(err => console.log(err));
                })
                .catch(err => console.log(err));
        };


    // exports.getCart = (req, res, next) => {
    //     req.user.getCart()
    //         .then(cart => {
    //             console.log("get cart :", cart);
    //             res.render('shop/cart', {
    //                 path: '/cart',
    //                 pageTitle: 'Your Cart',
    //                 products: cart //we use products in html page  
    //             })

    //             // cart.getProducts()
    //             // .then(products => {

    //             // })
    //             // .catch(err => console.log(err))
    //         })
    //         .catch(err => console.log(err))


    // Cart.getCart(cart => {  //accessing cart, what we have
    //     Product.fetchAll(products => { //fetching all products 
    //         const cartProducts = []
    //         for (product of products) {
    //             const cartProductData = cart.products.find(prod => prod.id === product.id) //cart.products.find - cart for accessing cart and we have products key in cart to storing id then find from there and matching cart.id and all products id from for loop (product.id)                
    //             if (cartProductData) {
    //                 cartProducts.push({ productData: product, qty: cartProductData.qty }) //getting productData from for loop and getting qty using cartProductData.qty from cart.json file bcz we access our cart.
    //             }
    //         }
    //         res.render('shop/cart', {
    //             path: '/cart',
    //             pageTitle: 'Your Cart',
    //             products: cartProducts //we use products in html page  
    //         })
    //     })
    // })



    exports.postCart = (req, res, next) => {
        const prodId = req.body.productId; //hidden id passing here from product-details
        Product.findById(prodId)
        .then(product => {
            return req.user.addToCart(product) //addtoCart access from user and it will return promise so we r using then
        }).then(result => {
            console.log("result is ", result);
            res.redirect('/cart')
        })
        // var fetchCart;
        // req.user.getCart()
        //     // Product.findByPk(prodId)
        //     .then(cart => {
        //         fetchCart = cart
        //         return cart.getProducts({ where: { id: prodId } })
        //     })
        //     .then(products => {  //if we have only one then show otherwise undefined and go to  other if 
        //         var product;
        //         if (products.length > 0) {
        //             product = products[0]
        //         }
        //         var newquantity = 1;
        //         if (product) {
        //             //..
        //         }
        //         return Product.findByPk(prodId)
        //             .then(product => {
        //                 return fetchCart.addProduct(product, { through: { quantity: newquantity } });
        //             })
        //             .catch(err => console.log(err))

        //     })
        //     .catch(err => console.log(err))
        // console.log(prodid);
        // res.redirect('/cart')
    }

    // exports.postCart = (req, res, next) => {
    //     const prodid = req.body.productI;
    // Product.findById(prodid, product => {
    //     // Cart.addProduct(prodid, product.price)
    //     Cart.addProduct(prodid, product.price);

    // })
    // }

    exports.postCartDeleteProduct = (req, res, next) => {
        const prodId = req.body.productId //getting id from hidden input
        Product.findById(prodId, product => {
            Cart.deleteProduct(prodId, product.price) //accessing method (deleteProduct)from cart and 1st is prodId from hidden file and second (product.price) access from  product object from Product
            res.redirect('/cart')
        })


    }

    exports.getOrder = (req, res, next) => {
        res.render('shop/orders', {
            pageTitle: 'Your Order',
            path: '/orders',
        })
    }
    exports.getCheckout = (req, res, next) => {
        res.render('shop/checkout', {
            pageTitle: 'Checkout',
            path: '/checkout',
        })
    }