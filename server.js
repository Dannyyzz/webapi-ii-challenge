const express = require("express");

const posts = require('./routes/posts');

const server = express();

server.use(express.json()); 

server.use('/posts', posts);

module.exports = server;