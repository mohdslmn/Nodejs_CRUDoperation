const { default: mongoose } = require("mongoose");
// const bcrypt = require("bcryptjs");


//creating Person schema
const PersonSchema = new mongoose.Schema({
    name : {
        type : String ,
        required: true
    },
    work : {
        type : String,
        enum : ['chef','manager','waiter'],
        required : true
    },
    mobile : {
        type : String,
        required : true

    },
    email : {
        type : String,
        unique : true
    }

});
//now creating  model from above schema
const Person = mongoose.model("Person",PersonSchema);
module.exports = Person;