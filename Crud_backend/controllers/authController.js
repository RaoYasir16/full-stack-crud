const { auth } = require('../models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


const register = async (req, res) => {
    try {
        const existUser = await auth.findOne({ where: { email: req.body.email } });
        if (existUser) {
            return res.status(403).json({
                message: "Email already register"
            })
        }

        const hashPassword = await bcrypt.hash(req.body.password, 10);

        const user = await auth.create({
            name: req.body.name,
            email: req.body.email,
            password: hashPassword
        });

        return res.status(201).json({
            user
        })
    } catch (error) {
        return res.status(500).json({
            message: error.message
        })
    }
}

const login = async (req, res) => {
    try {
        const existUser = await auth.findOne({ where: { email: req.body.email } });
        if (!existUser) {
            return res.status(404).json({
                message: "Email not register"
            })
        }

        const isMatch = await bcrypt.compare(req.body.password, existUser.password);

        if (!isMatch) {
            return res.status(403).json({
                message: "Invalid email or password"
            })
        }

        const token = jwt.sign(
            { id: existUser.id, email: existUser.email },
            process.env.JWT_SECRET,
            { expiresIn: "1h" }
        );

        return res.status(200).json({token});


    } catch (error) {
        return res.status(500).json({
            message: error.message
        })
    }
}


module.exports = { register, login }