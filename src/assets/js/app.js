const burguer = document.querySelector("#burguer");
const nav = document.querySelector(".navegacao");
const navLinks = document.querySelector(".links");

burguer.addEventListener("click", () => {
  nav.classList.toggle("ativo");
});

nav.addEventListener("click", () => {
  nav.classList.toggle("ativo");
});

navLinks.addEventListener("click", (event) => {
  event.stopPropagation();
});
