import express from 'express';

const usersRoute=express.Router();

usersRoute.post('/api/register', async (request, response) => {
    const user= 'utente creato';

    return response.status(201).json({
        status: 'success',
        data: user
    })
});


export default usersRoute;