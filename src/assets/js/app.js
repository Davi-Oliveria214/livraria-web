function menu() {
  document.querySelector(".navegacao").classList.toggle("ativo");

  document.querySelector(".links").addEventListener("click", (event) => {
    event.stopPropagation();
  });
}