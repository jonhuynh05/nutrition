require('dotenv').config()
const express = require("express")
const path = require("path")
const app = express()
const methodOverride = require("method-override")
const bodyParser = require("body-parser")
const session = require("express-session")
const fetch = require("node-fetch")
const PORT = process.env.PORT || 8000
const key = process.env.API_KEY
const bcrypt = require("bcryptjs");
console.log(key, "this is the key")

require("./config/db")

app.use(express.static(path.join(__dirname, "build")))
app.use(session({
    secret: "little secrets",
    resave: false,
    saveUninitialized: false
}))
app.use(methodOverride("_method"));
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}));

app.listen(PORT, () => {
    console.log(`Running on PORT ${PORT}.`)
})