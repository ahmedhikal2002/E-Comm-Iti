function toggleMode() {
  const modeIcon = document.querySelector(" i");
  const modeContainer = document.getElementById("icon-container");

  const savedMode = localStorage.getItem("theme");

  if (savedMode === "dark") {
    document.body.classList.add("dark");
    document.body.classList.remove("light");
    modeIcon.classList.replace("fa-sun", "fa-moon");
  } else {
    document.body.classList.add("light");
    document.body.classList.remove("dark");
    modeIcon.classList.replace("fa-moon", "fa-sun");
  }

  modeContainer.addEventListener("click", function () {
    if (document.body.classList.contains("light")) {
      document.body.classList.add("dark");
      document.body.classList.remove("light");
      modeIcon.classList.replace("fa-sun", "fa-moon");
      localStorage.setItem("theme", "dark");
    } else {
      document.body.classList.add("light");
      document.body.classList.remove("dark");
      modeIcon.classList.replace("fa-moon", "fa-sun");
      localStorage.setItem("theme", "light");
    }
  });
}

toggleMode();
