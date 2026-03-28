export const getData = async (htmlElement, url, renderedItem) => {
  try {
    const res = await fetch(url);
    const date = await res.json();
    displyItems(htmlElement, date, renderedItem);
  } catch (e) {
    return e;
  }
};

///////////////////////////////////////////////////////////////////////////////////////////////
//display products

function displyItems(htmlElement, items, renderedItem) {
  try {
    htmlElement.innerHTML = `
    <h3 class="px-[10%] capitalize my-6 font-bold text-3xl text-black dark:text-white flex items-center gap-2">
      ${renderedItem}
    </h3>
    <div class="grid grid-cols-1 mb-6 md:grid-cols-2 lg:grid-cols-3 gap-6 px-[10%]">
      ${items
        .map(
          (item) => `
            <div class="bg-white  dark:bg-slate-800 text-black dark:text-white rounded-xl shadow-md hover:shadow-xl transition duration-300 overflow-hidden group">
              <div class="h-48 p-4 flex items-center justify-center bg-gray-50 dark:bg-slate-600">
                <img src="${item.image}" class="h-full object-contain group-hover:scale-105 transition"/>
              </div>
              <div class="p-4">
                <h3 class="text-sm font-semibold line-clamp-2 h-[40px]">
                  ${item.title}
                </h3>
                <div class="flex items-center justify-between mt-3">
                  <span class="text-lg font-bold text-blue-600">$${item.price}</span>
                  <span class="text-yellow-500 text-sm">
                    <i class="fa-solid fa-star"></i> ${item.rating.rate}
                  </span>
                </div>
                <button id="add" class="add-to-cart mt-4 w-full bg-black text-white dark:bg-white dark:text-black py-2 rounded-lg 
                hover:shadow-lg hover:-translate-y-0.5 hover:bg-gray-900 dark:hover:bg-gray-200 transition-all duration-300"
                data-id="${item.id}">
                  Add to Cart
                </button>
              </div>
            </div>
          `,
        )
        .join("")}
    </div>
  `;
    document.querySelectorAll(".add-to-cart").forEach((btn) => {
      btn.addEventListener("click", (e) => {
        const id = e.target.dataset.id;
        const product = items.find((item) => item.id == id);
        addToCart(product);
      });
    });
  } catch (e) {
    htmlElement.innerHTML = `<p class='text-red-500'>${e.message}</p>`;
  }
}

function addToCart(product) {
  let user = localStorage.getItem("username") || "";
  let cart = JSON.parse(localStorage.getItem(`cart_${user}`)) || [];

  const exist = cart.find((item) => item.id === product.id);
  if (user) {
    if (exist) {
      exist.quantity += 1;
      let a = cart.reduce((acc, curr) => (acc += curr.quantity), 0);
      alert(`${a} items added to cart`);
    } else {
      cart.push({ ...product, quantity: 1 });
      let a = cart.reduce((acc, curr) => (acc += curr.quantity), 0);
      alert(`${a} items added to cart`);
    }

    localStorage.setItem(`cart_${user}`, JSON.stringify(cart));
  } else {
    alert("please login frist to complete this action");
  }
}
