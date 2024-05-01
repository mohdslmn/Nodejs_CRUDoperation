const mongoose = require("mongoose");
const mongoURL = "mongodb://127.0.0.1:27017/" ;
mongoose.connect(mongoURL, {
    useNewUrlParser : true,
    useUnifiedTopology : true
});
const db = mongoose.connection;

db.on('connected',() =>{
    console.log("connected to db server")
});
db.on('error',() => {
    console.log("Mongodb Connection error:",err)
});
db.on('disconnection',() => {
    console.log("MongoDB Disconnected")
});

module.exports = {db};