const maxWidth = 600;

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
   const URL = 'http://127.0.0.1:8080/livraria'
   const resp = await fetch(URL).then(data => data.json()).catch(erro => lista.innerHTML = msgErro(erro))

   let cards = ''
   resp.forEach(livro => {
      cards += criarCard(livro)
   });

   lista.innerHTML = cards
}

function msgErro(erro) {
   const mensagem = `<p class='erro'>Erro na conexão da API livraria ${erro}</p>`
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

dados()

async function abrirModal(id) {
   const URL = `http://127.0.0.1:8080/livraria/${id}`
   const livro = await fetch(URL).then(data => data.json()).catch(erro => lista.innerHTML = msgErro(erro))

   // fetch('../src/components/modal.html')
   //    .then(modal => modal.text())
   //    .then(text => document.body.innerHTML += text)

   const modal =
      `<div class='fundo'>
      <div class='modal-detalhes'>
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
               <button type='button'>Fechar</button>
         </div>
      </div>
   </div>`

   document.body.innerHTML += modal
}