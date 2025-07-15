import * as model from "../models/products.model.js";

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

export const searchProducts = async (req, res) => {
  try{
    const { nameModel } = req.query;
    const { anio } = req.query;
    const { color} = req.query;
    const { marca} = req.query;
    const { tipo } = req.params;
    const products = await model.getAllProducts();
    // const filteredProducts = products.filter((p) => p.nameModel.toLowerCase().includes(nameModel.toLowerCase()));

    switch (tipo) {
      case "anio":
        if (anio) {
          return res.json(products.filter((p) => p.anio === parseInt(anio)));
        }
        return res.status(400).json({ error: "El año es requerido para la búsqueda." });    
      case "color":
        if (color) {
          return res.json(products.filter((p) => p.color.toLowerCase() === color.toLowerCase()));
        }
        return res.status(400).json({ error: "El color es requerido para la búsqueda." });      
      case "nameModel":
        if (nameModel) {
          return res.json(products.filter((p) => p.nameModel.toLowerCase().includes(nameModel.toLowerCase())));
        }
        return res.status(400).json({ error: "El nombre del modelo es requerido para la búsqueda." });  
      case "nameModelo&anio":
        if (nameModel && anio) {
          return res.json(products.filter((p) => p.nameModel.toLowerCase().includes(nameModel.toLowerCase()) && p.anio === parseInt(anio)));
        }
      case "marca&nameModel&anio":
        if (nameModel && anio && marca) {
          return res.json(products.filter((p) => p.nameModel.toLowerCase().includes(nameModel.toLowerCase()) && p.anio === parseInt(anio) && p.marca.toLowerCase() === marca.toLowerCase()));
        }
      default:
        return res.status(400).json({ error: "Tipo de búsqueda no válido" }); 
    }  

    // if(!filteredProducts) {
    //   return res.status(404).json({ error: "No se encontraron productos con ese nombre" });  
    // };
    // res.json(filteredProducts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

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

export const createProduct = async (req, res) => {
  try{
    const { nameModel, price, anio, color, combustible, marca, rotation, transmision } = req.body;
 
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