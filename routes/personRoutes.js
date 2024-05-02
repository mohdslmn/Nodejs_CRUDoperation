const express = require("express");
const router = express.Router();
const Person = require("./../models/Person");

router.post("/", async (req, res) => {
  try {
    // req.body contains person data
    const data = req.body; 

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
router.post("/:workType", async (req, res) => {
  try {
    const workType = req.params.workType;
    //applying validation
    if (
      workType === "chef" ||
      workType === "manager" ||
      workType === "waiter"
    ) {
      const response = await Person.find({ work: workType });
      console.log("response fetched");
      res.status(200).json(response);
    } else {
      res.status(404).json({ Error: "Invalid Work Type" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ Error: "internal Server Error" });
  }
});
router.get("/", async (req, res) => {
  try {
    const data = await Person.find();
    console.log("data fetched");
    res.status(200).json(data);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal server error" });
  }
});
router.put("/:id", async (req, res) => {
  try {
    const personId = req.params.id;
    const updatedData = req.body;
    const response = await Person.findByIdAndUpdate(personId, updatedData, {
      new: true, // run the updated document
      runValidators: true, //follow all validations
    });
    //if response === null
    if (!response) {
      return res.status(404).json({ Error: "Person Not found" });
    }
    console.log("data updated");
    res.status(500).json(response);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal server error" });
  }
});
router.delete("/:id", async (req,res) => {
  try{
    const personId = req.params.id;
    const response = await Person.findByIdAndDelete(personId);
    if(!response){
      return res.status(404).json("Person Not Found");
  }
  console.log("Deleted Successfully");
  res.status(200).json("Deleted");
  }catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal server error" });
  }
})
module.exports = router;
