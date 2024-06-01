# Brush

Para poder hacer uso del aplicativo lo primero es clonarlo del [repositorio](https://github.com/andressuarezunir/Brush).
Luego de esto, para tener un respaldo de la base de datos usada durante el desarrollo del software se debe descargar el comprimido llamado "BrushDB_backup" del [OneDrive](https://alumnosunir-my.sharepoint.com/:u:/g/personal/andresfelipe_suarez154_comunidadunir_net/EWGrDddOciZNk7J0qXpdp4UBm9jwmF9rfvQZ5wcw9RzOrg?e=SsXYGR) y descomprimirlo dentro de la carpeta que contiene el código, al mismo nivel que las carpetas node_modules, public, src (entre otras).

Ademas, es necesario contar con el software de Docker para poder usar Postgres, el cual es usado para la base de datos. Al asegurarse de tener instalado docker junto con su extensión de docker-compose y en uso, ejecute las siguientes lineas de código:

```
docker-compose build --no-cache
docker-compose up -d
```

Tras esto el comando necesario para poder usar el aplicativo son:

```
npx prisma generate --> Para crear (ya que se ha clonado el repo y es su primer uso) el código de Prisma Client.
npm i --> Para instalar las dependencias
npm run dev --> Para ejecutar el aplicativo en el puerto 3000 del navegador
```
