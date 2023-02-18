const express = require("express");
const router = express.Router();
const SMS = require('../controller/twilio.controller')
const Joi = require('joi');
const UserController = require("../controller/User.controller")
const bcrypt = require('bcrypt')
const KEY = process.env.JWT_KEY;
const {MESSAGE_RESPONSE_CODE,MESSAGE_RESPONSE} = require('../lib/constants')
const jwt = require('jsonwebtoken');


router.post("/create",async (req,res)=>{
    try {
        const schema = Joi.object({
            name:Joi.string().required(),
            email:Joi.string().required(),
            lastname:Joi.string().required(),
            password:Joi.string().required(),
            username:Joi.string().required(),
            birthdate:Joi.string().required(),
            telephone:Joi.string().required(),
            dialcode:Joi.string().required(),
        })
        
        const {name,lastname,username,birthdate,telephone,email,password,dialcode} = await schema.validateAsync(req.body)
        const salt = await bcrypt.genSalt(10);
        const encodedPassword = await bcrypt.hash(password, salt);

       let newUser = await UserController.createUser(name,lastname,username,birthdate,telephone,email,encodedPassword,dialcode)

       return res.status(MESSAGE_RESPONSE_CODE.CREATED).json({
        message:MESSAGE_RESPONSE.CREATED,
        status:MESSAGE_RESPONSE_CODE.CREATED,
        data:newUser
       })
    } catch (error) {
        console.log(error);  
        return res.status(MESSAGE_RESPONSE_CODE.BAD_REQUEST).json({
            message:MESSAGE_RESPONSE.BAD_REQUEST,
            status:MESSAGE_RESPONSE_CODE.BAD_REQUEST,
            error:error
           })
    }
})

router.get("/:id",async (req,res)=>{ 
    try {
        const {id} = req.params
        
        let user = await UserController.getUserId(id)

        return res.status(MESSAGE_RESPONSE_CODE.CREATED).json({
            message:MESSAGE_RESPONSE.CREATED,
            status:MESSAGE_RESPONSE_CODE.CREATED,
            data: user
           })

    } catch (error) {
        console.log(error);  
        return res.status(MESSAGE_RESPONSE_CODE.BAD_REQUEST).json({
            message:MESSAGE_RESPONSE.BAD_REQUEST,
            status:MESSAGE_RESPONSE_CODE.BAD_REQUEST,
            error:error
           })
    }
})

router.post("/login",async(req,res)=>{
    try {
        const KEY = process.env.JWT_KEY;
        const schema = Joi.object({
            email:Joi.string().required(),
            password:Joi.string().required()
 
        })
        
        const {email,password} = await schema.validateAsync(req.body)

        const user = await UserController.getUserEmail(email)

        if (!user) {
            res.status(MESSAGE_RESPONSE_CODE.NOT_FOUND).json({ status: MESSAGE_RESPONSE_CODE.NOT_FOUND, error: MESSAGE_RESPONSE.NOT_FOUND });
        }else {
            bcrypt.compare(password, user.password).then(isMatch => {
                /* User matched */
                if (isMatch) {
                    /* Create JWT Payload */
                    const payload = {
                        id: user._id,
                        email: user.email,
                        name:user.name
                    };

                    /* Sign token */
                    jwt.sign(
                        payload,
                        KEY,
                        {
                        expiresIn: '1h' ,
                        },
                        (err, token) => {
                        /* Send succes with token */
                           return res.status(MESSAGE_RESPONSE_CODE.OK).json({
                                success: true,
                                token: token,
                            });
                        },
                    );

                } else {
                    /* Send error with message */
                    return res.status(400).json({ status: 'error', error: 'Credenciales incorrectas.' });
                }
            });
        }
    } catch (error) {
        console.log(error);  
        return res.status(MESSAGE_RESPONSE_CODE.BAD_REQUEST).json({
            message:MESSAGE_RESPONSE.BAD_REQUEST,
            status:MESSAGE_RESPONSE_CODE.BAD_REQUEST,
            error:error
           })
    }
})

module.exports = router;