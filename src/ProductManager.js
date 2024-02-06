class ProductManager {
    constructor() {
        this.productos = [];
        this.lastProductId = 0;
    }

    validate(title, description, price, thumbnail, code, stock) {
        if (!title || !description || !price || !thumbnail || !code || !stock) {
            throw new Error("Todos los campos son obligatorios.");
        }

        if (this.productos.some(product => product.code === code)) {
            throw new Error("El código del producto ya está en uso.");
        }
    }

    addProduct(title, description, price, thumbnail, code, stock) {
        this.validate(title, description, price, thumbnail, code, stock);

        const newProduct = {
            id: ++this.lastProductId,
            title,
            description,
            price,
            thumbnail,
            code,
            stock
        };

        this.productos.push(newProduct);
    }

    getProducts() {
        return this.productos;
    }

    getProductById(productId) {
        const product = this.productos.find(p => p.id === productId);

        if (product) {
            return product;
        } else {
            console.error("Producto no encontrado. ID: ", productId);
            throw new Error("Not found");
        }
    }
}

module.exports = ProductManager;
