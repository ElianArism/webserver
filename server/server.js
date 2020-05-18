require('./config/config');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');


// parse application/x-www-form-urlencoded --- This is just a middleware
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json  --- This is just a middleware
app.use(bodyParser.json())


app.get('/user', (req, res) => {
    res.json('get usuario');
});

app.get('/', (req, res) => {
    res.render('./views/index.html');
})

app.post('/user', (req, res) => {
    let body = req.body; //this is what will appear when the bodyparser processes what it receives from requests

    if (body.nombre === undefined) {
        res.status(400).json({
            ok: false,
            msj: 'Name is necessary'
        }); //catch 400 error (bad request)
    } else {
        res.json({
            person: body //equals body: body
        });
    }
});
app.put('/user/:id', (req, res) => {
    let id = req.params.id; //get param id from url

    res.json({
        id // equals id: id
    });
});
app.delete('/user', (req, res) => {
    res.json('delete usuario');
});

app.listen(process.env.PORT, () => {
    console.log(`Listening in port ${process.env.PORT}`);
})