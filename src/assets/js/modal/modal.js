import { getId, atualizar, deletar, generos } from '../api/api.js'

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
                  <button type='button' class='button editar'  onclick='abrirEditar(${livro['id']})'>Editar</button>
               </div>
               <div>
                  <button type='button' class='button excluir' onclick="apagar(${livro['id']})">Excluir</button>
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

function cardAviso(aviso, tipo = null) {
   const info = (info) => {
      var msg = ""
      if (!info['error'] && tipo == null) {
         msg = `<p>Autor: ${info['autor']}<p>
            <p>Titulo: ${info['titulo']}</p>
            <p>Lançamento: ${data.format(new Date(info['lancamento']))}</p>`
      } else if (!info['error'] && tipo != 'apagar') {
         msg = `<p>${tipo}: ${aviso[tipo]}</p>`
      }

      return msg
   }

   const card =
      `<div class="fundo fundo-aviso">
      <div class="card-aviso">
         <h1>${aviso['error'] || tipo || 'Adicionado!!'}</h1>
         <div>
            <h2>${aviso['message'] || tipo + ' atualizado com sucesso!!' || 'Livro adicinado com sucesso!!'}</h2>
            ${info(aviso)}
         </div>
         <button type="button" class="button btn-fechar-aviso">Fechar</button>
      </div>
   </div>`

   document.body.insertAdjacentHTML('beforeend', card)

   const fundo = document.querySelector('.fundo-aviso')
   const btn_aviso = document.querySelector('.btn-fechar-aviso')

   const fecharAviso = () => {
      fundo.remove()
      window.location.reload(true)
   }

   btn_aviso.addEventListener('click', fecharAviso)
   fundo.addEventListener('click', (event) => {
      if (event.target === fundo) fecharAviso()
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

async function modalEditar(id) {
   const livroAll = await getId(id)
   const genero = await generos()
   const keys = Object.keys(livroAll)
   let selec = null

   const inputsLivros = (valor) => {
      if (valor == 'genero') {
         const opcoes = () => {
            const salve = (g) => {
               if (selec != null) {
                  return
               }

               selec = g['nome'] === livroAll['genero'] ? g['genero'] : null;
            }

            let opcoe = ''
            genero.forEach(g => {
               const selecionado = g['nome'] === livroAll['genero'] ? 'selected' : '';
               salve(g)

               opcoe += `<option value="${g['genero']}" ${selecionado}>${g['nome']}</option>`
            })
            return opcoe
         }

         return `
         <select name="genero" id="genero" disabled>
            ${opcoes()}
         </select>`
      }

      return `<input type="text" id="${valor}" value="${livroAll[valor]}" disabled>`
   }

   var info_editar = ''
   keys.forEach(key => {
      if (key == 'id' || key == 'criado_em') return

      info_editar += `
      <div class="info-editar">
         <div>
            <label for="${key}">${key}</label>
            ${inputsLivros(key)}
         </div>

         <button type="button" class="editar btn-editar btn-${key}"
            onclick="editar('${key}')">Editar</button>
         <div class="box-editar box-${key}">
            <button type="button" class="cancelar btn-editar" onclick="cancelar('${key}')">cancelar</button>
            <button type="button" class="salvar btn-editar" onclick="salvar('${key}')">salvar</button>
         </div>
      </div>`
   })

   const card = `
    <div class="fundo">
        <div class="modal">
            <h1>Livro</h1>
            <div class="editar-card">
                ${info_editar}
            </div>
            <button type="button" class="fechar btn-fechar">Fechar</button>
        </div>
    </div>`

   document.body.insertAdjacentHTML('beforeend', card)

   window.editar = (tipo) => {
      document.querySelector(`.btn-${tipo}`).style.display = 'none'

      document.querySelector(`.box-${tipo}`).style.display = 'grid'

      document.getElementById(tipo).removeAttribute('disabled')
      document.getElementById(tipo).focus()
   }

   window.cancelar = (tipo, resp = null) => {
      const input = document.getElementById(tipo)
      input.disabled = true

      if (tipo != 'genero') {
         input.value = resp || livro[tipo]
      } else {
         input.value = selec
      }

      document.querySelector(`.btn-${tipo}`).style.display = 'flex'

      document.querySelector(`.box-${tipo}`).style.display = 'none'
   }

   window.salvar = async (tipo) => {
      const input = document.getElementById(tipo)

      let livro = null
      if (tipo === 'titulo') livro = { titulo: input.value }
      if (tipo === 'autor') livro = { autor: input.value }
      if (tipo === 'genero') livro = { genero: input.value }
      if (tipo === 'isbn') livro = { isbn: input.value }
      if (tipo === 'preco') livro = { preco: input.value }
      if (tipo === 'estoque') livro = { estoque: input.value }
      if (tipo === 'lancamento') livro = { lancamento: input.value }
      if (tipo === 'sinopse') livro = { sinopse: input.value }

      const resp = await atualizar(livroAll['id'], livro)

      cardAviso(resp, tipo)
      cancelar(tipo, resp[tipo])
   }

   const fundo = document.querySelector('.fundo')
   const btn_fechar = document.querySelector('.btn-fechar')

   const fecharModal = () => fundo.remove()

   btn_fechar.addEventListener('click', fecharModal)
   fundo.addEventListener('click', (event) => {
      if (event.target === fundo) fecharModal()
   })
}

async function cardApagar(id) {
   const card = `
   <div class="fundo">
        <div class="modal apagar-livro">
            <h1>Apagar</h1>
            <p>Deseja realmente apagar esse livro ?</p>
            <div>
                <button type="button" class="button apagar" onclick="apagarLivro(${id})">Apagar</button>
                <button type="button" class="button cancelar btn-fechar">Cancela</button>
            </div>
        </div>
    </div>
   `

   window.apagarLivro = async (id) => {
      const resp = await deletar(id)

      cardAviso(resp, 'apagar')
   }

   document.body.insertAdjacentHTML('beforeend', card)

   const fundo = document.querySelector('.fundo')
   const btn_fechar = document.querySelector('.btn-fechar')

   const fecharModal = () => fundo.remove()

   btn_fechar.addEventListener('click', fecharModal)
   fundo.addEventListener('click', (event) => {
      if (event.target === fundo) fecharModal()
   })
}

export { criarCard, modal, cardApagar, cardHistorico, cardAviso, modalHis, modalEditar }