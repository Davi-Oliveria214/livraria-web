import { post, generos } from '../api/api.js'
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

async function gerarGeneros() {
    const resp = await generos()

    if (resp['error']) return

    let options = ''
    resp.forEach(data => {
        options += `<option value="${data['codigo']}" selected>${data['nome']}</option>`
    })

    document.getElementById('genero').insertAdjacentHTML('afterbegin', options)
}

gerarGeneros()