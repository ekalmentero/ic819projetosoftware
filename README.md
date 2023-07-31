# Puppy Resort 🐾🌴

## Trabalho da disciplina Projeto de Software da UFRRJ

### Passo 1: Instalação e inicialização da API

Certifique-se de ter o Node.js e o Prisma instalados em seu sistema. Em seguida, abra o terminal na pasta /api do projeto e execute o seguinte comando para instalar as dependências:

```bash
yarn install

ou

npm intall
```

### Passo 2: Configuração do banco de dados com Prisma

Antes de executar a migração, certifique-se de ter configurado corretamente o Prisma para se conectar ao seu banco de dados. Isso envolve criar o arquivo .env na raiz do projeto e definir as variáveis de ambiente necessárias para a conexão do banco de dados. Por exemplo:

```bash
DATABASE_URL=mysql://root:123456@localhost:3306/puppy_resort
```

### Passo 3: Criação e execução das migrações do Prisma

Para criar e executar as migrações do Prisma, execute o seguinte comando:

```bash
npx prisma migrate dev --name init
```

O comando acima criará a primeira migração e aplicará as alterações ao banco de dados.

### Passo 4: Variáveis de ambiente necessárias

```bash
PORT=8081
DATABASE_URL=mysql://root:123456@localhost:3306/puppy_resort
TOKEN_SECRET=asdsdsd
SALT=10
```

### Passo 5: Iniciando o servidor

Para iniciar o servidor, execute o seguinte comando:
```bash
yarn start

ou

npm run start
```

Agora a API está sendo executada e pronta para ser usada.

### Passo 6: Instalação e inicialização do cliente

Certifique-se de ter o Node.js instalado em seu sistema. Em seguida, abra o terminal na pasta /client do projeto e execute o seguinte comando para instalar as dependências:

```bash
yarn install

ou

npm install
```

### Passo 7: Iniciando o cliente

Para iniciar o cliene, execute o seguinte comando:
```bash
yarn dev

ou

npm run dev
```

### Passo 8: Variáveis de ambiente

```bash
BASE_API=http://localhost:8081/api
```
