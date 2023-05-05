const pug = require('pug');
const express = require('express');
const session = require('express-session');
const bcrypt = require('bcryptjs');
const bodyParser = require('body-parser');

//Database setup 
const Database = require('./ContactDB');
const db = new Database();
db.initialize();

const app = express(); 
app.locals.pretty = true;
app.use(express.urlencoded({extended: true}))
app.set('view engine', 'pug');
app.use(express.static('public'));
app.use(bodyParser.json());
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

//Checking if the cmps369 user exists
app.use(async (req, res, next) => {
    const username = 'cmps369';
    const user = await req.db.findUserbyUserName(username);
    if(user === undefined){
        //Creating the cmps369 user
        const salt = bcrypt.genSaltSync(10);
        const password = bcrypt.hashSync('rcnj', salt);
        const fName = 'admin';
        const lName = 'cmps369';
        const createUser = await req.db.createUser(fName, lName, username, password);
    }
    next();
});

app.use('/', require('./routes/accounts'));
app.use('/contactlist', require('./routes/contactlist'));
app.use('/create', require('./routes/create'));
app.use('/edit', require('./routes/edit'));
app.use('/', (req, res) => {
    res.render('home', {});
})

app.listen(8080, () => {
    console.log("Server is running on port 8080");
})