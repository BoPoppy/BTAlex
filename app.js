if (process.env.NODE_ENV !== 'production'){
    require('dotenv').config();
};
const express = require('express');
const app = express();

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

app.listen(process.env.PORT || 3000, function(){
    console.log('Server start on port 3000');
});

app.use(express.static('public'));
app.use('/', indexRouter);


