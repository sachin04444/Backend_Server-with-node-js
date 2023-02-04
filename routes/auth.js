import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"

import { User } from "../Models/userSchma.js";
const router = express.Router();

router.get('/', (req, res) => {
    res.send("Home page")
})





router.post("/register", async (req, res) => {
    const { name, email, phone, work, password, cpassword } = req.body

    if (!name || !email || !phone || !work || !password || !cpassword) {
        return res.status(402).json({ error: "plz filled the filed property " })
    }

    try {
        const userExist = await User.findOne({ email: email })
        if (userExist) {
            return res.status(422).json({ error: "Email alredy Exist" })
        } else if (password != cpassword) {
            return res.status(422).json({ error: "password not match" })
        } else {
            const user = new User({ name, email, phone, work, password, cpassword })

            const userRagister = await user.save()

            if (userRagister) {
                res.status(201).json({ message: "user Ragister succesfully" })
            } else {
                res.status(500).json({ error: "Failed " })
            }
        }

    } catch (erro) {
        console.log(erro)
    }
})


//login Route 

router.post('/signin', async (req, res) => {
    try {
        let token;
        const { email, password } = req.body
        if (!email || !password) {
            return res.status(400).json({ error: "pls Filled " })
        }

        const userLogin = await User.findOne({ email: email })



        if (userLogin) {
            const ismatch = await bcrypt.compare(password, userLogin.password);
            token = await userLogin.generateAuthToken();
            console.log(token)
            res.cookie("jwttoken" , token,{
                expires:new Date(Date.now() + 2589000000),
                httpOnly:true
            })
            if (!ismatch) {
                res.status(400).json({ message: "user Error" })
            } else {
                res.json({ message: "user Signin succesfully" })
            }
        } else {
            res.status(400).json({ message: "invalid cradiential" })
        }

    } catch (error) {
        console.log(error)
    }
})

export default router;