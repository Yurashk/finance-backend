const Router = require("express")
const router = new Router()
const controller = require("../controllers/authController")
const {check} = require("express-validator")
const authMiddleware = require("../middleware/authMiddleware")

router.post("/registration",
    [check("email", "Телефон не може бути порожнім").notEmpty(),
        check("password", "Пароль должен быть длинее 4 и короче 26 символов").isLength({min: 4, max: 30})],
    controller.registration
)
router.post("/login", controller.login)
router.get("/users", authMiddleware, controller.getUsers)


module.exports = router
