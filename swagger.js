const swaggerAutogen = require('swagger-autogen')();

const doc = {
    info: {
        title: 'My Equestrian API',
        description: 'Equestrian API'
    },
    host: 'https://cse342v2-node-project2.onrender.com',
    schemes: ['http', 'https']
};

const outputFile = './swagger.json';
const endpointsFiles = ['./routes/index.js'];

// generate swagger.json
swaggerAutogen(outputFile, endpointsFiles, doc);

// Run server after it gets generated
// swaggerAutogen(outputFile, endpointsFiles, doc).then(async () => {
//   await import('./index.js');
// });
