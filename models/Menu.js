const { type } = require("express/lib/response");
const {default:mongoose} = require("mongoose");

const menuSchema = new mongoose.Schema({
    menuItem : {
        type: String,
        required: true,
        // unique : true
    },
    taste : {
        type : String,
        enum : ['spicy','salty','bitter'],
        required : true
    },
    spices : {
        type : [String],
        enum : [ 'cumin', 'coriander', 'turmeric', 'chili powder']
    },
    price : {
        type : String,
        required: true
    }
});
//creating model from above schema
const Menu = mongoose.model("Menu",menuSchema);
module.exports = Menu;