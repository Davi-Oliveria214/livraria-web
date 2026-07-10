import { post } from '../api/api.js'
import { cardAviso } from '../modal/modal.js'

const form = document.getElementById('form-livro')
form.onsubmit = async function (event) {
    event.preventDefault()

    const formData = new FormData(form)

    const livro = {
        titulo: formData.get('titulo'),
        autor: formData.get('autor'),
        genero: formData.get('genero'),
        isbn: formData.get('isbn'),
        preco: formData.get('preco'),
        estoque: formData.get('estoque'),
        lancamento: formData.get('lancamento'),
        sinopse: formData.get('sinopse')
    }

    const resp = await post(livro)

    cardAviso(resp)
}