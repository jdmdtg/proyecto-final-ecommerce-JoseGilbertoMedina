import express from 'express';
// import { join, dirname } from 'path';
// import { fileURLToPath } from 'url';

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = dirname(__filename);

const app = express();

// app.use(express.static(join(__dirname, 'ping')));

// app.get('/ping', (req, res) => {
//     res.statusCode = 200;
//     res.setHeader('Content-Type', 'text/plain');
//     // res.send("pong");
// });
const products = [
   {id: 1, nombre: "producto1", precio: 10.0, cantidad: 100},
   {id: 2, nombre: "producto1", precio: 20.0, cantidad: 200},
   {id: 3, nombre: "producto1", precio: 30.0, cantidad: 300},

];
app.get("/", (req, res) => {
   res.json({ message: "API Rest en Node.js" });
});

app.get("/products", (req, res) => {
   res.json(products);
});

app.get("/products/:id", (req, res) => {
   const  product = products.find((item) => item.id == req.params.id);
  
   if (!product){
      res.status(404).json({ error: "Producto no encontrado." });
   }

   res.json(product);
});

app.get("/products/search", (req, res) => {})


const PORT = 3000;
app.listen(PORT, () => console.log('http://localhost:${PORT}'));
