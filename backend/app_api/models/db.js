var mongoose = require('mongoose');

var dbURL = process.env.MONGODB_URI;

mongoose.connect(dbURL);

mongoose.connection.on("connected", function(){
    console.log("MongoDB Bağlantısı Başarılı");
});

mongoose.connection.on("error", function(){
    console.log("MongoDB Bağlantısı Başarısız");
});

mongoose.connection.on("disconnected", function(){
    console.log("MongoDB ile Bağlantı Kesildi");
});

//Ctrl+C kesmesiyle programı ve bağlantıyı sonlandırmak için
process.on("SIGINT", function(){
    console.log("Uygulama Kapatıldı");

    mongoose.connection.close();
    process.exit(0);
});

require('./movie');
require('./user');