# **Projeto Labecommerce**

API para aplicativo de comércio eletrônico.

Aplicação back-end de servidor express com banco de dados sqlite3.

## Índice
- <a href="#métodos">Métodos disponíveis na API</a>
- <a href="#respostas">Respostas esperadas</a>
- <a href="#documentação">Documentação</a>
- <a href="#tecnologias">Tecnologias utilizadas</a>
- <a href="#pessoas">Pessoas autoras</a>
- <a href="#próximos">Próximos passos</a>


## Métodos
Requisições para a API devem seguir os padrões:
| Método | Descrição |
|---|---|
| `GET` | Retorna informações de um ou mais registros. |
| `POST` | Utilizado para criar um novo registro. |
| `PUT` | Atualiza dados de um registro ou altera sua situação. |
| `DELETE` | Remove um registro do sistema. |

## Respostas

| Código | Descrição |
|---|---|
| `200` | Requisição executada com sucesso (success).|
| `400` | Erros de validação ou os campos informados não existem no sistema.|
| `404` | Registro pesquisado não encontrado (Not found).|
| `409` | Registro pesquisado já existente.|

## Documentação
[Link Demonstração](https://documenter.getpostman.com/view/24424903/2s935hQn8o)

## Tecnologias utilizadas

1. [Node.js](https://nodejs.org/en/)
2. [Typescript](https://www.typescriptlang.org/)
3. [Express](https://expressjs.com/pt-br/)
4. [Cors](https://www.npmjs.com/package/cors)
5. [Knex](https://knexjs.org/)
6. [Sqlite3](https://www.sqlitetutorial.net/)

## Pessoas Autoras

<img style="width:200px" src="https://github.com/Casenrique.png" alt="Imagem do desenvolvedor">

[Linkedin](https://www.linkedin.com/in/carlos-henrique-de-souza-1767311a/)

## Próximos passos

- [ ] Refatoração de código para código mais limpo.


