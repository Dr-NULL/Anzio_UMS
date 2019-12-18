# Anzio UMS

Este proyecto tiene como finalidad el gestionar a los usuarios que utilicen los diversos sistemas que se realizarán dentro de la empresa. La idea es que se les pueda ir asignando a los usuarios las pantallas de forma individual a las cuales pueden acceder, y así controlar de forma personalizada los accesos en toda clase de escenarios.

## Configuración

El servidor viene con CORS activado por defecto, esto con la idea de facilitar las pruebas con el cliente de Angular. Además trabaja con TypeORM, el cual también posee su propio archivo de configuración. Para crear ambos archivos, debe de hacerlo en la raíz de la carpeta "server". Estos archivos son:

### appcoinfig.json

Posee la configuración inicial del server:
```json
{
    "Server": {
        "port": 80,
        "Cors": [
            "---URL CLIENTE AQUÍ---",
            "---URL CLIENTE AQUÍ---",
            "---URL CLIENTE AQUÍ---"
        ]
    },
    "Session" : {
        "duration": 30,
        "cookieName": "---NOMBRE DE LA SESIÓN AQUÍ---",
        "isEncrypted": true
    }
}
```

### ormconfig.json

Define la conexión a base de datos para TypeORM, su sintaxis:
```json
{
    "type": "---mssql, mysql, etc---",
    "host": "---IP DEL SERVIDOR---",
    "port": 1433,
    "username": "---USUARIO---",
    "password": "---CONTRASEÑA---",
    "database": "---NOMBRE DB---",
    "syncronize": true,
    "logging": false,
    "entities": [
        "dist/models/**/*.js"
    ],
    "migrations": [
        "dist/migrations/**/*.js"
    ],
    "cli": {
       "entitiesDir": "src/models",
       "migrationsDir": "src/migrations",
       "subscribersDir": "src/subscribers"
    }
}
```

## TypeORM

considerando que para aplicar migraciones se necesitan los TS ya transpilados, en la raiz de "server" hay un *.bat que automatiza el proceso de transpilación + ejecutar. Para usarlo se hace de la siguiente manera:
```npm
npx orm [comandos]
```

Por ejemplo:
```npm
npx orm migration:revert
npx orm migration:generate -n Test-DB
npx orm migration:run
```