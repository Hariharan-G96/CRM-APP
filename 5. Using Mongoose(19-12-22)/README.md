# Steps to use Mongoose

1. Install Mongoose
   cd ./5. Using Mongoose(19-12-22)
   npm i mongoose --save

   npm init

2. Import Mongoose module
   const mongoose = require('mongoose')

3. Connect to Mongoose from program file
   mongoose.connect("mongodb://localhost:27017/", 
    () => {console.log("Connected To MongoDB")}, 
    err => {console.log("Error : ", err.message)})

4. Create Data Model
   i. new mongoose.schema()
   ii. new mongoose.model()
   let cars = mongoose.model('Cars', mongoose.Schema({ brand: String, model: String }))

5. Do CRUD operations on Data Model
   cars.create({
             brand : "Maruti Suzuki", 
             model : "Swift"
            })
    .then(data => console.log(data))
    .catch(err => console.log(err))