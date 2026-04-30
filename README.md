# FiapRoom App

## 📌 Sobre o Projeto

**FiapRoom:** O FiapRoom é um aplicativo desenvolvido para solucionar um problema recorrente na FIAP: a dificuldade em encontrar salas livres para estudos. Muitas vezes, os alunos perdem tempo procurando espaços disponíveis ou precisam recorrer a funcionários para obter essa informação. Com isso, o app surge como uma solução para agilizar e facilitar a rotina dos estudantes.


**Operação FIAP Escolhida:** A operação da FIAP escolhida foi a de consulta de salas vazias, principalmente por ser algo que afeta diariamente inúmeros alunos da faculdade que buscam salas livres para estudar e realizar suas atividades. Atualmente, essa solução ainda não foi implementada nos sites e aplicativos da FIAP, o que torna o app um  recurso eficiente, permitindo que os estudantes consultem a disponibilidade de salas em poucos segundos, sem precisar perguntar diretamente para nenhum funcionário.

**O que mudou / melhorou em relação ao CP1:** 
Para a CP2 , o grupo fez as seguintes mudanças / melhorias:

* **Adição das telas de autenticação (Login e Cadastro).**
* **Formulários com validação.**
* **Dados persistidos com AsyncStorage.**
* **Criação de Context para gerenciar o estado global das telas.**
* **Melhorias visuais no App.**
* **Novas funcionalidades.**
* **Melhorias de UX/UI.**

**Funcionalidades Implementadas:**
* **Tela Home**: Tela inicial do app, com botões de navegação para as telas de verificação de salas livres e de reserva de salas disponíveis.

* **Tela de Salas**: Tela de visualização das salas disponíveis organizadas dentro de cards com as informações do número e andar da sala, unidade, horário e o status.

* **Tela de Reserva**: Tela com um botão de reserva, que permite aos usuários reservarem uma sala que esteja disponível naquele momento.

* **Botão de voltar**: botão que permite ao usuário retornar para a tela inicial do aplicativo.

* **Tela de cadastro**: Tela que permite ao usuário criar uma conta para poder entrar no App.

* **Tela de Login**: Tela que permite ao usuário logar no App com a sua conta criada.

* **Botão de Logout**: Funcionalidade que permite o usuário sair da sua conta e do App, retornando assim a tela de Login.

* **Validação de formulários**:  Impede que o usuário deixe um campo vazio ou incorreto.

* **Feedback visual**: Um feedback visual de erros, quando o usuários esquece de preencher um campo ou preenche incorretamente, e um de sucesso quando o formulário é enviado.

---

## 👥 Integrantes do Grupo

* **Giovanni de Lela** — RM: 563066
* **Gabriel Nakamura** — RM: 562221
* **Gisleine** — RM: 563804

---

## 🚀 Como Rodar o Projeto

### Pré-requisitos
Certifique-se de ter as seguintes ferramentas instaladas na sua máquina:
* [Node.js](https://nodejs.org/en/) (versão X.X ou superior)
* [Expo CLI](https://docs.expo.dev/get-started/installation/) (`npm install -g expo-cli`)
* Aplicativo **Expo Go** instalado no seu smartphone (Android ou iOS) ou um emulador configurado.

### Passo a Passo

1. **Clone o repositório:**
   ```bash
   git clone https://github.com/Gabriel-H182007/fiap-cpad-cp1-fiaproom-app.git
2. **Acesse a pasta do projeto**
    ```bash
    cd fiap-cpad-cp1-fiaproom-app
3. **Instale as dependências:**
    ```bash
    npm install
    # ou
    yarn install
4. **Inicie o servidor de desenvolvimento:**
    ```bash
    npx expo start
5. **Execute no dispositivo:**

Escaneie o QR Code que aparecerá no terminal usando o aplicativo Expo Go no seu celular.

Ou pressione a no terminal para abrir no emulador Android, ou i para o simulador iOS.

## Screenshots


# 🛠️ Decisões Técnicas
## Estrutura do Projeto

O projeto foi desenvolvido utilizando React Native com Expo, com uma estrutura baseada em componentização. As responsabilidades foram separadas entre telas (screens) e componentes reutilizáveis (components), facilitando a organização do código e a manutenção. A navegação é baseada em rotas dentro da pasta app/, de acordo com o Expo Router.

## Hooks Utilizados

useState: Utilizado para gerenciar estados locais das telas, como dados exibidos e interações do usuário.

useEffect: Utilizado para executar efeitos colaterais, como carregamento inicial de dados ao abrir a tela.

## Navegação

A navegação foi estruturada utilizando o Expo Router, permitindo a transição entre diferentes telas do aplicativo.

Organização baseada em rotas

Separação clara entre telas

Navegação fluida entre funcionalidades

# 📘 Proximos Passos


## O que o grupo implementaria com mais tempo

## Melhorar o visual do app ## 
Ajustar cores, tamanhos e organização das telas para deixar mais bonito e fácil de usar

## Adicionar mais telas ##
Criar novas funcionalidades ou páginas para deixar o app mais completo

## Adicionar validações simples ##
Ex: impedir campos vazios ou mostrar mensagem de erro

## Melhorar navegação ## 
Ajustar botões e fluxo entre telas para ficar mais intuitivo 
