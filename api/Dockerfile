# Utiliza una imagen de Node.js como base
FROM node:18

# Establece el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copia los archivos de tu aplicación a la imagen del contenedor
COPY package.json ./
COPY package-lock.json ./


# Instala las dependencias de la aplicación
RUN npm install

# Copia el resto de los archivos de la aplicación
COPY . .

# Expone el puerto en el que la aplicación se ejecutará dentro del contenedor
EXPOSE 3000

# Define el comando para ejecutar tu aplicación cuando el contenedor se inicie
CMD ["npm", "run", "start:dev"]