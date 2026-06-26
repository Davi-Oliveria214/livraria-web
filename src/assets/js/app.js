const maxWidth = 600;

function menu() {
  if (window.innerWidth <= maxWidth) {
    document.querySelector(".navegacao").classList.toggle("ativo");

    document.querySelector(".links").addEventListener("click", (event) => {
      event.stopPropagation();
    });
  }
}

// const lista = document.getElementById('lista')
// const json = fetch('localhost:8080/livraria').then((body) => body.json).then((resposta) => resposta.json())
// console.log(json)