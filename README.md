# Valida Boletos

API desenvolvida para validar linha digitável de um boleto


# Objetivo

Ter uma API construída em Node.JS com endpoint(s) que receba a linha digitável de um boleto e retorne se a mesma é válida, sua data de vencimento (se houver) e seu valor (se houver).

# Instalação
### Requisitos
- [Git](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git)
- [Node.js](https://nodejs.org/) v4+
- [Yarn](https://yarnpkg.com/getting-started)

### Fazer clone do repositório
```
$ git clone https://github.com/pedrolucasD/api-valida-boleto.git
```
### Acessar repositório clonado
```
$ cd api-valida-boleto
```
### Instalar as dependências
```
$ yarn
```

### Ligar o servidor
```
$ yarn dev
```
O servidor irá funcionar na porta 3333 e pode ser alterado no arquivo "index.ts"

# Como usar
Com o servidor ligado acesse a documentação do Swagger que contém todo o detalhamento dos endpoints existentes e os testes
```
http://localhost:3333/swagger/
```

# Tecnologias
- [Node.js](https://nodejs.org/)
- [Typescript](https://www.typescriptlang.org/)
- [Express.js](https://expressjs.com/pt-br/)
- [Swagger](https://swagger.io/)

# Features
- [x] Estrutura do projeto
- [x] Endpoint para validação de Título Bancário
- [ ] Validar valores acima de 99.999.999,99
- [ ] Validar moeda
- [ ] Endpoint para validação de Título de Pagamentos de Concessionárias
- [ ] Configuração do Swagger
- [ ] Refatorar

# Informações importantes
Até o presente momento, de acordo com as features listadas acima, a API valida apenas Titulos Bancários nacionais (BR) com valores até R$ 99.999.999,99.

# Autor
Pedro Soares
plucas.soarespinto@gmail.com
