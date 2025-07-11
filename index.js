import express from 'express';
import cors from "cors";
import productsRouter from "./src/routes/products.router.js";
const app = express();

try{
      
   app.use(express.json());
   app.get("/", (req, res) => {
      res.json({ message: "API Rest en Node.js" });
   });
   app.use(express.urlencoded({extended:true}));
   app.use("/api", productsRouter);
   app.use((req, res, next) => {
      res.status(404).json({ error: "Not Found" });
   });
  
    app.use(cors);
   // Inicio el servidor con npm run dev
   const PORT = 3000;
   app.listen(PORT, () => console.log('http://localhost:${PORT}'));

} catch(error){
      console.log(error);
}


 