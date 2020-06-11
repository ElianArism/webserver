const mongoose = require('mongoose');

let Schema = mongoose.Schema;

const uniqueValidator = require('mongoose-unique-validator');

let ValidRoles = {
    values: ['ADMIN_ROLE', 'USER_ROLE'],
    message: '{PATH} is not a valid role'
}

let userSchema = new Schema({ //Declarated Schema 
    name: {
        type: String,
        required: [true, 'El nombre es necesario']
    },
    email: {
        type: String,
        required: true,
        unique: true // to only accept 1 user with this email 
    },
    password: {
        type: String,
        required: true
    },
    img: {
        type: String,
        required: [false, 'opcional']
    },
    role: {
        type: String,
        default: 'USER_ROLE',
        enum: ValidRoles
    },
    status: {
        type: Boolean,
        default: true
    },
    google: {
        type: Boolean,
        default: false
    }
});


userSchema.methods.toJSON = function() { //metodo que se llama para devolver jsons, lo estamos modificando con una funcion anonima
    let user = this; //contenido que tiene el userSchema
    let userObject = user.toObject(); //Volcamos el contenido de user en userObject 
    delete userObject.password; // deleting la password para que no se vea al devolverse el JSON 

    return userObject; //retornamos el userObject que tiene la informacion del objeto sin la contraseña 
}


userSchema.plugin(uniqueValidator, { message: '{PATH} debe de ser unico' }); //way to deal with the error


module.exports = mongoose.model('User', userSchema);
module.exports = mongoose.model('User', userSchema);