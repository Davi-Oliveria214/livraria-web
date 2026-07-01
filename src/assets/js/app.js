const maxWidth = 600;
const URL_API = 'http://127.0.0.1:8080/livraria'

function menu() {
   if (window.innerWidth <= maxWidth) {
      document.querySelector(".navegacao").classList.toggle("ativo");

      document.querySelector(".links").addEventListener("click", (event) => {
         event.stopPropagation();
      });
   }
}

const lista = document.getElementById('lista')
async function dados() {
   if (!lista) return

   const resp = await fetch(URL_API).then(data => data.json()).catch(erro => msgErro(erro))

   let cards = ""
   if (resp) resp.forEach(livro => {
      cards += criarCard(livro)
   })

   lista.insertAdjacentHTML('afterbegin', cards)
}

function msgErro(erro) {
   lista.innerHTML =
      `<div class='msg-erro'>
         <strong>Erro ao acessar os livros</strong>
         <p>${erro.message}</p>
      <div>`
}

function criarCard(livro) {
   const card =
      `<div class='card-livro'>
         <div class='info-card'>
            <div class='itens-info'>
            <div>
               <p><strong>Titulo:</strong> ${livro['titulo']}</p>
               <p><strong>Autor:</strong> ${livro['autor']}</p>
               <p><strong>Gênero:</strong> ${livro['genero'] || 'Não especificado'}</p>
               <p><strong>Preço:</strong> ${livro['preco']}</p>
               <p><strong>ISBN:</strong> ${livro['isbn']}</p>
               <p><strong>Lançamento:</strong> ${livro['lancamento']}</p>
               <p><strong>Estoque:</strong> ${livro['estoque']}</p>
            </div>
            </div>
            <div class='descri-card'>
               <p><strong>Sinopse:</strong></p>
               <p class='txt-desc'>.....</p>
            </div>
            <div class='fun-card'>
               <div class='grid-buttons'>
                  <button type='button' class='button detalhes' onclick='abrirModal(${livro['id']})'>Detalhes</button>
                  <button type='button' class='button editar'>Editar</button>
               </div>
               <div>
                  <button type='button' class='button excluir'>Excluir</button>
               </div>
            </div>
         </div>
      </div>`

   return card
}

if (lista) dados()

async function abrirModal(id) {
   const buscaId = `${URL_API}/${id}`
   const livro = await fetch(buscaId).then(data => data.json()).catch(erro => msgErro(erro))

   const modal =
      `<div class='fundo'>
         <div class='modal detalhes-livro'>
            <h1>${livro['titulo']}</h1>
            <div>
                  <div class='info-modal'>
                     <p><strong>Autor:</strong> ${livro['autor']}</p>
                     <p><strong>Gênero</strong> ${livro['genero'] || 'Não especificado'}</p>
                     <p><strong>Preço:</strong> ${livro['preco']}</p>
                     <p><strong>ISBN:</strong> ${livro['isbn']}</p>
                     <p><strong>Lançamento:</strong> ${livro['lancamento']}</p>
                     <p><strong>Estoque:</strong> ${livro['estoque']}</p>
                  </div>
                  <div>
                     <p><strong>Sinopse:</strong></p>
                     <p class='sinopse-modal'>...</p>
                  </div>
            </div>
            <button type='button' class='button btn-fechar'>Fechar</button>
         </div>
      </div>`

   document.body.insertAdjacentHTML('beforeend', modal)

   const fundo = document.querySelector('.fundo')
   const btn_fechar = document.querySelector('.btn-fechar')

   const fecharModal = () => fundo.remove()

   btn_fechar.addEventListener('click', fecharModal)
   fundo.addEventListener('click', (event) => {
      if (event.target === fundo) fecharModal()
   })
}