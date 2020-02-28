const express = require("express")
const router = express.Router()
const User = require("../models/Users")
const bcrypt = require("bcryptjs")

router.post("/login", async (req, res) => {
    try{
        console.log("this hits")
        console.log(req.body, "login body")
    }
    catch(err){
        res.send(err)
        console.log(err)
    }
})

router.post("/register", async (req, res) => {
    try{
        const foundEmail = await User.findOne({
            email: req.body.email
        })
        const foundUsername = await User.findOne({
            username: req.body.username
        })
        if(foundEmail){
            res.json({
                message: "Email already exists."
            })
        }
        else if (foundUsername) {
            res.json({
                message: "Username already exists."
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
            const newUser = await User.create(userDbEntry)
            req.session.firstName = newUser.firstName
            req.session.email = newUser.email
            req.session.username = newUser.username
            res.json({
                firstName: req.session.firstName,
                email: req.session.email,
                username: req.session.username,
                message: "Success."
            })
        }
    }
    catch(err){
        res.send(err)
        console.log(err)
    }
})

module.exports = router