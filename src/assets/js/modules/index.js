import { getLivros, plusLivros } from '../api/api.js'
import { criarCard, modal } from '../modal/modal.js'

const lista = document.getElementById('lista')
async function dados() {
   if (!lista) return

   const livros = await getLivros()

   if (livros || livros.length != 0) {
      let cards = ""

      livros.forEach(livro => {
         cards += criarCard(livro)
      })

      lista.insertAdjacentHTML('afterbegin', cards)
   }
}

let carregando = false;

if (lista) lista.addEventListener('scroll', () => {
   var scrollTop = lista.scrollTop;
   var off = lista.children.length
   var limit = 10

   if (carregando) return;

   if ((scrollTop + lista.clientHeight) >= (lista.scrollHeight - 200)) {
      gerarMais(limit, off);
   }
})

async function gerarMais(limit, off) {
   carregando = true;

   const resp = await plusLivros(limit, off)

   if (resp && resp.length > 0) {
      let cards = ""

      resp.forEach(livro => {
         cards += criarCard(livro)
      })

      lista.insertAdjacentHTML('beforeend', cards)
   }

   carregando = false;
}

window.abrirModal = modal;

dados()