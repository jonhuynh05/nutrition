const express = require("express")
const router = express.Router()
const User = require("../models/Users")
const bcrypt = require("bcryptjs")

router.post("/register", async (req, res) => {
    try{
        console.log("this hits")
    }
    catch(err){
        res.send(err)
        console.log(err)
    }
})

module.exports = router