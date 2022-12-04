const express = require("express")
const mongoose = require("mongoose")
const authRouter = require("./routers/authRouter")
const appRouter = require("./routers/appRouter")
const app = express()
const PORT = process.env.PORT || 5001
const corsMiddleware = require("./middleware/cors.middleware")
const path = require('path')

app.use(corsMiddleware)
app.use(express.json())
app.use("/auth", authRouter)
app.use("/app", appRouter)
app.use(express.static(path.join(__dirname, 'public')));

// const sslServer = https.createServer({
//
//     // key:fs.readFileSync(path.join(__dirname,'cert','key.pem')),
//     // cert:fs.readFileSync(path.join(__dirname,'cert','cert.pem'))
//     key: fs.readFileSync('/etc/letsencrypt/live/vag-cars.in.ua/privkey.pem'),
//     cert: fs.readFileSync('/etc/letsencrypt/live/vag-cars.in.ua/cert.pem'),
//     ca: fs.readFileSync('/etc/letsencrypt/live/vag-cars.in.ua/chain.pem'),
// }, app)

const start = async () => {
    try {
        await mongoose.connect(`mongodb+srv://yurii:92Ozuzud@cluster0.lqzqj9h.mongodb.net/?retryWrites=true&w=majority`)
        // sslServer.listen(5000, () => console.log(`server started at ${PORT} port`))
        app.listen(PORT, () => console.log(`server started at ${PORT} port`))
    } catch (e) {
        console.log(e)
    }
}

start()
