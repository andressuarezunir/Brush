# Brush

Para poder hacer uso del aplicativo es necesario contar con el software de Docker para poder usar Postgres, el cual es usado para la base de datos. Al asegurarse de tener instalado docker y en uso, ejecute las siguientes lineas de código:

```
docker-compose build --no-cache
docker-compose up -d
```

Tras esto el comando necesario para poder usar el aplicativo en el navegador en el puerto 3000 es

```
npm run dev
```
