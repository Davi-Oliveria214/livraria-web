import { getId } from '../api/api.js'

const data = new Intl.DateTimeFormat('pt-br', {
   dateStyle: 'short',
})

const hora = new Intl.DateTimeFormat('pt-br', {
   timeStyle: 'short',
})

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
               <p><strong>Lançamento:</strong> ${data.format(new Date(livro['lancamento']))}</p>
               <p><strong>Estoque:</strong> ${livro['estoque']}</p>
            </div>
            </div>
            <div class='descri-card'>
               <p><strong>Sinopse:</strong></p>
               <p class='txt-desc'>${livro['sinopse']}</p>
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

function cardHistorico(livro) {
   const card =
      `<div class="his-card">
      <div class="info-card">
         <p><strong>Titulo: </strong>${livro['titulo']}</p>
         <p><strong>Autor: </strong>${livro['autor']}</p>
         <p><strong>ISBN: </strong>${livro['isbn']}</p>
         <p><strong>Adicionado:</strong> ${data.format(new Date(livro['criado_em']))} / ${hora.format(new Date(livro['criado_em']))}</p>
      </div>
      <div class="his-btn">
         <button type="button" onclick='abrirModal(${livro['id']})' class="editar button">
            Detalhes
         </button>
      </div>
   </div>`

   return card
}

function cardAviso(aviso) {
   const info = function mostar(info) {
      var msg = ""
      if (!info['error']) {
         msg = `<p>Autor: ${info['autor']}<p>
            <p>Titulo: ${info['titulo']}</p>
            <p>Lançamento: ${data.format(new Date(info['lancamento']))}</p>`
      }

      return msg
   }

   const card =
      `<div class="fundo">
      <div class="card-aviso">
         <h1>${aviso['error'] || 'Adicionado!!'}</h1>
         <div>
            <p>${aviso['message'] || 'Livro adicinado com sucesso!!'}</p>
            ${info(aviso)}
         </div>
         <button type="button" class="button btn-fechar">Fechar</button>
      </div>
   </div>`

   document.body.insertAdjacentHTML('beforeend', card)

   const fundo = document.querySelector('.fundo')
   const btn_fechar = document.querySelector('.btn-fechar')

   const fecharModal = () => fundo.remove()

   btn_fechar.addEventListener('click', fecharModal)
   fundo.addEventListener('click', (event) => {
      if (event.target === fundo) fecharModal()
   })
}

async function modal(id) {
   const livro = await getId(id)

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
                     <p><strong>Lançamento:</strong> ${data.format(new Date(livro['lancamento']))}</p>
                     <p><strong>Estoque:</strong> ${livro['estoque']}</p>
                  </div>
                  <div>
                     <p><strong>Sinopse:</strong></p>
                     <p class='sinopse-modal'>${livro['sinopse']}</p>
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

async function modalHis(id) {
   const livro = await getId(id)

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
                     <p><strong>Lançamento:</strong> ${data.format(new Date(livro['lancamento']))}</p>
                     <p><strong>Estoque:</strong> ${livro['estoque']}</p>
                     <p><strong>Adicionado:</strong> ${data.format(new Date(livro['criado_em']))} / ${hora.format(new Date(livro['criado_em']))}</p>
                  </div>
                  <div>
                     <p><strong>Sinopse:</strong></p>
                     <p class='sinopse-modal'>${livro['sinopse']}</p>
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

export { criarCard, modal, cardHistorico, cardAviso, modalHis }