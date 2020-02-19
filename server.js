require('dotenv').config()
const express = require("express")
const path = require("path")
const app = express()
const methodOverride = require("method-override")
const bodyParser = require("body-parser")
const session = require("express-session")
const fetch = require("node-fetch")
const PORT = process.env.PORT || 8000
const id = process.env.API_ID
const key = process.env.API_KEY
const bcrypt = require("bcryptjs");
const User = require("./models/Users")

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
// app.use("/user", userController)

app.get("/api/v1/:query", async (req, res) => {
    try{
        console.log(req.params.query, "this is the query")
        const data = await fetch(`https://trackapi.nutritionix.com/v2/search/instant?query=${req.params.query}`,
            {
                "headers": {
                    "x-app-id": id,
                    "x-app-key": key
                }
            }
        )
        const searchResults = await data.json()
        console.log(searchResults)
        console.log (searchResults.common[0], "this is the first result")
        let searchDropdownNames = []
        for (let i = 0; i < searchResults.common.length; i++) {
            searchDropdownNames.push(searchResults.common[i].food_name)
        }
        console.log(searchResults, "this is backend data")
        if(searchResults.common.length === 0){
            res.json("No results.")
        }
        else{
            res.json({
                results: searchResults.common[0], dropdown: searchDropdownNames
            })
        }
    }
    catch(err){
        res.json(err)
        console.log(err)
    }
})

app.get("/api/v1/search/:item", async (req, res) => {
    try{
        console.log("item search hit")
    }
    catch(err){
        res.json(err)
        console.log(err)
    }
})

app.listen(PORT, () => {
    console.log(`Running on PORT ${PORT}.`)
})