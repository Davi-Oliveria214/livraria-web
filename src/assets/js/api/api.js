const form = document.getElementById('form-livro')

let dadosForm = null
form.onsubmit = function (event) {
    event.preventDefault()

    const formData = new FormData(form)
    dadosForm = {
        titulo: formData.get('titulo'),
        autor: formData.get('autor'),
        isbn: formData.get('isbn'),
        preco: formData.get('preco'),
        lancamento: formData.get('lancamento'),
        genero: formData.get('genero'),
        estoque: formData.get('estoque'),
        sinopse: formData.get('sinopse')
    }

    post(dadosForm)
}

async function post(json) {
    const enviar = await fetch(URL_API, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(json)
    });

    const teste = await enviar.json()
    console.log(teste)
}