import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
// Importing Prisma Client
import { PrismaClient } from '@prisma/client';


dotenv.config();

const prisma = new PrismaClient();
const app: Express = express();
const port = process.env.PORT || 5000;

app.use(express.json());

app.get('/', (req: Request, res: Response) => {
    res.send('Express + TypeScript Server, testing Prisma');
});

app.post('/author', async (req: Request, res: Response) => {
    const { name, email } = req.body;
    const user = await prisma.user.create({
        data: {
            name: name,
            email: email,
        },
    });

    res.json(user);
});

app.get('/author', async (req: Request, res: Response) => {
    const users = await prisma.user.findMany()

    res.json(users);
});

app.post('/post', async (req: Request, res: Response) => {
    const { title, content, author } = req.body;
    const post = await prisma.post.create({
        data: {
            title: title,
            content: content,
            author: { connect: { id: author } },
        },
    });

    res.json(post);
});

app.get('/post', async (req: Request, res: Response) => {
    const posts = await prisma.post.findMany()

    res.json(posts);
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});