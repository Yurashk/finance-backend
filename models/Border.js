const {Schema, model} = require("mongoose")

const Border = new Schema({
	name: {type: String, required: true},
	ownerEmail: {type: String, required: true},
	goal: {type: String, required: true},
	users: [{
		name: {type: String, required: true},
		email: {type: String, required: true}
	}],
	spendMoney: [{
		date: {type: String, required: true},
		price: {type: String, required: true},
		forWhat: {type: String, required: true},
		who:{type: String, required: true}
	}],
})

module.exports = model("Border", Border)
