import express from 'express';
import { PrismaClient } from '@prisma/client';

const app = express();
const prisma = new PrismaClient();

app.use(express.json());

// Criar usuário
app.post('/user', async (req, res) => {
  const { name, email } = req.body;
  const user = await prisma.user.create({ data: { name, email } });
  res.json(user);
});

// Listar todos os usuários
app.get('/users', async (req, res) => {
  const users = await prisma.user.findMany();
  res.json(users);
});

// Buscar um usuário pelo ID
app.get('/users/:id', async (req, res) => {
  const { id } = req.params;
  const user = await prisma.user.findUnique({
    where: { id: Number(id) }, // se o id for INT no schema
  });

  if (!user) {
    return res.status(404).json({ error: "Usuário não encontrado" });
  }

  res.json(user);
});

app.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
});

