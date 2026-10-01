const pedidos = require("../../dados/pedidos.json")

function subotais() {
    pedidos.forEach(p => {
        p.subtotal = p.quantidade * p.preco
    })
}
const criar = (req, res) => {
    const dados = req.body
    dados.id = Number(pedidos[pedidos.length - 1].id) + 1 //autoIncrement
    pedidos.push(dados)
    res.status(201).json(dados)
}
const listar = (req, res) => {
    subotais()
    res.json(pedidos)
}
const alterar = (req, res) => {
    const id = Number(req.params.id)
    const indice = pedidos.findIndex(p => p.id === id)

    if (indice === -1) {
        return res.status(404).json({ mensagem: "Pedido não encontrado" })
    }

    pedidos[indice] = {
        ...pedidos[indice],
        ...req.body,
        id: id
    }

    res.json(pedidos[indice])
}

const excluir = (req, res) => {
    const id = Number(req.params.id)
    const indice = pedidos.findIndex(p => p.id === id)

    if (indice === -1) {
        return res.status(404).json({ mensagem: "Pedido não encontrado" })
    }

    const pedido = pedidos.splice(indice, 1)

    res.json(pedido[0])
}

module.exports = {
    criar, listar, alterar, excluir
}