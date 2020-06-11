const express = require('express');
const app = express();
const User = require('../models/user');
const bcrypt = require('bcrypt');

app.get('/user', (req, res) => {
    let desde = req.query.desde || 0;
    desde = Number(desde);
    let limite = req.query.limite;
    limite = Number(limite) + 1;

    User.find({ status: true }, 'name email role estado google img')
        .skip(desde)
        .limit(limite)
        .exec((err, users) => {
            if (err) {
                res.status(400).json({
                    ok: false,
                    err
                });
            }

            User.countDocuments({ status: true }, (err, conteo) => {

                res.json({
                    ok: true,
                    users,
                    cantidad: conteo

                });
            });
        });
});

app.post('/user', (req, res) => {
    let body = req.body;
    let user = new User({
        name: body.name,
        email: body.email,
        password: bcrypt.hashSync(body.password, 10),
        role: body.role
    });

    user.save((err, userDB) => {
        if (err) {
            res.status(400).json({
                ok: false,
                err
            });
        }

        // userDB.password = null;

        res.json({
            ok: true,
            user: userDB
        });
    });
});


app.put('/user/:id', (req, res) => {
    let id = req.params.id;
    let body = req.body;

    User.findByIdAndUpdate(id, body, { new: true, runValidators: true }, (err, userDB) => {
        if (err) {
            res.status(400).json({
                ok: false,
                err
            });
        }

        res.json({
            ok: true,
            user: userDB
        });
    });
});
app.delete('/user/:id', (req, res) => {
    let id = req.params.id;
    let cambiarStatus = { status: false };

    // User.findByIdAndRemove(id, (err, userBorrado) => {

    User.findByIdAndUpdate(id, cambiarStatus, (err, userBorrado) => { //solo con pasar el cambiarStatus se actualizará solo el campo deseado
        if (err) {
            res.status(400).json({
                ok: false,
                err
            });
        }
        if (!userBorrado) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'usuario no encontrado'
                }
            });

        }

        res.json({
            ok: true,
            user: userBorrado
        });

    })

});

module.exports = app;