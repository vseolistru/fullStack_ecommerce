import User from '../models/User.js';
import bcrypt from 'bcryptjs';
import {v4} from 'uuid';
import mailService from "../service/mailService.js";
import {generateToken} from "../utils.js";

const strongPassword = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})");
const emailValidator = new RegExp("^([A-Za-z0-9_\\-\\.])+\\@([A-Za-z0-9_\\-\\.])+\\.([A-Za-z]{2,4})");

class UserCtrls {
    //register
    async registration(req, res) {
        try {
            const {username, email, password} = req.body
            if (!email || !password || !username) {
                return res.status(406).json({message: 'Значения полей username, email и password не должны быть пустыми'})
            }
            if (!emailValidator.test(email)) {
                return res.status(406).json({message: 'Email должен содержать - @ и домен'})
            }
            if (password.length < 8) {
                return res.status(406).json({message: 'Пароль должен содержать 8 символов'})
            }
            if (!strongPassword.test(password)) {
                return res.status(406).json({message: 'Пароль должен содержать 1 спецсимвол, 1 символ верхнего регистра, 1 число'})
            }
            const candidate = await User.findOne({email})
            if (candidate) {
                return res.status(409).send({message: 'Пользователь с таким email уже существует'})
            }

            const hashPassword = await bcrypt.hashSync(password);
            const activationLink = v4();
            await mailService.sendActivationMail(email, `${process.env.API_URL}/api/users/activate/${activationLink}`);
            const user = await User.create({email, username, activationLink, password: hashPassword});
            const token = generateToken(user)
            return res.json({...user._doc, token});
        } catch (e) {
            res.status(500).json("Something went wrong");
        }
    }

    async activate (req, res) {
        try {
            const activationLink = req.params.link
            const userLink = await User.findOne({activationLink})
            if (!userLink) {
                res.status(500).json('Некорректная ссылка')
            }
            userLink.isActivated = true
            await userLink.save()
            return res.redirect('http://localhost:3000/')
        } catch (e) {
            res.status(500).json('is not saved')
        }
    }
}

export default new UserCtrls();

