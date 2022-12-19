const mongoose = require('mongoose')

// To connect MongoDB with the node
mongoose.connect("mongodb://localhost:27017/", 
    () => {console.log("Connected To MongoDB")}, 
    err => {console.log("Error : ", err.message)})

let engineSchema = mongoose.Schema({horsePower : Number, CC : Number})

let carSchema = mongoose.Schema({brand : String, 
                                 model : {
                                    type : String,
                                    validate : {
                                        validator : s => s.length > 3,
                                        message : props => `${props.value} model name is too short`
                                    }
                                 },
                                 engine : engineSchema
                                })

let cars = mongoose.model('Cars', carSchema)

cars.create({
             brand : "Maruti Suzuki", 
             model : "Swift"
            })
    .then(data => console.log(data))
    .catch(err => console.log(err))

let id = mongoose.Types.ObjectId("63a0a651149c5fabd64018aa")

let update = cars.updateOne({_id : id},
                            {model : "Grand Vitara", $inc : {__v : 1}})

update.then(console.log).catch(console.log)

const search = async function(id){
    try{
        const myCar = await cars.findOne({_id : id})

        console.log(myCar)
    }catch(err){
        console.log(err)
    }
}

search(id).then(() => console.log("Car Found!!!"))