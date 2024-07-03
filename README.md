# serviceQueue API

## Visão Geral

A API de Fila de Atendimento é uma solução projetada para gerenciar e otimizar o fluxo de atendimento em ambientes que requerem organização de filas, como serviços de suporte ao cliente, clínicas médicas, serviços governamentais, entre outros. Desenvolvida em TSS (TypeScript Server-Side), a API oferece endpoints que permitem criar, gerenciar e monitorar filas de atendimento de forma eficiente e personalizada.

## Código Fonte

![image](https://github.com/DevFelipreis/service_queue_back_end/assets/134344282/941a8ca9-f1d7-4ce7-b8a6-42037a5b3a7a)

## Instalação

### Clone o Repositório

![image](https://github.com/DevFelipreis/service_queue_back_end/assets/134344282/0637cae8-86d3-498c-ba48-55b96b82a9c0)

```sh
git clone git@github.com:DevFelipreis/service_queue_back_end.git
```

### Instale as Dependências

```sh
cd service_queue_back_end
npm install
```

## Configuração do Banco de Dados

### 1. Crie o banco de dados usando o arquivo `schema.sql`

Execute este comando no seu cliente de banco de dados:

```sql
source path/to/schema.sql;
```

### 2. Configure a Conexão com o Banco de Dados

Edite o arquivo `src/database/connection.ts` para configurar a conexão com o banco de dados.

## Scripts Disponíveis

- `npm run build`: Compila o código TypeScript para JavaScript.
- `npm run dev`: Inicia o servidor.

## Endpoints

- `POST /login`: Login de operadores.
- `POST /queue`: Cria uma nova fila de atendimento.
- `GET /queue`: Obtém a fila de atendimento atual.
- `POST /operator`: Cria um novo operador.
- `PUT /operator`: Atualiza um operador existente.

## Estrutura do Código

### `src/controller/operator.ts` & `src/controller/serviceQueue.ts`

Controladores para gerenciar as operações relacionadas aos operadores e filas de atendimento.

### `src/database/connection.ts`

Configuração da conexão com o banco de dados.

### `src/jwt/jwtHash.ts` & `src/jwt/jwtTokenUser.ts`

Utilitários para gerenciar a autenticação JWT.

### `src/middleware/operator.ts` & `src/middleware/queue.ts`

Middleware para verificar a autenticação JWT e outras.

### `src/router/router.ts`

Define as rotas para operações relacionadas aos usuários.

### `src/types/Types.ts`

Definições de tipos TypeScript para o usuário.

### `src/main.ts`

Arquivo principal que inicializa o servidor e configura as rotas.

### Outros Arquivos

- `.env.example`: Exemplo de configuração de variáveis de ambiente.
- `.gitignore`: Arquivos e diretórios a serem ignorados pelo Git.
- `LICENSE`: Licença do projeto.
- `package-lock.json` & `package.json`: Dependências do projeto.
- `README.md`: Documentação do projeto.
- `tsconfig.json`: Configuração do TypeScript.

## Contribuição

1. Faça um fork do projeto.
2. Crie uma branch para a sua feature: `git checkout -b minha-feature`.
3. Commit suas mudanças: `git commit -m 'Adiciona minha feature'`.
4. Faça push para a branch: `git push origin minha-feature`.
5. Envie um pull request.

## Licença

Este projeto está licenciado sob a [MIT License](LICENSE).
