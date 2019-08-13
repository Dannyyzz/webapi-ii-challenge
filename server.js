const express = require("express");
const posts = require("./routes/posts");


const server = express();

server.use(express.json()); 

server.use('/api/posts', posts);

module.exports = server;