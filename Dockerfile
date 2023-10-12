# Usar una imagen base de Node.js
FROM node:16.17

# Establecer el directorio de trabajo dentro del contenedor
WORKDIR /usr/src/app

# Copiar los archivos de configuración de la aplicación (package.json y package-lock.json) al contenedor
COPY package*.json ./

# Instalar las dependencias de la aplicación
RUN npm install

# Copiar el código fuente de la aplicación al contenedor
COPY . .

# Exponer el puerto en el que se ejecutará la aplicación Angular (puerto 4200)
EXPOSE 4200

# Comando para iniciar la aplicación Angular
CMD ["npm", "start"]
