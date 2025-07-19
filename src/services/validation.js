import { error } from "console";
import { EmailAuthProvider } from "firebase/auth/web-extension";

export const _login = (login, password ) => {
    if (typeof login !== "string" || login.trim() === "") {
        throw new Error("El usuario es requerido y debe ser una cadena no vacía.");
    }
    if (login.length < 3 || login.length > 20) {
        throw new Error("El usuario debe tener entre 3 y 20 caracteres.");  
    }
    if (!/^[a-zA-Z0-9]+$/.test(login)) {
        throw new Error("El usuario solo puede contener letras y números.");
    }   

    if(typeof password !== "string" || password.trim() === "") {
        throw new Error("El sing es requerido y debe ser una cadena no vacía.");
    }
    if(!/^[a-zA-Z0-9]+$/.test(password)){
        throw new Error("El sing solo puede contener letras y números.");   
    }
}

export const _anio= (anio) => {
    if(isNaN(anio)){
        throw new Error("El año debe ser un número válido.");
    } 

    if (typeof anio !== "number" || anio <= 0 ) {
        throw new Error("El año debe ser un número positivo.");
    }
   
    if(!Number.isInteger(anio)){
        throw new Error("El año debe ser un número entero.");
    } 
    if(anio < 1900 || anio > new Date().getFullYear()){
        throw new Error("El año debe estar entre 1900 y el año actual.");    
    }       
};

export const _precio = (price) => {
    if (typeof price !== "number" || price <= 0) {
        throw new Error("El precio debe ser un número positivo.");
    }
    if(isNaN(price)){
        throw new Error("El precio debe ser un número válido.");
    } 
    if (!price) {
      return res.status(400).json({ error: "El precio es requerido para actualizar el producto." });
    }     
}  ; 

export const _color = (color) => {
    if (typeof color !== "string" || color.trim() === "") { 
        throw new Error ( "El color es requerido y debe ser una cadena no vacía.");  
    }
    if(!/^[a-zA-Z\s]+$/.test(color)){
            throw new Error("El color solo puede contener letras y espacios.");
        }
};

export const _nombreModelo = (nameModel) => {
    if (typeof nameModel !== "string" || nameModel.trim() === "") {
        throw new Error("El nombre del modelo es requerido y debe ser una cadena no vacía.");
    }
    if(nameModel.length < 3 || nameModel.length > 50){
        throw new Error("El nombre del modelo debe tener entre 3 y 50 caracteres.");
    }
};

export const _marca = (marca) => {
    if (typeof marca !== "string" || marca.trim() === "") {
        throw new Error("La marca es requerida y debe ser una cadena no vacía.");
    }
    if(marca.length < 2 || marca.length > 30){
        throw new Error("La marca debe tener entre 2 y 30 caracteres.");
    }
    if(!/^[a-zA-Z\s]+$/.test(marca)){
        throw new Error("La marca solo puede contener letras y espacios.");
    }
};

export const _rotation = (rotation) => {
    if (typeof rotation !== "string" || rotation.trim() === "" ) {
        throw new Error("La rotación es requerida y debe ser una cadena no vacía.");
    }
    //A=alta; B: baja; M: mediana
    if(rotation !== "A" && rotation !== "B" && rotation !== "M" ) {
        throw new Error("La rotación debe ser un Letra A,B,M, válida.");
    }

    if(!/^[a-zA-Z\s]+$/.test(rotation)){
        throw new Error("La rotación solo puede contener letras y espacios.");
    }
};

export const _combustible = (combustible) => {
    if (typeof combustible !== "string" || combustible.trim() === "" ) {
        throw new Error("El combustible es requerido y debe ser una cadena no vacía.");
    }
    //N: Nafta; D: Diesel; E: Eléctrico; H: Hidrógeno; G: Gas
    if(combustible !== "N" && combustible !== "D" && combustible !== "E" && combustible !== "G" && combustible !== "H" ) {
        throw new Error("El combustible debe ser una Letra N: Nafta; D: Diesel; E: Eléctrico; H: Hidrógeno.; G: Gas.");
    }

    if(!/^[a-zA-Z\s]+$/.test(combustible)){
        throw new Error("El combustible solo puede contener letras y espacios.");
    }
} ;

export const _transmision = (transmision) => {
    if (typeof transmision !== "string" || transmision.trim() === "" ) {
        throw new Error("La transmisión es requerida y debe ser una cadena no vacía.");
    }
    //A: Automática; M: Manual; 
    if  (transmision !== "A" && transmision !== "M") {
        throw new Error("La transmisión debe ser una Letra A: Automática; M: Manual.");
    }       
    if(!/^[a-zA-Z\s]+$/.test(transmision)){
        throw new Error("La transmisión solo puede contener letras y espacios.");
    }
};

export const _updateProduct = (productData, id) => {
    if (!id || typeof id !== "string") {
        throw new Error("El ID del producto es requerido y debe ser una cadena no vacía.");
    }
    if (typeof productData !== "object" || productData === null) {
        throw new Error("Los datos del producto deben ser un objeto válido.");
    }
    
    if (productData.nameModel) {
        _nombreModelo(productData.nameModel);
    }
    if (productData.price) {
        _precio(productData.price);
    }
    if (productData.anio) {
        _anio(productData.anio);
    }
    if (productData.color) {
        _color(productData.color);
    }
    if (productData.combustible) {
        _combustible(productData.combustible);
    }
    if (productData.marca) {
        _marca(productData.marca);
    }
    if (productData.rotation) {
        _rotation(productData.rotation);
    }       
    if (productData.transmision) {
        _transmision(productData.transmision);
    }
}  

export const _id = (id) => {
    if(id == " " || id === null){
        throw new Error("El ID es requerido y debe ser una cadena no vacía.");
    }
    
    if(id === undefined){
        throw new Error("El ID es requerido y debe ser una cadena no vacía.");
    } 
};  