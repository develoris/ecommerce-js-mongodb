import express from 'express';
import errorHandler from './middleware/errorHandler.js';
import productRouter from './Prodotti/Product.root.js';
import { connectDB } from './DataBase/DbConnection.js';
import carrelloRouter from './cart/cart.root.js';

const server = express();
server.use(express.json());

server.get('/', (req, res) => {
    return res.send('hello world');
});

server.use('/products', productRouter); // Usa il router per le rotte dei prodotti
server.use('/cart', carrelloRouter) //usa il router per le rotte del carrello

server.use(errorHandler);

const PORT = +(process.env.PORT || 3000);

const startServer = async () => {
    try {
        await connectDB(); // Connessione al database prima di avviare il server
        server.listen(PORT, () => {
            console.log(`Server listening at http://localhost:${PORT}`);
        });
    } catch (error) {
        console.error('Failed to start server:', error);
    }
};

startServer();