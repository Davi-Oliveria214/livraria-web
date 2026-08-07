import { historico } from '../api/api.js'
import { cardHistorico, modalHis } from '../modal/modal.js'

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

let carregando = false;

if (container) container.addEventListener('scroll', () => {
    var scroll = container.scrollTop
    var off = container.children.length
    var limit = 5

    if (carregando) return;

    if ((scroll + container.clientHeight) >= (container.scrollHeight - 500)) {
        gerarMais();
    }
})


async function gerarMais(ordem = true) {
    carregando = true;

    const resp = await historico(ordem)

    if (resp && resp.length > 0) {
        let cards = ""

        resp.forEach(livro => {
            cards += cardHistorico(livro)
        })

        container.insertAdjacentHTML('beforeend', cards)
    }

    carregando = false;
}

dados()

window.abrirModal = modalHis;