const maxWidth = 600;

function menu() {
  if (window.innerWidth <= maxWidth) {
    document.querySelector(".navegacao").classList.toggle("ativo");

    document.querySelector(".links").addEventListener("click", (event) => {
      event.stopPropagation();
    });
  }
}