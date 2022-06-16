import express from 'express';
import axios from 'axios';
import fs from 'fs';

const adminsRoute = express.Router();
const noteLink = process.env.API_NOTES_LINK;
const keyLink = process.env.API_KEY_LINK;
const gitHubUser = process.env.GITHUB_USER;

adminsRoute.get('/', (request, response) =>
  response.status(200).json({
    success: true,
    message: 'Server Online',
  }),
);

adminsRoute.get('/init', async (request, response) => {
  const apiSecretResponse = await axios.get(`${keyLink}/${gitHubUser}`).then((r) => r.data);

  const apiSecret = apiSecretResponse.data;

  const notes = await axios({
    method: 'post',
    url: noteLink,
    data: { user: `${gitHubUser}` },
    headers: { token: `${apiSecret}` },
  }).then((res) => {
    return res.data;
  });

  fs.writeFileSync('database/githubnotes.json', JSON.stringify(notes));

  response.status(204).json({
    success: true,
  });
});

export default adminsRoute;
