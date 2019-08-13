const server = require('./server.js');  

const port = 1337;

server.listen(1337, () => {
    console.log(`Listening to port ${port}`)
});