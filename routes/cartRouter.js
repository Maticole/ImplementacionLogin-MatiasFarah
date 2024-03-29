const express = require('express');
const CartManager = require('../dao/CartManager');
const cartRouter = express.Router();

const cartManager = new CartManager();

cartRouter.delete('/:cid/products/:pid', async (req, res) => {
  const { cid, pid } = req.params;
  try {
    await cartManager.removeProductFromCart(cid, pid);
    res.status(204).send();
  } catch (error) {
    console.error("Error al eliminar el producto del carrito:", error.message);
    res.status(500).json({ error: "Error interno del servidor" });
  }
});

cartRouter.put('/:cid', async (req, res) => {
  const { cid } = req.params;
  const products = req.body.products;
  try {
    await cartManager.updateCart(cid, products);
    res.status(200).json({ message: 'Carrito actualizado exitosamente' });
  } catch (error) {
    console.error("Error al actualizar el carrito:", error.message);
    res.status(500).json({ error: "Error interno del servidor" });
  }
});

cartRouter.put('/:cid/products/:pid', async (req, res) => {
  const { cid, pid } = req.params;
  const quantity = req.body.quantity;
  try {
    await cartManager.updateProductQuantity(cid, pid, quantity);
    res.status(200).json({ message: 'Cantidad de producto en el carrito actualizada exitosamente' });
  } catch (error) {
    console.error("Error al actualizar la cantidad del producto en el carrito:", error.message);
    res.status(500).json({ error: "Error interno del servidor" });
  }
});

cartRouter.delete('/:cid', async (req, res) => {
  const { cid } = req.params;
  try {
    await cartManager.clearCart(cid);
    res.status(204).send();
  } catch (error) {
    console.error("Error al eliminar todos los productos del carrito:", error.message);
    res.status(500).json({ error: "Error interno del servidor" });
  }
});

module.exports = cartRouter;