import express from 'express';
import 'dotenv/config';
import logMiddleware from './middlewares/log.middleware.js';
import admins from './routes/admins.route.js';
import atlasConnection from './database/mongo-connection.js';
import notes from './routes/notes.route.js'
import users from './routes/users.route.js'
//import Note from './models/note.js';

//import bcrypt from 'bcrypt';

await atlasConnection();

const port = process.env.PORT;
const app = express();

app.use(express.json());
app.use(logMiddleware);
app.use(admins);
app.use(notes);
app.use(users);
/*
app.get('/api/notes', async (request, response) =>{
  try {
    const notes = await Note.find({});
    response.status(200).json({
      status: 'success',
      data: notes,
    });
  } catch (error) {
    response.status(404).json({
      status: 'fail',
      message: 'Notes not found'
    });
  }
});*/




if (process.env.NODE_ENV !== 'test') {
  app.listen(port, () => console.log(`Server listening on port ${port}`));
}

export default app;
