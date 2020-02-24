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
        const data = await fetch(`https://trackapi.nutritionix.com/v2/search/instant?query=${req.params.query}`,
            {
                "headers": {
                    "x-app-id": id,
                    "x-app-key": key
                }
            }
        )
        const searchResults = await data.json()
        console.log(searchResults, "this is the search results")
        let searchDropdownNames = []
        let searchDropdownIds = []
        for (let i = 0; i < searchResults.branded.length; i++) {
            searchDropdownNames.push(searchResults.branded[i].brand_name_item_name)
            searchDropdownIds.push(searchResults.branded[i].nix_item_id)
        }
        if(searchResults.branded.length === 0){
            res.json("No results.")
        }
        else{
            res.json({
                results: searchResults.branded[0], dropdown: searchDropdownNames, ids: searchDropdownIds
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
        const query = await fetch(`https://trackapi.nutritionix.com/v2/search/instant?query=${req.params.item}`,
            {
                "headers": {
                    "x-app-id": id,
                    "x-app-key": key
                }
            }
        )
        const queryJson = await query.json()
        const food = await fetch(`https://trackapi.nutritionix.com/v2/search/item?nix_item_id=${queryJson.branded[0].nix_item_id}`,
            {
                "headers": {
                    "x-app-id": id,
                    "x-app-key": key
                }
            }
        )
        const foodJson = await food.json()
        res.json(foodJson)
    }
    catch(err){
        res.json(err)
        console.log(err)
    }
})

app.listen(PORT, () => {
    console.log(`Running on PORT ${PORT}.`)
})