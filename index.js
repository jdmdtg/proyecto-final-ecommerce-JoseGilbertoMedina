import "dotenv/config";
import express from "express";
import cors from "cors";
const app = express();

// app.use((req, res, next) => {
//   res.json({ message: "Fuera de Servicio, En este momento estamos haciendo mantenimiento. Perdone las molestias." });
// });

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({ message: "Biendvenido a la API REST" });
});

// importamos las rutas products   
import productsRouter from "./src/routes/products.router.js";
app.use("/api", productsRouter);

// importamos las rutas auth
// (authentication, login, register, etc.)
import authRouter from "./src/routes/auth.router.js";
app.use('/api', authRouter);
// app.use("/api", authRouter);
//prevenimos para que las rutas no encontradas devuelvan un error 404
app.use((req, res, next) => {
  res.status(404).json({ error: "Not Found" });
});
// iniciamos el servidor
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`http://localhost:${PORT}`));