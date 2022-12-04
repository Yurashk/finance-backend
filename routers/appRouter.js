const Router = require("express")
const appRouter = new Router()
const financeBorderController = require("../controllers/financeBorderController")
const userController = require("../controllers/userController")
const {check} = require("express-validator")
const authMiddleware = require("../middleware/authMiddleware")


appRouter.patch("/addBorderFinanceOperation", authMiddleware, financeBorderController.changeBorderItemsById)
appRouter.patch("/addBorderUsers", authMiddleware, financeBorderController.changeBorderUsersByUserEmail)
appRouter.patch("/changeBorderGoal", authMiddleware, financeBorderController.changeBorderGoalId)
appRouter.post("/borderCreate", [check("name", "name не может быть пустым").notEmpty()], authMiddleware, financeBorderController.createBorderItem)
appRouter.get("/getUserById/:id", authMiddleware, userController.getUserByEmail)
appRouter.get("/getBorderById/:id", authMiddleware, financeBorderController.getBorderById)


module.exports = appRouter
