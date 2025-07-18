// import { create } from "domain";
import * as model from "../models/products.model.js";
import * as validation from "../services/validation.js";

// getAllProducts
export const getAllProducts = async (req, res) => {
  try{
    const products = await model.getAllProducts();
    if (!products) {
      res.status(404).json({ error: "Se genero un Problema al consultar los productos." });
    }else{
       res.status(200).json(products);
    }
   
  } catch (err) { 
    res.status(500).json({ message: err.message });
  };
};
// searchProducts, user can search by nameModel, anio, color, marca, rotation, 
// nameModelo & anio, marca & nameModel & anio

export const searchProducts = async (req, res) => {
  try{
    const { nameModel } = req.query;
    const { anio } = req.query;
    const { color} = req.query;
    const { marca} = req.query;
    const { tipo } = req.params;
    const { rotation } = req.query;
    const { login } = req.query;
    const { password } = req.query;
    const products = await model.getAllProducts();
    const users = await model.getAllUsers();
    // const filteredProducts = products.filter((p) => p.nameModel.toLowerCase().includes(nameModel.toLowerCase()));

    switch (tipo) {
      case "login":
        // Validación del login
        validation._login(login,password);
        if (login) {
          const filterLogin = await users.filter((u) => u.login.toLowerCase() === login.toLowerCase() && u.password === password  );
          if(filterLogin.length > 0){
            return res.status(200).json(filterLogin);
            //se crea un token y se retorna
          //  const ddd = createToken(filters[0].id, filters[0].rol);
          //  return res.status(200).json({ "token": ddd, "user": filters[0] });
          }
          }else{
            return res.status(404).json({ error: "No se encontraron usuarios con ese login." });
          }
        
      case "anio":
        // Validación del año        
        validation._anio(parseInt(anio));
        // podemos buscar por año.
        if (anio) {
         const filterAnio = await products.filter((p) => p.anio === parseInt(anio));
        
         if(filterAnio.length > 0){
           return res.status(200).json(filterAnio);
          }else{
           return res.status(404).json({ error: "No se encontraron productos con ese año." }); 
          }
        }         
      case "color":
        // Validación del color
        validation._color(color) ;
        // podemos buscar por color ó por algunas letras del color.
        if (color) {
          const filterColor = await products.filter((p) => p.color.toLowerCase().includes(color.toLowerCase()) || p.color.toLowerCase() === color.toLowerCase()); 
        if(filterColor.length > 0){
          return res.status(200).json(filterColor); 
        }else{
          return res.status(404).json({ error: "No se encontraron productos con ese color." });
        }
       }
      case "nameModel":
        // Validación del nombre del modelo        
        validation._nombreModelo(nameModel);
        // podemos buscar por nombre de modelo ó por algunas letras del nombre de modelo.
        if (nameModel) {
          const filterNameModel = await products.filter((p) => p.nameModel.toLowerCase().includes(nameModel.toLowerCase()) || p.nameModel.toLowerCase() === nameModel.toLowerCase());
          if(filterNameModel.length > 0){
            return res.status(200).json(filterNameModel); 
          }else{
            return res.status(404).json({ error: "No se encontraron productos con ese nombre de modelo." });
          }
        }
         

      case "nameModelo&anio":
        // Validación del nombre del modelo y el año        
        validation._anio(parseInt(anio));
        validation._nombreModelo(nameModel);
        // podemos buscar por nombre de modelo y año.
        if (nameModel && anio) {
          // const filterret_nameModelo_Anio = await products.filter((p) => p.nameModel.toLowerCase().includes(nameModel.toLowerCase()) && p.anio === parseInt(anio));          
          const filterret_nameModelo_Anio = await products.filter((p) => p.nameModel.toLowerCase() == nameModel.toLowerCase() && p.anio === parseInt(anio));          
          if(filterret_nameModelo_Anio.length > 0){
            return res.status(200).json(filterret_nameModelo_Anio); 
          }else{
            return res.status(404).json({ error: "No se encontraron productos con ese nombre de modelo y año." });
          }
        }
      case "rotation":
        // Validación de la rotación
        validation._rotation(rotation);
        // podemos buscar por rotación.
        if (rotation) {
          const filter_rotation = await products.filter((p) => p.rotation.toLowerCase() === rotation.toLowerCase());
          if(filter_rotation.length > 0){
            return res.status(200).json(filter_rotation);   
          }else{
            return res.status(404).json({ error: "No se encontraron productos con esa rotación." });
          } 
        }
      case "marca":
          // Validación de la marca
          validation._marca(marca);
          // se puede buscar por marca. ó por algunas letras de la marca.
          if (marca) {
            const filterMarca = await products.filter((p) => p.marca.toLowerCase().includes(marca.toLowerCase()) || p.marca.toLowerCase() == marca.toLowerCase());
            if(filterMarca.length > 0){ 
              return res.status(200).json(filterMarca); 
            }
            else{
              return res.status(404).json({ "error": "No se encontraron productos con esa marca." });
            } 
          }         
      case "marca&nameModel&anio":
        // Validación de la marca, nombre del modelo y año
        validation._marca(marca);
        validation._nombreModelo(nameModel);
        validation._anio(parseInt(anio));
        //buscara por marca, nombre de modelo y año.
        if (nameModel && anio && marca) {
          const marca_nameModel_anio = await products.filter((p) => p.nameModel.toLowerCase() == nameModel.toLowerCase() && p.anio === parseInt(anio) && p.marca.toLowerCase() == marca.toLowerCase());
          if(marca_nameModel_anio.length > 0){
            return res.status(200).json(marca_nameModel_anio);  
          }else{
            return res.status(404).json({ "error": "No se encontraron productos con esa marca, nombre de modelo y año." });
          } 
        }

      default:
        return res.status(400).json({ error: "Tipo de búsqueda no válido" }); 
    }  
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
  // get by id
export const getProductById = async (req, res) => {
  try{
    const { id } = req.params;
    const product = await model.getProductById(id);
    if (!product) {
      res.status(404).json({ error: "No existe el producto" });
    }
    res.json(product);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
// createProduct
export const createProduct = async (req, res) => {
  try{
    // Extraigo los datos del body
    const { nameModel, price, anio, color, combustible, marca, rotation, transmision } = req.body;
    // Validación de campos requeridos
    validation._nombreModelo(nameModel);
    validation._precio(price);      
    validation._anio(anio);
    validation._color(color);
    validation._marca(marca);
    validation._combustible(combustible);
    validation._rotation(rotation);
    validation._transmision(transmision);

    //valido la existenecia.
    const products = await model.getAllProducts();
    const filteredProducts = products.filter((p) => p.nameModel.toLowerCase().includes(nameModel.toLowerCase()) & p.anio === anio);
    if(filteredProducts.length > 0) {
      return res.status(400).json({ error: "Ya existe un producto con ese nombre y año." });
    } 
    const newProduct = await model.createProduct({ nameModel, price, anio, color, combustible, marca, rotation, transmision });
    if(!newProduct) {
      return res.status(400).json({ error: "Error al crear el producto." });
    }
    res.status(201).json(newProduct);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
// deleteProduct
export const deleteProduct = async (req, res) => {
  try{
    const productId = req.params.id;
     
   validation._id(productId);
    // Verificar si el producto existe
    const product = await model.deleteProduct(productId);
     
    if (!product) {
      return res.status(404).json({ error: "Producto no encontrado."});
    }else{
      return res.status(204).send();
    }
    
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
// updateProducts
export const updateProducts = async (req, res) => {
  try {
    const { id } = req.params;
    const productData = req.body;
    validation._updateProduct(productData, id);
    const updatedProduct = await model.updateProduct(id, productData);
    if (!updatedProduct) {
      return res.status(404).json({ error: "Producto no encontrado" });
    }else{
      return res.status(200).json({"Product" : id, "ok":'Producto actualizado correctamente'});
    };
    res.json(updatedProduct);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}
// updatePartProducts
export const updatePartProducts = async (req, res) => {
  try {
    const { id } = req.params;
    const { price } = req.body;
    validation._precio(price);
    const products = await model.updatePartProducts(id, price);
    if(products){
      return res.status(200).json({"product":id,"Price" : price, "ok" : "Producto actualizado correctamente"});
    }else{
      return res.status(404).json({error: "Producto no encontrado" });
    }
     
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}