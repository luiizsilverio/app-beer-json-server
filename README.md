<table>
  <tr>
    <td><img src="https://github.com/luiizsilverio/app-beer-json-server/blob/main/src/assets/caneca1.png" /></td>
    <td><h1>APP-BEER</h1></td>
  </tr>
</table>

## Conteúdo
* [Sobre o Projeto](#sobre-o-projeto)
* [Tecnologias](#hammer_and_wrench-tecnologias)
* [Screenshots](#camera_flash-screenshots)
* [Iniciando o Projeto](#car-Iniciando-o-projeto)
* [Licença](#balance_scale-licença)
* [Contato](#email-contato)

## Sobre o projeto
Aplicação desenvolvida em React Native e Typescript para controlar a ocupação das mesas de um bar ou restaurante.<br />
Permite lançar o consumo dos clientes, fechar a conta, cadastrar produtos e categorias.<br />
Controle simples de acesso, por meio de uma senha de administrador, que dá acesso à tela de fechamento e aos cadastros.<br />
Desenvolvi esta aplicação sozinho, do zero, sem acompanhar aula ou maratona.<br />
Esta versão armazena os dados em uma API fake (Json-Server), mas tem a versão definitiva que acessa uma [API externa](https://github.com/luiizsilverio/beer-api), desenvolvida em Node, que utiliza banco de dados SQLite.<br />

## :hammer_and_wrench: Tecnologias
* <ins>React Native</ins>
* <ins>Typescript</ins>
* Estilização dos componentes com <ins>Styled-Components</ins>
* <ins>Expo</ins>: componentes de fonte, ícones, status-bar etc.
* API fake com <ins>JSON-Server</ins>
* Controle e validação de formulários com <ins>Formik</ins> e <ins>Yup</ins>
* Animação com <ins>Lottie-react-native</ins>
* Rotas com <ins>React-navigation/native</ins>
* Acesso à API através do <ins>Axios</ins>

## :camera_flash: Screenshots
![](https://github.com/luiizsilverio/happy-react-native/blob/main/assets/happy.gif)

## :car: Iniciando o projeto
* Baixe e instale o <ins>ExpoGo</ins> no dispositivo (celular ou emulador)
* Baixe o repositório com ``` git clone ``` e entre na pasta do projeto.
* Informe o IP do computador no arquivo ``` src/services/api.ts ```, em ``` baseURL ```.
* Digite ``` yarn ``` no terminal, para inicializar o projeto.
* Inicie a API fake no terminal, com o comando ``` yarn server ```
* Digite ``` expo start ``` no terminal, para executar o projeto.

## :balance_scale: Licença
Este projeto está licenciado sob a [licença MIT](LICENSE).

## :email: Contato

E-mail: [**luiiz.silverio@gmail.com**](mailto:luiiz.silverio@gmail.com)
