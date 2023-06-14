import ProductManager from "./ProductManager.js";

const pm = new ProductManager("./files/products.json");

let data = {
    title: "Harry Potter y la piedra filosofal",
    description: "Libro magico",
    price: 2500,
    thumbnail: "Sin Imagen",
    code: "001",
    stock: "10",
};
let data2 = {
    title: "El Señor de los Anillos: las dos torres",
    description: "Libro de hobbits",
    price: 3500,
    thumbnail: "Sin Imagen",
    code: "002",
    stock: "5",
};



const libro = await pm.addProduct(data);
console.log("Libro agregado", JSON.stringify(await pm.getProducts()));

const libro2 = await pm.addProduct(data2);
console.log("Libro agregado", JSON.stringify(await pm.getProducts()));

await pm.updateProduct({ ...libro, price: 2000});
console.log("updated car", JSON.stringify(await pm.getProducts()));

await pm.removeProduct(libro.id);
console.log("Libro eliminado", JSON.stringify(await pm.getProducts()));

await pm.removeProduct(libro2.id);
console.log("Libro eliminado", JSON.stringify(await pm.getProducts()));
