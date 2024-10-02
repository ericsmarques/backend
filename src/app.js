const express = require('express');
const { engine } = require('express-handlebars');
const path = require('path');
const http = require('http');
const socketIO = require('socket.io');
const ProductManager = require('./ProductManager');

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

const productManager = new ProductManager();

// Configurar Handlebars como o template engine
app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, '../views'));

// Middleware para servir arquivos estáticos (css, js, etc.)
app.use(express.static(path.join(__dirname, '../public')));

// Rota para a página inicial (Home)
app.get('/', (req, res) => {
    const products = productManager.getProducts();
    res.render('home', { products });
});

// Rota para a página com WebSocket (RealTime Products)
app.get('/realtimeproducts', (req, res) => {
    const products = productManager.getProducts();
    res.render('realTimeProducts', { products });
});

// Socket.io - Atualização em tempo real
io.on('connection', (socket) => {
    console.log('Novo cliente conectado!');

    // Enviar a lista atual de produtos quando um novo cliente se conecta
    socket.emit('updateProducts', productManager.getProducts());

    // Escutar quando um produto for adicionado ou removido e enviar para todos os clientes
    socket.on('newProduct', (product) => {
        productManager.addProduct(product);
        io.emit('updateProducts', productManager.getProducts());
    });

    socket.on('deleteProduct', (productId) => {
        productManager.deleteProduct(productId);
        io.emit('updateProducts', productManager.getProducts());
    });
});

const PORT = 8080;
server.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});