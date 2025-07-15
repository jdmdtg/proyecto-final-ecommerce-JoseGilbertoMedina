import * as model from "../models/products.model.js";
import * as validaciones from "../services/validaciones.js";

// getAllProducts
export const getAllProducts = async (req, res) => {
  try{
    const products = await model.getAllProducts();
    if (!products) {
      res.status(404).json({ error: "Se genero un Problema al consultar los productos." });
    }
    res.json(products);
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
    const products = await model.getAllProducts();
    // const filteredProducts = products.filter((p) => p.nameModel.toLowerCase().includes(nameModel.toLowerCase()));

    switch (tipo) {
      case "anio":
        // Validación del año        
        validaciones._anio(parseInt(anio));
        if (anio) {
          return res.json(products.filter((p) => p.anio === parseInt(anio)));
        }         
      case "color":
        // Validación del color
        validaciones._color(parseInt(color));
        if (color) {
          return res.json(products.filter((p) => p.color.toLowerCase() === color.toLowerCase()));
        }
        return res.status(400).json({ error: "El color es requerido para la búsqueda." });      
      case "nameModel":
        // Validación del nombre del modelo
        validaciones._nombreModelo(nameModel);
        if (nameModel) {
          return res.json(products.filter((p) => p.nameModel.toLowerCase().includes(nameModel.toLowerCase())));
        }
        return res.status(400).json({ error: "El nombre del modelo es requerido para la búsqueda." });  
      case "nameModelo&anio":
        // Validación del nombre del modelo y el año
        validaciones._anio(parseInt(anio));
        validaciones._nombreModelo(nameModel);
        if (nameModel && anio) {
          return res.json(products.filter((p) => p.nameModel.toLowerCase().includes(nameModel.toLowerCase()) && p.anio === parseInt(anio)));          
        }
      case "rotation":
        // Validación de la rotación
        validaciones._rotation(rotation);
        if (rotation) {
          return res.json(products.filter((p) => p.rotation.toLowerCase() === rotation.toLowerCase()));
        }
      case "marca":
          // Validación de la marca
          validaciones._marca(marca);
          if (marca) {
            console.log(marca); 
            return res.json(products.filter((p) => p.marca.toLowerCase() === marca.toLowerCase()));
            console.log(products);
          }         
      case "marca&nameModel&anio":
        // Validación de la marca, nombre del modelo y año
        validaciones._marca(marca);
        validaciones._nombreModelo(nameModel);
        validaciones._anio(parseInt(anio));

        if (nameModel && anio && marca) {
          return res.json(products.filter((p) => p.nameModel.toLowerCase().includes(nameModel.toLowerCase()) && p.anio === parseInt(anio) && p.marca.toLowerCase() === marca.toLowerCase()));
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
    const { nameModel, price, anio, color, combustible, marca, rotation, transmision } = req.body;
    // Validación de campos requeridos
    validaciones._nombreModelo(nameModel);
    validaciones._precio(price);      
    validaciones._anio(anio);
    validaciones._color(color);
    validaciones._marca(marca);
    validaciones._combustible(combustible);
    validaciones._rotation(rotation);
    validaciones._transmision(transmision);

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
    // console.log(productId);
    const product = await model.deleteProduct(productId);
    if (!product) {
      return res.status(404).json({ error: "Producto no encontrado." });
    }else{
      return res.status(200).send(" Producto Fué Eliminado.");
    }
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
// updateProducts
export const updateProducts = async (req, res) => {
  try {
    const { id } = req.params;
    const productData = req.body;
    const updatedProduct = await model.updateProduct(id, productData);
    if (!updatedProduct) {
      return res.status(404).json({ error: "Producto no encontrado" });
    }else{
      return res.status(200).send('Producto actualizado correctamente');
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
    if (!price) {
      return res.status(400).json({ error: "El precio es requerido para actualizar el producto." });
    }  
    const products = await model.updatePartProducts(id, price);
    if(products){
      // products.price = price || products.price;
      return res.status(200).send('Producto actualizado correctamente');
    }else{
      return res.status(404).json({ error: "Producto no encontrado" });
    }
      res.json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}