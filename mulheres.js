const express = require("express")
const router = express.Router()
const app = express()
const porta = 3333
const mulheres = [
    {
    nome: "Penélope Teixeira",
    imagem: "https://grroiowa.org/wp-content/uploads/elementor/thumbs/298C5DC2-BB12-4D52-85B4-E1DB95CF1B30-450-x-600-rcwn8lp88j7329o6hy5oyy7ktdh7o66rafbrtlsfwo.jpg",
    minibio: "Uma mulher incrível que está aprendendo a se amar e a programar e que a personalidade é 75% golden e 25% gatinha."
    },
    {
    nome: 'Simara Conceição',
    imagem: 'https://bit.ly/3LJIyOF',
    minibio: 'Desenvolvedora e instrutora',
    },
    {
    nome: 'Iana Chan',
    imagem: 'https://bit.ly/3JCXBqP',
    minibio: 'CEO & Founder da PrograMaria',
    }
]

function mostraMulheres (request, response) {
    response.json (mulheres)
}

function mostraPorta() {
    console.log("Servidor criado e rodando na porta: ", porta)
}

app.use(router.get("/mulheres", mostraMulheres))
app.listen(porta, mostraPorta)