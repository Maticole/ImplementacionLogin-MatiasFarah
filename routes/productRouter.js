const express = require('express');
const productManager = require('../dao/ProductManager');
const productRouter = express.Router();

productRouter.get('/', async (req, res) => {
  const { limit = 10, page = 1, sort, query } = req.query;
  try {
    const result = await productManager.getProducts({ limit, page, sort, query });
    res.json(result);
  } catch (error) {
    console.error("Error al obtener los productos:", error.message);
    res.status(500).json({ error: "Error interno del servidor" });
  }
});

productRouter.post('/', async (req, res) => {
  const productData = req.body; 
  try {
    await productManager.addProduct(productData); 
    res.status(201).json({ message: 'Producto creado exitosamente' });
  } catch (error) {
    console.error("Error al crear el producto:", error.message);
    res.status(500).json({ error: "Error interno del servidor" });
  }
});

productRouter.get('/:id', async (req, res) => {
  const productId = req.params.id; 
  try {
    const product = await productManager.getProductById(productId);
    if (product) {
      res.json(product);
    } else {
      res.status(404).json({ error: 'Producto no encontrado' });
    }
  } catch (error) {
    console.error("Error al obtener el producto:", error.message);
    res.status(500).json({ error: "Error interno del servidor" });
  }
});

productRouter.put('/:id', async (req, res) => {
  const productId = req.params.id; 
  const updatedProductData = req.body; 
  try {
    await productManager.updateProduct(productId, updatedProductData); 
    res.json({ message: 'Producto actualizado exitosamente' });
  } catch (error) {
    console.error("Error al actualizar el producto:", error.message);
    res.status(500).json({ error: "Error interno del servidor" });
  }
});

productRouter.delete('/:id', async (req, res) => {
  const productId = req.params.id; 
  try {
    await productManager.deleteProduct(productId); 
    res.json({ message: 'Producto eliminado exitosamente' });
  } catch (error) {
    console.error("Error al eliminar el producto:", error.message);
    res.status(500).json({ error: "Error interno del servidor" });
  }
});

module.exports = productRouter;