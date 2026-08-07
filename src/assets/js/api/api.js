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

async function atualizar(id, valor) {
    const update = await fetch(`${URL_API}/${id}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json; charset=UTF-8'
        },
        body: JSON.stringify(valor)
    }).then(data => data.json())

    return update
}

async function deletar(id) {
    const del = await fetch(`${URL_API}/${id}`, {
        method: 'DELETE'
    }).then(data => data.json())

    return del
}

async function getLivros() {
    const resp = await fetch(`${URL_API}`).then(data => data.json())

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

async function historico(ordem = true) {
    const resp = await fetch(`${URL_API}/historico?ordem=${ordem}`).then(data => data.json())

    return resp
}

async function generos() {
    const resp = await fetch(`${URL_API}/generos`).then(data => data.json())

    return resp
}

export { post, atualizar, deletar, getLivros, busca, getId, historico, generos }