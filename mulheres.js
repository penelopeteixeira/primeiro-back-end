const express = require("express") // aqui estou inicializando o express
const router = express.Router() // aqui estou configurando a primeira parte da rota
const cors = require("cors") // aqui estou puxando o cors
const conectaBancoDeDados = require("./bancoDeDados") // aqui estou puxando a função de conexão com o banco de dados
conectaBancoDeDados() // aqui estou conectando ao banco de dados

const Mulher = require("./mulherModel") // aqui estou puxando o modelo mulher

const app = express() // aqui estou inicializando o app
app.use(express.json()) // aqui estou falando para o express usar json
app.use(cors()) // aqui estou falando para o app usar o cors
const porta = 3333 // aqui estou criando a porta


//GET
async function mostraMulheres (request, response) {
    try {
        const mulheresVindasDoBancoDeDados = await Mulher.find()
        response.json(mulheresVindasDoBancoDeDados)
    }catch (erro) {
        console.log(erro)
    }
}


// POST
async function criaMulher (request, response) {
    const novaMulher = new Mulher ({
        nome: request.body.nome,
        imagem: request.body.imagem,
        minibio: request.body.minibio,
        citacao: request.body.citacao
    })
    try {
        const mulherCriada = await novaMulher.save()
        response.status(201).json(mulherCriada)
    } catch (erro) {
        console.log(erro)
    }
}


// PATCH
async function corrigeMulher (request, response) {
    try {
        const mulherEncontrada = await Mulher.findById(request.params.id)
        
        if (request.body.nome) {
            mulherEncontrada.nome = request.body.nome
        }

        if (request.body.imagem) {
            mulherEncontrada.imagem = request.body.imagem
        }

        if (request.body.minibio) {
            mulherEncontrada.minibio = request.body.minibio
        }

        if (request.body.citacao) {
            mulherEncontrada.citacao = request.body.citacao 
        }

        const mulherAtualizada = await mulherEncontrada.save()
        response.json(mulherAtualizada)
        }
        catch (erro) {
            console.log(erro)
        }
}


// DELETE
async function deletaMulher (request, response) {
    try {
        await Mulher.findByIdAndDelete(request.params.id)
        response.json({mensagem: "Mulher deletada com sucesso!"})
    }
    catch (erro) {
        console.log(erro)
    }
}


// Rotas no router
router.get("/mulheres", mostraMulheres) //configuraçã da rota GET /mulheres
router.post("/mulheres", criaMulher) //configuração da rota POST /mulheres
router.patch("/mulheres/:id", corrigeMulher) //configuração da rota PATCH /mulheres/:id
router.delete("/mulheres/:id", deletaMulher) //configuração da rota DELETE /mulheres/:id

// Monta o router uma única vez
app.use(router)


// porta
function mostraPorta() {
    console.log("Servidor criado e rodando na porta: ", porta)
}

app.listen(porta, mostraPorta) //servidor ouvindo a porta