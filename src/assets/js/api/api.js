const URL_API = 'http://127.0.0.1:8080/livraria'

async function post(livro) {
    const adicionar = await fetch(URL_API, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(livro)
    }).then(data => data.json())

    return adicionar
}

async function getLivros(limit = 10, off = 0) {
    const resp = await fetch(`${URL_API}?limit=${limit}&off=${off}`).then(data => data.json())

    return resp
}

async function busca(tipo, valor) {
    const resp = await fetch(`${URL_API}/filtro/${tipo}?valor=${valor}`).then(data => data.json())

    return resp
}

async function getId(id) {
    const resp = await fetch(`${URL_API}/${id}`).then(data => data.json())

    return resp
}

async function historico(limit = 10, off = 10, ordem = false) {
    const resp = await fetch(`${URL_API}/historico?orem=${ordem}&limit=${limit}&off=${off}`).then(data => data.json())

    return resp
}

async function generos(limit = 10, off = 0) {
    const resp = await fetch(`${URL_API}/generos?limit=${limit}&off=${off}`).then(data => data.json())

    return resp
}

export { post, getLivros, busca, getId, historico, generos }