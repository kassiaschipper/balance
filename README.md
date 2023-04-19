# Balance

Este é um projeto que consiste em uma aplicação que permite o upload de arquivos .csv com informações de saldo por CPF, e a soma desses saldos. 

## Instalação

Para instalar a aplicação, siga os seguintes passos:

1. Clone o repositório: git clone https://github.com/kassiaschipper/balance.git


2. Entre na pasta `balance-app-back`:cd balance-app-back


3. Instale as dependências: npm 1


4. Crie um arquivo `.env` seguindo a formatação do `.env.example`

5. Crie um banco de dados postgres de teste, por exemplo, `balance_teste`

6. Preencha o `.env` com suas credenciais

7. Rode `npx migration dev` para criar as tabelas

8. Rode `npx prisma db seed` para popular o banco com um usuário administrador com as seguintes credenciais de login: email: admin@teste.com
password: Admin1

9. (Opcional) Se quiser inserir outra informação de usuário (e-mail e senha), faça um POST na `localhost:4000/user`. A senha deve ter de 4 a 20 caracteres, sendo pelo menos uma letra maiúscula e números.

10. Rode o comando `npm run start:dev` e, se tudo estiver ok, a mensagem "Listening on port 400" deve aparecer no seu terminal. Deixe o terminal rodando e abra `https://balance-nine.vercel.app/`.

## Alterar senha do usuário administrador

Para testar a funcionalidade de alterar a senha do usuário, siga os seguintes passos:

1. Clique em "Esqueceu a senha" na página de login

2. Altere a senha do usuário administrador `admin@teste.com`

3. Você será redirecionado à tela de login, onde deverá inserir o e-mail e a nova senha

4. Se tentar fazer login com a senha antiga ou com uma senha incorreta, a aplicação retornará um erro e você não terá acesso à tela home.

## Upload de arquivo .csv

1. Na tela home, clique em "Escolher arquivo" e selecione um arquivo .csv com as seguintes informações:
data,documento,saldo
2023-04-17,12322244425,3000
2023-04-15,11111140120,1000

Observe que o documento é um CPF e deve ter 11 dígitos, e a data não precisa ser preenchida. Nesse caso, a data será considerada como a data de inserção.

2. Após escolher o arquivo, o nome dele deve aparecer ao lado e você deve apertar "Upload". As informações do arquivo serão exibidas na tela e enviadas ao banco de dados.

## Somando os saldos por CPF

1. Para conferir a soma dos saldos por CPF, clique em "Somar". 
2. As informações serão exibidas na tela. 
Observe que, se for enviado um novo CSV no mesmo dia, a aplicação excluirá os saldos anteriores, substituindo-os pelos novos dados e inserindo a data de hoje no campo deletedAt.




