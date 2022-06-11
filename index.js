const express = require('express');
const db = require('./queries')
const app = express();
const PORT = process.env.PORT || 3000
const cors = require("cors");
require('dotenv').config();
process.on('uncaughtException', function (err) {
  console.error(err);
  console.log("Node NOT Exiting...");
});
app.use(cors({
    origin:"*",
    methods:["GET","POST","PUT","DELETE"]
}))
app.use(express.json())

app.get('/', (request, response) => {
  response.json({ info: 'Welcome to the Comments API' })
 });

 //endpoints  to USERS table
 app.get('/comments', db.getUsers)
 app.get('/comments/:id', db.getUserById)
 app.post('/comments', db.createUser)
 app.put('/comments/:id', db.updateUser)
 app.delete('/comments/:id', db.deleteUser)

 app.listen(PORT, 
    ()=>console.log(`the server is alive on http://localhost:${PORT}`));
