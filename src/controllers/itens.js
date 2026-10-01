const itens = require("../../dados/itens.json")

function calcularSubtotal(item) {
    item.subtotal = item.quantidade * item.preco
}

const criar = (req, res) => {
    const dados = req.body

    dados.id = Number(itens[itens.length - 1].id) + 1
    calcularSubtotal(dados)

    itens.push(dados)

    res.status(201).json(dados)
}

const listar = (req, res) => {
    itens.forEach(item => {
        calcularSubtotal(item)
    })

    res.json(itens)
}

const alterar = (req, res) => {
    const id = Number(req.params.id)
    const indice = itens.findIndex(item => item.id === id)

    if (indice === -1) {
        return res.status(404).json({
            mensagem: "Item não encontrado"
        })
    }

    itens[indice] = {
        ...itens[indice],
        ...req.body,
        id: id
    }

    calcularSubtotal(itens[indice])

    res.json(itens[indice])
}

const excluir = (req, res) => {
    const id = Number(req.params.id)
    const indice = itens.findIndex(item => item.id === id)

    if (indice === -1) {
        return res.status(404).json({
            mensagem: "Item não encontrado"
        })
    }

    const item = itens.splice(indice, 1)

    res.json(item[0])
}

module.exports = {
    criar,
    listar,
    alterar,
    excluir
}