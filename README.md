**Visão Geral**


A API de Fila de Atendimento é uma solução projetada para gerenciar e otimizar o fluxo de atendimento em ambientes que requerem organização de filas, como serviços de suporte ao cliente, clínicas médicas, serviços governamentais, entre outros. Desenvolvida em TSS (TypeScript Server-Side), a API oferece endpoints que permitem criar, gerenciar e monitorar filas de atendimento de forma eficiente e personalizada.


# My RESTful API

Este projeto é uma API RESTful construída com Node.js e TypeScript.

## Código Font

![image](https://github.com/DevFelipreis/service_queue_back_end/assets/134344282/941a8ca9-f1d7-4ce7-b8a6-42037a5b3a7a)


## Clone o repositório:

``git clone https://github.com/seu-usuario/my-restful-api.git
``

## Instale as dependências:

``cd my-restful-api
npm install
``

## Configuração do Banco de Dados:
### 1. Crie o banco de dados usando o arquivo schema.sql:

``-- Execute este comando no seu cliente de banco de dados
source path/to/schema.sql;
``

### 2. Configure a conexão com o banco de dados no arquivo src/database/db.ts.
Scripts Disponíveis
``npm run build``: Compila o código TypeScript para JavaScript.
``npm run dev``: Inicia o servidor.

## Endpoints
router.post("/login", loginOperator);
router.post("/queue", createServiceQueue);
router.use(loginValidation);
router.post("/queue", createServiceQueue);
router.get("/queue", validationNameServiceQueue, getServiceQueue);
router.post("/operator", validationTicketWindow, validationEmailOperator, createOperators);
router.put("/operator", validationTicketWindow, validationEmailOperator, updateOperators);

## Estrutura do Código
src/controller/operator.ts && 
Controlador para gerenciar as operações relacionadas aos usuários.

src/database/db.ts
Configuração da conexão com o banco de dados.

src/jwt/jwtUtils.ts
Utilitários para gerenciar a autenticação JWT.

src/middleware/authMiddleware.ts
Middleware para verificar a autenticação JWT.

src/router/userRouter.ts
Define as rotas para operações relacionadas aos usuários.

src/types/userTypes.ts
Definições de tipos TypeScript para o usuário.

src/main.ts
Arquivo principal que inicializa o servidor e configura as rotas.

Contribuição
Faça um fork do projeto.
Crie uma branch para a sua feature: git checkout -b minha-feature.
Commit suas mudanças: git commit -m 'Adiciona minha feature'.
Faça push para a branch: git push origin minha-feature.
Envie um pull request.
Licença
Este projeto está licenciado sob a MIT License.
