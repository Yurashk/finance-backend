const {Schema, model} = require("mongoose")

const User = new Schema({
    email: {type: String, require: true, index:true, unique:true,sparse:true},
    name: {type: String, required: true},
    password: {type: String, required: true},
    borders: [{
        name: {type: String, required: true},
        borderOwnerEmail:{type: String},
        id: {type: String, required: true},
    }],
})

module.exports = model("User", User)
