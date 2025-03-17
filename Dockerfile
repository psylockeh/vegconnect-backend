# Utiliza uma imagem oficial do Node.js
FROM node:20-alpine

# Diretório padrão para trabalhar dentro do container
WORKDIR /app

# Copia package.json e package-lock.json para instalar dependências
COPY package*.json ./

# Instala dependências
RUN npm install

# Copia todo o projeto para o container
COPY . .

# Expõe a porta que o backend está rodando
EXPOSE 28147

# Executa o comando para rodar o projeto
CMD ["npm", "start"]
