let loginFrom = document.querySelector("form");
let userName = document.getElementById("username");
let password = document.getElementById("password");
let inputs = document.querySelectorAll("input");

inputs.forEach((input) => {
  input.addEventListener("blur", () => {
    input.classList.add("touched");
  });
});
const handleSubmit = async () => {
  const auth = { username: userName.value, password: password.value };
  try {
    let data = await fetch("https://fakestoreapi.com/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(auth),
    });
    if (!data.ok) throw new Error("Invalid username or password");
    let res = await data.json();
    console.log(res);
    localStorage.setItem("islogin", true);
    localStorage.setItem("token", res.token);
    localStorage.setItem("username", userName.value);
    return { success: true, token: res.token };
  } catch (e) {
    return { success: false, error: e.message };
  }
};

loginFrom.addEventListener("submit", async function (e) {
  e.preventDefault();
  const res = await handleSubmit();

  if (res.success) {
    let user = localStorage.getItem("username");
    document.location.replace(`./index.html?showToast=true&user=${user}`);
  } else {
    alert(res.error);
  }
});
