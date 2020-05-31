if (process.env.NODE_ENV !== 'production'){
    require('dotenv').config();
};
const express = require('express');
const app = express();
const flash = require('connect-flash');
const session = require('express-session');
const passport = require('passport')

//Passport config
require('./config/passport')(passport);

const expressLayouts = require('express-ejs-layouts');

app.set('view engine', 'ejs');
app.set('views',__dirname+'/views');


const indexRouter = require('./routes/index');

//MongoDB
const mongoose = require('mongoose');
const db = require('./config/keys').MongoURI;
mongoose.connect(db, { useCreateIndex: true, useUnifiedTopology: true,useNewUrlParser: true})
.then (res => {console.log("Database Connected!");})
.catch (err => {console.log(Error, err.message);});

//EJS
app.set('layout', 'layouts/layout');
app.use(expressLayouts);

//Bodyparser
app.use(express.urlencoded({ extended: false}));

//Express session 
app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}));

//Passport middleware
app.use(passport.initialize());
app.use(passport.session());

//Connect flash
app.use(flash());

//Global vars
app.use((req, res, next) => {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    next();
})

app.listen(process.env.PORT || 3000, function(){
    console.log('Server start on port 3000');
});

app.use(express.static('public'));

//Routes
app.use('/', indexRouter);
app.use('/users', require('./routes/users'));


