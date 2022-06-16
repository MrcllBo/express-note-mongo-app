import express from 'express';

const usersRoute=express.Router();

/*
usersRoute.post('/api/register', async (request, response) => {
    //validazione
    asybn (request, response)=>{

    }
    //errore della validazione
    
    
    
    const user= 'utente creato';

    return response.status(201).json({
        status: 'success',
        data: user,
    });
});*/


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

})

export default usersRoute;