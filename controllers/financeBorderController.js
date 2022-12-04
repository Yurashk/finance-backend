const Border = require("../models/Border")
const User = require("../models/User")

class borderController {
    async createBorderItem(req, res) {
        try {
            const {name, ownerEmail,goal} = req.body; // get params from request
            const user = await User.findOne({'email': ownerEmail});
            if (!user) {
                return res.status(404).json({message: `Пользователя с ${ownerEmail} не существует`})
            }
            const border = new Border({
                name,
				ownerEmail,
                goal,
                users: [{"name": user.name, "email": user.email}],
                spendMoney: []
            }); // create user
            await border.save(); // save user
            user.borders.push({name: name, id: border._id, borderOwnerEmail:ownerEmail});
            await user.save();
            return res.json(user)
        } catch (e) {
            res.status(400).json(e)
        }
    }

    async getBorderById(req, res) {
        try {
            const id = req.params.id;
            let border = await Border.findById(id)
            if (!border) {
                return res.status(404).json({message: `Такої дошки не існує`})
            }
            res.json(border)
        } catch (e) {
            console.log(e)
        }
    }
    async changeBorderItemsById(req, res) {
        try {
            const {id, spendMoney} = req.body;
            let border = await Border.findById(id)
            if (!border) {
                return res.status(404).json({message: `Такої дошки не існує`})
            }
            border.spendMoney.push(spendMoney);
            await border.save();
            res.json(border)
        } catch (e) {
            console.log(e)
        }
    }

    async changeBorderGoalId(req, res) {
        try {
            const {id, goal, userEmail} = req.body;
            let border = await Border.findById(id)
            if (!border) {
                return res.status(404).json({message: `Такої дошки не існує`})
            } else if (border.ownerEmail !== userEmail) {
                return res.status(404).json({message: `Це не ваша дошка`})
            }
            border.goal = goal;
            await border.save();
            res.json(border)
        } catch (e) {
            console.log(e)
        }
    }

    async changeBorderUsersByUserEmail(req, res) {
        try {
            const {id, userEmail} = req.body;
            let border = await Border.findById(id);
            let user = await User.findOne({'email': userEmail});
            if (!user) {
                return res.status(404).json({message: `Пользователя с ${userEmail} не существует`})
            } else if (!border) {
                return res.status(404).json({message: `Такої дошки не існує`})
            }
            if (border.users.length && border.users.some(e => e.email === userEmail)) {
                return res.status(404).json({message: `Користувача вже додано до цієї дошки`})
            } else if (user.borders.length && user.borders.some(e => e.id === border.id)) {
                return res.status(404).json({message: `Користувача вже додано до цієї дошки`})
            }
            border.users.push({name: user.name, email: user.email});
            await border.save();
            user.borders.push({name: border.name, id: border.id});
            await user.save();
            res.json(border)
        } catch (e) {
            console.log(e)
        }
    }
}

module.exports = new borderController()
