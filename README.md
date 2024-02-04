Este es un prototipo de comercio electrónico tiene como objetivo implementar una plataforma para gestionar usuarios, productos, carritos y pedidos. 

Todo el prototipo ha sido desarrollado en base a obtener una escalabilidad efectiva, las rutas estan separadas de los controlladores y a su vez de los handlers, asi evitando la acumulacion de codigo en un solo archivo, haciendolo mas legible y organizado.

La bases de datos usada para este prototipo fue MongoDB, ya que nos ofrece una base de datos no relacionales, modelo de datos flexibles y asi asegurando la escalabilidad del proyecto


Las tecnologias usadas para este proyecto fueron:

Express (v4.18.2):

 Express proporciona una arquitectura simple y efectiva para crear aplicaciones web y APIs. Facilita la creación de rutas, middleware y gestión de solicitudes, lo que me parecio esencial para un proyecto de comercio electrónico.

Mongoose (v8.1.1):
 MongoDB es una base de datos NoSQL muy popular. Mongoose simplifica la interacción con MongoDB, proporcionando una capa de abstracción y modelado de datos. Facilita la definición de esquemas, validaciones y operaciones de base de datos.

Crypto-js (v4.2.0):
Fue la libreria mas practica para garantizar la seguridad en la autenticación y en la creación de tokens JWT (JSON Web Tokens). La seguridad es fundamental en una aplicación de comercio electrónico para proteger la información del usuario y garantizar la integridad de los datos.

Dotenv (v16.4.1):
Es una libreria utilizada para almacenar variables de entorno sensibles, como claves secretas y configuraciones específicas de la aplicación, de manera segura y separada del código fuente.

Jsonwebtoken (v9.0.2):
 En una aplicación de comercio electrónico, la autenticación segura es esencial y la libreria de Jsonwebtoken facilita la creación y verificación de tokens, permitiendo una autenticación segura y basada en tokens.

Nodemon (v3.0.3):
 Facilita el desarrollo al permitir una experiencia de desarrollo continua sin tener que reiniciar manualmente el servidor cada vez que se realizan cambios en el código.

Instrucciones para Ejecutar el Proyecto:

Clona este repositorio en tu máquina local.

Instala las dependencias utilizando el comando: npm install.

Crea un archivo .env en el directorio raíz y configura las variables de entorno necesarias (por ejemplo, la conexión a la base de datos, claves secretas, etc.).

Ejecuta la aplicación con el comando: npm start.
La aplicación estará disponible en el puerto que coloques en la variable de entorno

Explicacion breve de cada uno de los endpoins:

cartR.js (Rutas para el carrito):

/cart/findAll: Obtiene todos los carritos (solo accesible por administradores).
/cart/find/:userId: Obtiene el carrito de un usuario específico (requiere autorización del usuario).
/cart/update/:userId: Actualiza el carrito de un usuario específico (requiere autorización del usuario).
/cart/delete/:userId: Elimina el carrito de un usuario específico (requiere autorización del usuario).
/cart/create/:userId: Crea un nuevo carrito para un usuario específico (requiere autorización del usuario).

orderR.js (Rutas para pedidos):

/order/create/:userId: Crea un nuevo pedido para un usuario específico (requiere autorización del usuario).
/order/getAll: Obtiene todos los pedidos (solo accesible por administradores).
/order/getUser/:userId: Obtiene los pedidos de un usuario específico (requiere autorización del usuario).
/order/delete/:id: Elimina un pedido específico (solo accesible por administradores).

/productR.js (Rutas para productos):

/product/get: Obtiene todos los productos.
/product/admin/:id: Actualiza un producto específico (solo accesible por administradores).
/product/post: Crea un nuevo producto (solo accesible por administradores).
/product/delete/:id: Elimina un producto específico (solo accesible por administradores).

userR.js (Rutas para usuarios):

/user/create: Crea un nuevo usuario.
/user/login: Inicia sesión de un usuario existente.

index.js (Archivo principal de rutas):

Agrupa todas las rutas de diferentes modelos (productos, pedidos, carritos y usuarios) bajo rutas principales (/product, /order, /cart, /user).