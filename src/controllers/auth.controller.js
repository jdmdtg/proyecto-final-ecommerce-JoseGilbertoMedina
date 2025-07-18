import jwt from 'jsonwebtoken';
    const default_user = { 
      id: 1, 
      email: "jmedina@email.com", 
      password: "jmedina123", 
    } ;
 
    export const login = async(req, res) => { 
      
        const { email, password } = req.body; 
        // console.log(`Email: ${email}, Password: ${password}`);
        const user = { id: 1}//{ id: 1, email };  ;  
 
        if (email === default_user.email && password === default_user.password) { 
            // const payload = { id: user.id};
            const payload = { user };
            const expiration = {expiresIn: "8h"}; // El token expirará en 1 hora
            const token = jwt.sign(payload, process.env.JWT_SECRET_KEY, expiration)
            res.json({ token }); 
        } else { 
            res.sendStatus(401).json({ error: "Credenciales inválidas" }); 
        } 
    };