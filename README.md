![Logo del proyecto](ubicación)

<hr />

### Índice

- [Descripción del proyecto](#Descripción-del-proyecto)
- [Instalación](#Instalacion)
- [Funcionalidades del proyecto](#Funcionalidades-del-proyecto)
- [Tecnologías utilizadas](#Tecnologías-utilizadas)
- [Autores](#Autores)

## Descripción del proyecto

Descripcion
![Mockup del proyecto]()

## Instalación

1. Clonar el repositorio

#### Backend

1. Dirigirse a la carpeta `./api`

   ```
   cd api
   ```

2. Instalar dependencias.

   ```
   npm install
   ```

3. Copiar el archivo _`.env.examples`_ y renombrarlo a _`.env`_
4. Cambiar las variables de entorno
5. Levantar la base de datos

   ```
   docker-compose up
   ```

6. Ejecutar la aplicacion

   ```
   npm run start:dev
   ```

7. Ejecutar SEED para popular base de datos ingresando a:
   `http://localhost:3001/api/seed`

8. Si todo salio correcto estas son algunas cuentas para probar la aplicación:

   ###### Admin:

   Usuario Administrador

   ```
       correo: admin@gmail.com
   contraseña: Abc123
   ```

   ###### User:

   Usuario que esta autenticado\*\* como alguien que tiene cuenta de discord y es miembro del servidor y no ha participado en ningún sorteo.

   ```
       correo: user@gmail.com
   contraseña: Abc123
   ```

   > \*\*No es una autenticación utilizando los servicios del API de discord, solo es una prueba

#### Front End

1. Ingresar a la carpeta `./frontend`
2. Copiar el archivo _`.env.examples`_ y renombrarlo a _`.env`_
3. Cambiar las variables de entorno
4. Instalar las dependencias.

   ```
   npm install
   ```

5. Ejecutar la aplicación.

   ```
   npm run dev
   ```

6. Ingresar a la aplicación:
   `http://localhost:3000`

## Funcionalidades del proyecto

- `Funcionalidad 1:`
- `Funcionalidad 1:`

## Tecnologías utilizadas

- Nextjs 14
- Nestjs

## Autores

| [<img src='https://www.github.com/zidjian.png' width=115><br><sub>Waldir Maidana</sub>](https://github.com/zidjian) | [<img src='https://www.github.com/Kkmiloo.png' width=115><br><sub>Camilo Reyes</sub>](https://github.com/Kkmiloo) |
| :-----------------------------------------------------------------------------------------------------------------: | :---------------------------------------------------------------------------------------------------------------: |
