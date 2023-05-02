const pug = require('pug');
const express = require('express');
const session = require('express-session');
const bcrypt = require('bcryptjs');

//Database setup 
const Database = require('./ContactDB');
const db = new Database();
db.initialize();

const app = express(); 
app.locals.pretty = true;
app.use(express.urlencoded({extended: true}))
app.set('view engine', 'pug');
app.use((req, res, next) => {
    req.db = db;
    next();
})

app.use(session({
    secret: 'cmps369',
    resave: false,
    saveUninitialized: true,
    cookie: {secure: false}
}))

app.use((req,res,next) => {
    if(req.session.user){
        res.locals.user = {
            fName: req.session.user.firstname,
            lName: req.session.user.lastname
        }
    }
    next();
})

app.use('/', require('./routes/contactlist'));

app.listen(8080, () => {
    console.log("Server is running on port 8080");
})