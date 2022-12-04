const User = require("../models/User")
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken")
const {validationResult} = require("express-validator")
const {secret} = require("../config")

const generateAccessToken = (id, email,borders) => {
    const payload = {
        id,
        email,
        borders
    }
    return jwt.sign(payload, secret, {expiresIn: "48h"})
}

class authController {

    async registration(req, res) {
        try {
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                return res.status(400).json({message: "ошибка при регистрации", errors})
            }
            const {email, password,name} = req.body; // get params from request
            const candidate = await User.findOne({email})
            if (candidate) { // check if candidate already exist
                return res.status(400).json({message: "Пользователь с таким Email уже существует"})
            }
            const hashPassword = bcrypt.hashSync(password, 5); // hash password

            const user = new User({email,name, password: hashPassword,borders:[]}); // create user
            await user.save() // save user
            return res.json({message: "Пользователь успешно зарегестрирован"})
        } catch (e) {
            console.log(e);
            res.status(400).json(e)

        }
    }

    async login(req, res) {
        try {
            const {email, password} = req.body; // get params from request
            const user = await User.findOne({email});
            if (!user) {
                return res.status(404).json({message: `Пользователя с ${email} не существует`})
            }
            const validPassword = bcrypt.compareSync(password, user.password)
            if (!validPassword) {
                return res.status(400).json({message: `Пароль не верный`})
            }
            // const token = jwt.sign({id: user.id}, config.get('secret'),{expiresIn: "1h"})
            const token = generateAccessToken(user._id)

            return res.json({
                access_token: token
            })
        } catch (e) {
            console.log(e);
            res.status(400).json({message: "Login error"})
        }
    }

    async getUsers(req, res) {
        try {
            const users = await User.find()
            res.json(users)
        } catch (e) {
            console.log(e)
        }
    }

}

module.exports = new authController()
