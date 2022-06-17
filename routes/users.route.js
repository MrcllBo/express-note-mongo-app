import express from 'express';
import { body } from 'express-validator';
import { validationResult } from 'express-validator';
import User from '../models/user.js'
import bcrypt from 'bcrypt'

const usersRoute=express.Router();

/*
usersRoute.post('/api/register', async (request, response) => {
    //validazione
    async (request, response) => {

    }
    //errore della validazione
    
    
    
    const user= 'utente creato';

    return response.status(201).json({
        status: 'success',
        data: user,
    });
});


usersRoute.post('/api/register', 
body('username').isLength({min: 1, max:50}),
body('email').isLength({min:5, max:30}),
body('password').isLength({min:8, max:20}), 
async (request, response) =>{

    const errors = validationResult(request);
    if(!errors.isEmpty()){
        return response.status(400).json({
            status: 'fail',
            errors: errors.array(),
        })
    }
    const encryptedPassword= await bcrypt.hash(request.body.password,12);
        try {
        const nota = new Note({
            user: request.body.username,
            email: request.body.email,
            password: encryptedPassword
        });
        await nota.save();

        return response.status(201).json({
            status: 'success',
            data: nota,
        })
    } catch (err) {
        return response.status(404).json({
            status: 'fail',
            data: err.toString(),
        })
    }

})*/



usersRoute.post('/api/registration', 
body('username').isLength({min: 4, max:50}),
body('email').isEmail(),
body('password').isLength({min:8, max:50}),
async (request, response) =>{

    const errors = validationResult(request);
    if(!errors.isEmpty()){
        return response.status(400).json({
            status: 'fail',
            errors: errors.array(),
        })
    }
    try {
        const user = new User({
            username: request.body.username,
            email: request.body.email,
            password: request.body.password,
        });

        user.password=await bcrypt.hash(user.password, 12)

        await user.save();

        //console.log(user.password=await bcrypt.hash(user.password, 12));
        return response.status(201).json({
            status: 'success',
            data: user,
        })
    } catch (err) {
        return response.status(404).json({
            status: 'fail',
            data: err.toString(),
        })
    }

})




usersRoute.post(
    '/api/login',
    body('email').isEmail(),
    body('password').isLength({min: 8, max: 50}),
    async (request,response) => {

        const errors = validationResult(request);

        if(!errors.isEmpty()){
            return response.status(400).json({
                status: 'fail',
                errors: errors.array(),
            })
        }

        const user = await User.find({email: request.body.email});

        const decryptedPassword = await bcrypt.compare(request.body.password, user[0].password);

        //let result = false;

        const result = decryptedPassword ? 'password corretta' : 'password sbagliata'
/*
        if(decryptedPassword === true){
            result= 'password corretta';
        } else {
            result = 'password sbagliata';
        }*/

        try {
            return response.status(201).json({
                status: 'success',
                data: result,
            })
        } catch (err) {
            return response.status(404).json({
                status: 'fail',
            })
        }

    }
)

export default usersRoute;