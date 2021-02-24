const Router = require("express")
const User = require("../models/User")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const config = require("config")

const {check, validationResult} = require("express-validator")

const authMiddleware = require("../middleware/auth.middleware")
const fileService = require("../services/fileService")
const File = require("../models/File")

const router = new Router()


router.post(
    '/reg',
    [
        check('email', "Uncorrect email").isEmail(),
        check('password', "Password must be longer than 3 and shorter than 12").isLength({min: 3, max: 12})
    ],
    async(req, res) => {
    try {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).json({message: "Uncorrect request", errors})
        }

        const {email, password} = req.body

        const candidate = await User.findOne({email})
        if(candidate) {
            return res.status(400).json({
                message: `User with email ${email} arleady exist`
            })
        }

        const hashPassword = await bcrypt.hash(password, 8)

        const user = await new User({email, password: hashPassword})
        await user.save()
        await fileService.createDir(new File({user: user.id, name: ''}))

        return res.json({
            message: "User was created!",
            email,
            password
        })
    } catch (e) {
        console.log('Error:', e)
        res.send({message: `Error - ${e}`})
    }
})

router.post(
    '/login',
    async(req, res) => {
        try {
            const {email, password} = req.body

            const user = await User.findOne({email})
            if(!user) {
                return res.status(404).json({message: `User with email ${email} not found`})
            }

            const isPasswordValid = bcrypt.compareSync(password, user.password)
            if(!isPasswordValid) {
                return res.status(400).json({message: "Invalid password"})
            }

            const token = jwt.sign({id: user.id}, config.get("secretKey"), {expiresIn: "1h"})
            return res.json({
                message: "Token uploaded",
                token,
                user: {
                    id: user.id,
                    email: user.email,
                    diskSpace: user.diskSpace,
                    usedSpace: user.usedSpace,
                    avatar: user.avatar
                }
            })
        } catch (e) {
            console.log('Error:', e)
            res.send({message: `Error - ${e}`})
        }
    })

router.get(
    '/auth',
    authMiddleware,
    async(req, res) => {
        try {
            const user = await User.findOne({_id: req.user.id})
            const token = jwt.sign({id: user.id}, config.get('secretKey'), {expiresIn: '1h'})
            return res.json({
                token,
                user: {
                    id: user.id,
                    email: user.email,
                    diskSpace: user.diskSpace,
                    usedSpace: user.usedSpace,
                    avatar: user.avatar
                }
            })
        } catch (e) {
            console.log('Error:', e)
            res.send({message: `Error - ${e}`})
        }
    })


module.exports = router