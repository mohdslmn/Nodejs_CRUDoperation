// var os = require("os");
// const note = require('./note.js');
// var age = note.age;
// console.log(note.age);
// var user = os.userInfo();
// console.log(user);
// const jsonString = '{"name": "John", "age": 30}';
// const res = JSON.parse(jsonString);
// console.log(res);
// import { db } from './db';
const express = require("express");
const db = require("./db");
const Person = require("./models/Person");
const Menu = require("./models/Menu");
const app = express();
require("dotenv").config();
const bodyParser = require("body-parser");
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

app.post("/person", async (req, res) => {
  try {
    const data = req.body; //assuming req.body contains person data
    //create a new Person document in db
    const newPerson = new Person(data);
    //save new person in db
    const savedPerson = await newPerson.save();
    console.log("data saved");
    res.status(200).json(savedPerson);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});
// app.post('/menu', async (req,res) => {
//     try{
//     //fetch data from bodyParser
//     const data = req.body;
//     //create new schema menu
//     const newMenu = new Menu(data);
//     //save
//     const savedMenu = await newMenu.save();
//     res.status(200).json(savedMenu);
// }
// catch(err){
//   console.log(err);
//   res.status(500).json({Error: "Internal Server Error"});
// }
// })
// app.get('/Menu',async (req,res) => {
//   const data = await Menu.find();
//   console.log("data fetched");
//   res.status(200).json(data);
// })
// app.get('/products',function(req,res){
//     res.send("from products");
// });
// app.get('/orders',function(req,res){
//     res.send("from orders");
// });
// app.get('/list',function(req,res){
//     const li = {
//         "items": [
//           { "id": 1, "name": "Item 1", "description": "Description of Item 1", "price": 10.99 },
//           { "id": 2, "name": "Item 2", "description": "Description of Item 2", "price": 19.99 },
//           { "id": 3, "name": "Item 3", "description": "Description of Item 3", "price": 7.50 }
//         ]
//       }

//     res.send(li.items);
// })
const personRoutes = require("./routes/personRoutes");
app.use("/person", personRoutes);
const menuRoutes = require("./routes/menuRoutes");
app.use("/menu", menuRoutes);

app.listen(3000);
