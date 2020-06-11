//global variables are declared here


//----------------------------
//  PORT
//----------------------------

process.env.PORT = process.env.PORT || 3000;



//----------------------------
//  Entorno
//----------------------------

process.env.NODE_ENV = process.env.NODE_ENV || 'desarrollo'; //para saber si la app se encuentra en produccion o en desarrollo

//----------------------------
//  Base de datos
//----------------------------

let urlDB;

if (process.env.NODE_ENV === 'desarrollo') {
    urlDB = 'mongodb://localhost:27017/coffee';
} else {
    urlDB = "mongodb+srv://atlasUser:FphSQtwBoVspY3uh@cluster0-wji62.mongodb.net/cafe"
}

process.env.URLDB = urlDB; //el enviroment es inventado totalmente, puede ser URLDB como goku