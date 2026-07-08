import { historico, plusHistorico } from '../api/api.js'
import { cardHistorico, modal } from '../modal/modal.js'

const container = document.getElementById('lista')

async function dados() {
    if (!container) return;

    const livros = await historico()

    if (livros || livros.length > 0) {
        var his = ""
        livros.forEach(livro => {
            his += cardHistorico(livro)
        })
        container.insertAdjacentHTML('afterbegin', his)
    }
}

dados()

window.abrirModal = modal;