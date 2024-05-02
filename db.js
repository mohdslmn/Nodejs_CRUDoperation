const mongoose = require("mongoose");
require("dotenv").config();
// const mongURL = MONGODB_URL_Local ;
const mongoURL = process.env.MONGODB_URL  ;
mongoose.connect(mongoURL, {
    useNewUrlParser : true,
    useUnifiedTopology : true
});
const db = mongoose.connection;

db.on('connected',() =>{
    console.log("connected to db server")
});
db.on('error',() => {
    console.log("Mongodb Connection error:")
});
db.on('disconnection',() => {
    console.log("MongoDB Disconnected")
});

module.exports = db;