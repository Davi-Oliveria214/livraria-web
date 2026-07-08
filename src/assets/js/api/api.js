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

async function getLivros() {
    const resp = await fetch(URL_API).then(data => data.json())

    return resp
}

async function plusLivros(limit, off) {
    const resp = await fetch(`${URL_API}?limit=${limit}&off=${off}`).then(data => data.json())

    return resp
}

async function getId(id) {
    const resp = await fetch(`${URL_API}/${id}`).then(data => data.json())

    return resp
}

async function historico() {
    const resp = await fetch(`${URL_API}/historico?limit=10`).then(data => data.json())

    return resp
}

async function plusHistorico(ordem, limit, off) {
    const resp = await fetch(`${URL_API}/historico?ordem=${ordem}&limit=${limit}&off=${off}`)

    return resp
}

export { post, getLivros, getId, plusLivros, historico, plusHistorico }