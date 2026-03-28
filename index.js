import { getData } from "./fetchDate.js";

function checkAndShowToast() {
  let params = new URLSearchParams(location.search);
  let showToast = params.get("showToast");
  let usernameFromUrl = params.get("username");
  let username = localStorage.getItem("username");
  let toast = document.getElementById("toast");
  let toastMessage = document.getElementById("user-toast");

  if (showToast === "true" && username) {
    if (toast) {
      toast.style.display = "block";
      toastMessage.innerText = `Hello ${username}`;

      window.setTimeout(() => {
        toast.style.display = "none";

        window.history.replaceState(
          {},
          document.title,
          window.location.pathname,
        );
      }, 5000);
    }
  } else if (toast) {
    toast.style.display = "none";
  }
}

document.addEventListener("DOMContentLoaded", () => {
  updateNav();
  checkAndShowToast();
});

export function updateNav() {
  let username = localStorage.getItem("username");
  let isLogin = localStorage.getItem("islogin") === "true";
  let login = document.querySelector('a[href="./login.html"]');
  let logout = document.getElementById("logout");
  let toast = document.getElementById("toast");
  let toastMessage = document.getElementById("user-toast");

  if (username && isLogin) {
    login.style.display = "none";
    logout.style.display = "block";
    if (logout) {
      logout.addEventListener("click", () => {
        localStorage.removeItem("token");
        localStorage.removeItem("username");
        localStorage.removeItem("islogin");
        window.location.reload();
      });
    }
  }
}

//// get all categories
const getCategories = async () => {
  try {
    const date = await fetch("https://fakestoreapi.com/products/categories");
    const res = await date.json();
    return res;
  } catch (e) {
    alert(e.message);
  }
};

///display Items
const RenderCatgories = async () => {
  const res = await getCategories();
  let categories = document.getElementById("categories");
  const categoryImages = {
    electronics: "./imgs/cpu.png",
    jewelery: "./imgs/rings.png",
    "men's clothing": "https://cdn-icons-png.flaticon.com/512/892/892458.png",
    "women's clothing": "./imgs/woman-clothes.png",
  };

  categories.innerHTML = `
      <h3 class="px-[10%] mt-6 font-bold text-3xl text-black dark:text-white">
        All Categories
      </h3>

      <div class="categories">
        ${res
          .map(
            (cat) => `
            <div class="category-item bg-white flex flex-col items-center shadow-md rounded-lg p-6 text-center cursor-pointer hover:shadow-lg transition" data-category="${cat}">
              <img src="${categoryImages[cat]}" alt="${cat}" class="w-24 mx-auto"/>
              <h3 class="font-semibold capitalize">${cat}</h3>
            </div>
          `,
          )
          .join("")}
      </div>
    `;

  document.querySelectorAll(".category-item").forEach((el) => {
    el.addEventListener("click", () => {
      const cat = el.getAttribute("data-category");
      goToCategory(cat);
    });
  });
};

function goToCategory(category) {
  window.location.href = `./categoriesDetails.html?name=${encodeURIComponent(
    category,
  )}`;
}
document.addEventListener("DOMContentLoaded", RenderCatgories());
// Add click event listeners

///////////////////////////////////////////////////////////////////////////////////////////////////////
//get top-rated products
const topRated = document.getElementById("top-rated");

getData(topRated, "https://fakestoreapi.com/products?limit=6", "top rated");
///////////////////////////////////////////////////////////////////////////////////////////////
//display products
