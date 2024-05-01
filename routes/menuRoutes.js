const express = require("express");
const router = express.Router();
const Menu = require("./../models/Menu");

router.post("/", async (req, res) => {
  try {
    const data = req.body;
    const newMenu = new Menu(data);
    const savedMenu = await newMenu.save();
    console.log("data saved");
    res.status(200).json(savedMenu);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal Server error" });
  }
});
//parametrized URL or endpoints
 router.post('/:tasteType', async (req,res) => {
     try{
         const tasteType = req.params.tasteType;
         if(tasteType === 'spicy' || tasteType === 'salty' || tasteType ==="bitter"){
            const response = await Menu.find({taste: tasteType});
            console.log("response fetched");
            res.status(200).json(response);
         }
         else{
            res.status(404).json({Error : "Taste Type Not found"});
         }
     } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Internal Server error" });
      }
 })
router.get("/", async (req, res) => {
  try {
    const data = await Menu.find();
    console.log("Data Fetched");
    res.status(200).json(data);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});
router.put("/:id", async (req,res) => {
    try{
    const menuId = req.params.id;
    const updatedData = req.body;
    const response = await Menu.findByIdAndUpdate(menuId, updatedData, {
        new: true,
        runValidators : true
    })
    if(!response){
        return res.status(404).json({Error:"Menu Not Found"});
    }
    console.log("Data Updated");
    res.status(200).json(response);
  }catch(err){
    console.log(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
})
router.delete("/:id", async (req,res) => {
    try{
        const menuId = req.params.id;
        const response = await Menu.findByIdAndDelete(menuId);
        if(!response){
            return res.status(404).json("Menu Not Found");
        }
        console.log("Deleted Successfully");
        res.status(200).json("Deleted");
    }catch(err){
        console.log(err);
        res.status(500).json({ error: "Internal Server Error" });
      }
})
module.exports = router;
