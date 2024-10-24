// import express from 'express';
// import errorHandler from './middleware/errorHandler.js';
// import productRouter from './routes/Product/Product.routes.js';
// import { connectDB } from './DataBase/DbConnection.js';
// import carrelloRouter from './routes/cart/cart.routes.js';
// import userRouter from './routes/User/user.routes.js';
// import categoryRouter from './routes/Category/category.routes.js';
// import cors from 'cors';

// const server = express();
// server.use(express.json());

// const corsOption = {
//     origin: '*'
// }
// console.log('test for git graph')
// server.use(cors(corsOption))

// server.get('/', (req, res) => {
//     return res.send('hello world');
// });

// server.use('/products', productRouter); // Usa il router per le rotte dei prodotti
// server.use('/cart', carrelloRouter) //usa il router per le rotte del carrello
// server.use('/user', userRouter)
// server.use('/category', categoryRouter)

// server.use(errorHandler);

// const PORT = +(process.env.PORT || 3000);

// const startServer = async () => {
//     try {
//         await connectDB(); // Connessione al database prima di avviare il server
//         server.listen(PORT, () => {
//             console.log(`Server listening at http://localhost:${PORT}`);
//         });
//     } catch (error) {
//         console.error('Failed to start server:', error);
//     }
// };

// startServer();
console.log('test')
import express from 'express';
import errorHandler from './middleware/errorHandler.js';
import productRouter from './routes/Product/Product.routes.js';
import { connectDB } from './DataBase/DbConnection.js';
import carrelloRouter from './routes/cart/cart.routes.js';
import userRouter from './routes/User/user.routes.js';
import categoryRouter from './routes/Category/category.routes.js';
import cors from 'cors';
import swaggerUi from 'swagger-ui-express';
import getSwaggerDocument from './routes/swaggerDoc/swagger.routes.js';


const server = express();
server.use(express.json({limit: '200mb'}));

const corsOption = {
    origin: '*'
};

// Get Swagger document from the new module
const swaggerDocument = getSwaggerDocument();

server.use(cors(corsOption));

server.get('/', (req, res) => {
    return res.send('hello world');
});

server.use('/products', productRouter);
server.use('/cart', carrelloRouter);
server.use('/user', userRouter);
server.use('/category', categoryRouter);
server.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

server.use(errorHandler);

// const PORT = +(process.env.PORT || 3000);

// const startServer = async () => {
//     try {
//         await connectDB();
//         // server.listen(PORT, () => {
//         //     console.log(`Server listening at http://localhost:${PORT}`);
//         // });
//         module.exports = (req, res) => {
//             server(req, res); // Integrazione con Vercel
//           };
//     } catch (error) {
//         console.error('Failed to start server:', error);
//     }
// };

// // startServer();

module.exports = async (req, res) => {
    try {
        await connectDB();
        server(req, res); // Integrazione con Vercel
        
    } catch (error) {
        console.error('Failed to start server:', error);
    }
  };