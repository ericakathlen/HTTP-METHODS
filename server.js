const express = require('express');
const app = express();

// Middleware para processar o corpo das requisições
app.use(express.json());

const users = [
    { id: 1, name: 'João' },
    { id: 2, name: 'Maria' },
    { id: 3, name: 'José' }
];

// Método GET - Para recuperar dados
app.get('/users', (req, res) => {
    res.json(users);
});

// Método POST - Para criar dados
app.post('/users', (req, res) => {
    const { name } = req.body;
    const newUser = { id: users.length + 1, name };
    users.push(newUser);
    res.status(201).json(newUser);
});

// Método PUT - Para atualizar dados
app.put('/users/:id', (req, res) => {
    const { id } = req.params;
    const { name } = req.body;

    const user = users.find(user => user.id === parseInt(id));

    if (!user) {
        return res.status(404).json({ message: 'Usuário não encontrado' });
    }

    user.name = name;
    res.json(user);
});

// Método DELETE - Para excluir dados
app.delete('/users/:id', (req, res) => {
    const { id } = req.params;

    const userIndex = users.findIndex(user => user.id === parseInt(id));

    if (userIndex === -1) {
        return res.status(404).json({ message: 'Usuário não encontrado' });
    }

    users.splice(userIndex, 1);
    res.status(204).send();
});

// Definir a porta do servidor
app.listen(3000, () => {
    console.log('Servidor rodando na porta 3000');
});
