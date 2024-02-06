const express = require('express');
const ProductManager = require('./ProductManager');

const app = express();
const PORT = 8080;

const productManager = new ProductManager();


app.get('/products', async (req, res) => {
  try {
    const { limit } = req.query;
    let products = await productManager.getAllProducts();

    if (limit) {
      products = products.slice(0, parseInt(limit, 5));
    }

    res.json({ products });
  } catch (error) {
    res.status(500).json({ error: 'Error de servidor' });
  }
});

app.get('/products/:pid', async (req, res) => {
  try {
    const productId = req.params.pid;
    const product = await productManager.getProductById(productId);

    if (product) {
      res.json({ product });
    } else {
      res.status(404).json({ error: 'Producto no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error de servidor' });
  }
});


app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
