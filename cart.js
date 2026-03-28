import { updateNav } from "./index.js";
let user = localStorage.getItem("username");
let cart = JSON.parse(localStorage.getItem(`cart_${user}`)) || [];

document.addEventListener("DOMContentLoaded", () => {
  updateNav();
  renderCartItems();
});

let catContainer = document.getElementById("cart");

const renderCartItems = () => {
  if (cart.length === 0) {
    catContainer.innerHTML = `<p class="text-center font-bold text-xl mt-2 text-gray-800 dark:text-white">Cart is empty </p>`;
    return;
  }

  catContainer.innerHTML = `${cart
    .map(
      (item) => `
      <div class="flex flex-col md:flex-row my-5 gap-4 bg-white dark:bg-slate-800 text-black dark:text-white p-4 rounded shadow items-center">
        <img src="${item.image}" class="w-24 h-24 object-contain"/>
        
        <div class="flex-1">
          <h3 class="font-semibold">${item.title}</h3>
          <p class="text-blue-600 font-bold">$${item.price}</p>
          <p>Quantity: ${item.quantity}</p>
        </div>

        <button 
        class="remove bg-red-500 text-white p-3 cursor-pointer h-fit rounded-sm"
        data-id="${item.id}">
        Remove
        </button>
       
      </div>
    `,
    )
    .join(
      "",
    )} <div class="font-bold text-black dark:text-white mb-4">total ${calcTotalPrice(cart).toFixed(1)}$</div>`;

  document.querySelectorAll(".remove").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const id = e.target.dataset.id;
      removeItem(id);
    });
  });
};
function removeItem(id) {
  let user = localStorage.getItem("username");
  cart = cart.filter((item) => item.id != id);

  localStorage.setItem(`cart_${user}`, JSON.stringify(cart));

  renderCartItems();
}

function calcTotalPrice(cart) {
  return cart.reduce((acc, curr) => (acc += curr.price * curr.quantity), 0);
}
