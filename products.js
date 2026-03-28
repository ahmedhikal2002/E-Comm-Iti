import { getData } from "./fetchDate.js";
import { updateNav } from "./index.js";

const products = document.getElementById("products");
console.log(products);
const url = "https://fakestoreapi.com/products";
getData(products, url, "All Products");

document.addEventListener("DOMContentLoaded", () => {
  updateNav();
});
