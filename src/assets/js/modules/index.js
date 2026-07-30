import { getLivros, generos, busca } from '../api/api.js'
import { criarCard, modal, modalEditar, cardApagar } from '../modal/modal.js'

let carregando = false
let scrollOn = true
let tipos = "", valor = ""

const lista = document.getElementById('lista')
const filtro = document.querySelector('.filtros')

async function dados() {
   lista.innerHTML = ""
   scrollOn = true

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

lista.addEventListener('scroll', () => {
   var scrollTop = lista.scrollTop;
   var off = lista.children.length
   var limit = 10

   if (carregando || !scrollOn) return;

   if ((scrollTop + lista.clientHeight) >= (lista.scrollHeight - 200)) {
      gerarMais(limit, off);
   }
})

async function gerarMais(limit, off) {
   carregando = true;
   let resp = null

   if (scrollOn) {
      resp = await getLivros(limit, off)
   } else {
      resp = await busca(tipo, valor)
   }

   if (resp && resp.length > 0) {
      let cards = ""

      resp.forEach(livro => {
         cards += criarCard(livro)
      })

      lista.insertAdjacentHTML('beforeend', cards)
   }

   carregando = false;
}

async function gerarGeneros() {
   const resp = await generos()

   if (resp['error']) return

   let filtros = `<input type="radio" name="filtro" id="todos" onclick="todos()" />
                <label for="todos" class="item">Todos</label>`

   resp.forEach(element => {
      filtros += `<input type="radio" name="filtro" id="${element['genero']}" onclick="filtrar('genero', '${element['genero']}')" />
            <label for="${element['genero']}" class="item">${element['nome']}</label>`
   })

   filtro.insertAdjacentHTML('beforeend', filtros)
}

async function filtrar(tipo, codigo) {
   scrollOn = false
   lista.innerHTML = ""
   tipos = tipo

   const resp = await busca(tipo, codigo)

   if (resp['error']) {
      const aviso = `<h2>${resp['message']}</h2>`
      lista.insertAdjacentHTML('afterbegin', aviso)
      return
   }

   let card = ""
   resp.forEach(livro => {
      card += criarCard(livro)
   })

   lista.insertAdjacentHTML('afterbegin', card)
}

window.filtrar = filtrar
window.abrirModal = modal
window.todos = dados
window.abrirEditar = modalEditar
window.apagar = cardApagar

dados()
gerarGeneros()