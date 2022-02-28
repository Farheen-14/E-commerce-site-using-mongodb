const path = require('path')

const http = require('http');
const express = require('express');
const bodyParser = require('body-parser')
const app = express();
const adminRoutes = require('./routes/admin')
const shopRoute = require('./routes/shop')
const errorController = require('./controller/error')
const mongoConnect = require('./util/database').mongoConnect; //.mongoConnect is comming from database
const User = require('./models/user')
app.set('view engine', 'ejs')
app.set('views', 'views')



app.use(express.static(path.join(__dirname,'public'))) //this is a middleware
app.use(bodyParser.urlencoded({extended:false})) //if got error the use this code

//anonymus function it will execute if we have any id, it is middleware (work only- incoming req. )
app.use((req, res, next) => {
    User.findById("62074a5fd571768936116e92")
    .then(user => {
        // console.log("user", req.body);
        // req.user = user
            req.user = new User(user.name, user.email, user.cart, user._id)
            console.log('useer');
            console.log(user);
            // console.log("req user :", req.user);
            next(); //next user / next step
        })
        .catch(err => console.log(err))
        // next();
})




app.use('/admin',adminRoutes);
app.use('/',shopRoute);


const server = http.createServer(app);

app.use(errorController.getError)
// below code without controller 
app.use((req,res, next) => {
    // res.sendFile(path.join(__dirname, 'views', '404.hbs'))
    // res.status(404).send('<h1>Page Not Found</h1>')
    res.status(404).render('404',{ pageTitle : 'Page Not Found'})
})

// app.use(errorController.getError);


console.log("Server is running");
// mongoConnect((client)=> { //now we are not using client callback then change it
    mongoConnect(()=> { 
        console.log("Connection Succesfully");
        // console.log("Connection Succesfully : ",client);
    app.listen(3500)
})