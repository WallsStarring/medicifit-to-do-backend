// socketConfig.js

const socketIo = require('socket.io');

function configureSocket(server) {
    const io = socketIo(server, {
        cors: {
            origin: '*',
            methods: ['GET', 'POST'],
            allowedHeaders: ['Content-Type'],
            credentials: true,
        }
    });
    io.on('connection', (socket) => {
        console.log('New client connected:', socket.id);
    });
    return io;
}

module.exports = configureSocket;
