import jwt from 'jsonwebtoken';

export const auth = (req, res, next) => {
    const token = req.headers["authorization"]?.split(' ')[1];

    if (!token) {
        return res.sendstatus(401).json({ error: "Token no proporcionado" });
    }

    try {
        jwt.verify(token, process.env.JWT_SECRET_KEY, (error) => {
            if (error) {
                return res.sendstatus(403).json({ error: "Token inválido" });  
            }
        next();
        }); // Continuar con la siguiente función middleware o ruta
    } catch (error) {
        return res.status(401).json({ error: "Token inválido" });
    }
}