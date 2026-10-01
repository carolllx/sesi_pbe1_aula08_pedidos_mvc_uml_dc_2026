const produtos = require("../../dados/produtos.json")

const criar = (req, res) => {
    const dados = req.body
    dados.id = Number(produtos[produtos.length - 1].id) + 1
    produtos.push(dados)
    res.status(201).json(dados)
}

const listar = (req, res) => {
    res.json(produtos)
}

const alterar = (req, res) => {
    const id = Number(req.params.id)
    const indice = produtos.findIndex(p => p.id === id)

    if (indice === -1) {
        return res.status(404).json({ mensagem: "Produto não encontrado" })
    }

    produtos[indice] = {
        ...produtos[indice],
        ...req.body,
        id: id
    }

    res.json(produtos[indice])
}

const excluir = (req, res) => {
    const id = Number(req.params.id)
    const indice = produtos.findIndex(p => p.id === id)

    if (indice === -1) {
        return res.status(404).json({ mensagem: "Produto não encontrado" })
    }

    const produto = produtos.splice(indice, 1)

    res.json(produto[0])
}

module.exports = {
    criar,
    listar,
    alterar,
    excluir
}