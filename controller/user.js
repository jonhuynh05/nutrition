const express = require("express")
const router = express.Router()
const User = require("../models/Users")
const bcrypt = require("bcryptjs")

router.post("/register", async (req, res) => {
    try{
        const foundEmail = await User.findOne({
            email: req.body.email
        })
        if(foundEmail){
            res.json({
                message: "Email already exists."
            })
        }
        else{
            const userDbEntry = {}
            const password = req.body.password
            const hashPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10))
            userDbEntry.firstName = req.body.firstName
            userDbEntry.lastName = req.body.lastName
            userDbEntry.username = req.body.username
            userDbEntry.email = req.body.email
            userDbEntry.password = hashPassword
            console.log(userDbEntry)
        }
    }
    catch(err){
        res.send(err)
        console.log(err)
    }
})

module.exports = router