To-Do List — Fullstack (React + Node + Prisma + PostgreSQL Render)
Este projeto é uma aplicação completa de gerenciamento de tarefas, com frontend em React tsx, backend em Node/Express, Prisma, PostgreSQL hospedado no Render e autenticação JWT.

Tecnologias Utilizadas
 1.Backend
    Node.js + Express
    Prisma ORM
    PostgreSQL (Render)
    JWT
    Zod
    Swagger

 2.Frontend
    React + Vite
    Axios
    React Router
    Redux Toolkit

1. Backend
    - Entrar na pasta do backend - cd backend
    - Instalar dependências - npm i
    - Criar arquivo .env com as variáveis:
        DATABASE_URL="postgresql://todo_db_nh3v_user:vmAnnjBuypjT9X2NZmdq3qv5o2PrLPWJ@dpg-d4dqsl24d50c73bipeog-a.oregon-postgres.render.com/todo_db_nh3v?sslmode=require"
        JWT_SECRET="AJDKQ9354JF"
        PORT=3000
    - Rodar o servidor em modo desenvolvimento - npm run dev
    - Rodar a versão compilada - npm start

2. Frontend
    - Entrar na pasta do frontend - cd frontend
    - Instalar dependências - npm i
    - Criar arquivo .env com as variáveis:
        VITE_API_URL="http://localhost:3000/api"
    - Rodar o frontend - npm run dev

3. Documentação da API
    - Após iniciar o backend, acesso em - http://localhost:3000/docs