import { getData } from "./fetchDate.js";
import { updateNav } from "./index.js";

const params = new URLSearchParams(window.location.search);
const category = decodeURIComponent(params.get("name"));
const categoryContainer = document.getElementById("cat-container");
const url = `https://fakestoreapi.com/products/category/${category}`;

getData(categoryContainer, url, category);

//toggleMode();
document.addEventListener("DOMContentLoaded", () => {
  updateNav();
});
