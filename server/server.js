require('./config/config');
const express = require('express');
const mongoose = require('mongoose');
const app = express();
const bodyParser = require('body-parser');



// parse application/x-www-form-urlencoded --- This is just a middleware
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json  --- This is just a middleware
app.use(bodyParser.json())



app.use(require('./routes/user'));

mongoose.connect(process.env.URLDB, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: true
}, (err, res) => {
    if (err) throw err;
    console.log(`Database connected`);
});

app.listen(process.env.PORT, () => {
    console.log(`Listening in port ${process.env.PORT}`);
})