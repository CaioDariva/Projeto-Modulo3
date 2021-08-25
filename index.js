const express = require("express");

const app = express();

app.use(express.json());

const port = 3000;

const jogos = [];

// criando rota home "/"
app.get("/", (req, res) => {
    res.status(200).send("Jogos do Caio!");
});

// criando a rota para lista de todos os jogos
app.get("/jogos", (req, res) => {
    res.json(jogos);
});

// criando a rota para inserir jogos
app.post("/jogos", (req, res) =>{
    jogo = req.body;

    // validação do jogo que será acrescentado
    if (!jogo || !jogo.nome || !jogo.imagem) {
        res.status(400).send({ error: "Jogo inválido!"});
        return;
    }

    //criação automática da ID
    const ultimoJogo = jogos[jogos.length - 1];
    if (jogos.length) {
        jogo.id = ultimoJogo.id + 1;
        jogos.push(jogo);
    } else {
        jogo.id = 1;
        jogos.push(jogo);
    }
    // res a ser enviada
    res.status(201).send({jogo});
});

// criando a rota para escolher o jogo pela ID
app.get("/jogos/:idJogo", (req, res) =>{
    const id = +req.params.idJogo;
    const jogo = jogos.find((jogo) => jogo.id === id);
    !jogo ? res.status(404).send({ error: "Jogo não existe."}) : res.json({jogo});
});

// criando a rota para editar um jogo
app.put("/jogos/:id", (req, res) =>{
    const id = +req.params.id -1;
    const jogo = req.body.jogo;
    jogos[id] = jogo;
    res.send("Jogo alterado com sucesso!");
});

// criando a rota para deletar um jogo
app.delete("/jogos/:id", (req, res) =>{
    const id = +req.params.id -1;
    delete jogos[id];
    res.send("Jogo deletado com sucesso!")
});

app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`)
});