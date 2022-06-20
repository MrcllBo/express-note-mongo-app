import express from 'express';
import { body } from 'express-validator';
import { validationResult } from 'express-validator';
import User from '../models/user.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import JWTauthMiddleware from '../middlewares/jwt.middleware.js';

const usersRoute = express.Router();

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



usersRoute.get('/api/users', JWTauthMiddleware, async (request, response) => {
    try {
        //migliore rispetto all'altra, fatta da Simone
        const users = await User.find({}).select([
            'username', 'email', 'active'
        ]);
        //peggiore, ma utilizzabile
        /*const newUsers= users.map((users)=>{
            const {_id, username, email, active} = users
            return {_id, username, email, active}
        })*/
        return response.status(200).json({
            status: 'success',
            data: users,
        })
    } catch (err) {
        return response.status(404).json({
            status: 'fail',
            data: err.toString(),
        })
    }
})


usersRoute.post('/api/registration',
    body('username').isLength({ min: 4, max: 50 }),
    body('email').isEmail(),
    body('password').isLength({ min: 8, max: 50 }),
    async (request, response) => {

        const errors = validationResult(request);
        if (!errors.isEmpty()) {
            return response.status(400).json({
                status: 'fail',
                errors: errors.array(),
            })
        }

        const encyptedPassword = await bcrypt.hash(request.body.password, 12)

        try {
            const user = new User({
                username: request.body.username,
                email: request.body.email,
                password: encyptedPassword,
            });

            //user.password=await bcrypt.hash(user.password, 12)

            await user.save();

            delete user.password;
            delete user._id;

            //console.log(user.password=await bcrypt.hash(user.password, 12));
            return response.status(201).json({
                status: 'success',
                data: {
                    username: user.username,
                    email: user.email,
                    active: user.active,
                }
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
    body('password').isLength({ min: 8, max: 50 }),
    async (request, response) => {

        const errors = validationResult(request);

        if (!errors.isEmpty()) {
            return response.status(400).json({
                status: 'fail',
                errors: errors.array(),
            })
        }

        try {
            const user = await User.findOne({ email: request.body.email });



            const decryptedPassword = await bcrypt.compare(request.body.password, user.password);

            const result = decryptedPassword ? 'password corretta' : 'password sbagliata'
            console.log(decryptedPassword)
            console.log(user)

            const userJWT = {
                _id: user._id,
                username: user.username,
                email: user.email,
                active: user.active,
            }
            const JWToken = jwt.sign(userJWT, process.env.JWT_SECRET, {
                expiresIn: 3600, //ms
            });

            return response.status(201).json({
                status: 'success',
                token: JWToken,
                passwordCheck: result,
                data: userJWT
            })
        } catch (err) {
            console.log(err)
            return response.status(404).json({
                status: 'fail',
            })
        }

    }
)

export default usersRoute;