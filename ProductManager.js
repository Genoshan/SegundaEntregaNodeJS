import { promises as fs } from "fs";

export default class ProductManager {
    constructor(path) {
        this.path = path;
        this.products = [];
    }

    GrabarProductosAlArchivo = async (products) => {
        await fs.writeFile(this.path, JSON.stringify(products, null, "\t"), "utf-8");
    };

    async addProduct(product) {
        const currentProducts = await this.getProducts();

        if (
            !product.title ||
            !product.description ||
            !product.price ||
            !product.thumbnail ||
            !product.code || 
            !product.stock
        ) {
            console.error("No se encontraron los datos requeridos");
            return;       
        }

        if (currentProducts.some((p) => p.code === product.code)) {
            console.log(`Ya existe el producto del codigo: ${code}`);
            return;
        }

        let productId = 1;

        if (currentProducts.length !=0) {
            productId = currentProducts[currentProducts.length -1].id +1;
        }
        //usamos el spread operator. Al nuevo objeto le añadimos una nueva propiedad , el ID autoincremental,
        //generado anteriormente
        const nuevoLibro = { ...product, id: productId };

        this.products.push(nuevoLibro);

        try {
            await this.GrabarProductosAlArchivo(this.products);
        } catch (error) {
            console.error(`Error leyendo el archivo: ${this.path} - ${error.message}`);
        }

        return nuevoLibro;
    }

    getProducts = async () => {
        let productsFromFile = [];
        try {
            const fileContent = await fs.readFile(this.path, "utf-8");
            productsFromFile = JSON.parse(fileContent);
        } catch (error) {
            console.error(`Error leyendo el archivo: ${this.path} - ${error.message}`);
        }
        return productsFromFile;
    }

    getProductsById = (id) => {
        const products = this.getProducts();
        return products.find((product) => product.id === id);
    };

    async updateProduct(updateProduct) {
        const updateArray = await this.getProducts();
        const indexOfProductToUpdate = updateArray.findIndex((p) => p.id === updateProduct.id);

        if (indexOfProductToUpdate < 0) {
            console.error(`No se pudo encontrar el producto a actualizar : id: ${updateProduct.id}`);
            return;
        }

        updateArray[indexOfProductToUpdate] = updateProduct;

        try {
            await this.GrabarProductosAlArchivo(updateArray);
        } catch (error) {
            console.error(`Error : ${this.path} - ${error.message}`);
        }

        return updateProduct;
    }

    removeProduct = async (id) => {
        const arrayToUpdate = await this.getProducts();
        const indexOfProductToDelete = arrayToUpdate.findIndex((p) => p.id === id);

        if (indexOfProductToDelete < 0) {
            console.error(`No se pudo encontrar el producto a eliminar: id: ${id}`);
            return;
        }

        arrayToUpdate.splice(indexOfProductToDelete, 1);

        try {
            await this.GrabarProductosAlArchivo(arrayToUpdate);
        } catch (error) {
            console.error(`Error escribiendo el archivo: ${this.path} - ${error.message}`);
        }

        return arrayToUpdate;
    };
}
