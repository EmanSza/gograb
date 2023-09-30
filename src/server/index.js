const server = require('./server');
const startElectron = require('./utility/electron');


server.listen(3000, () => {
    console.log('Server listening on port 3000');
});

startElectron();