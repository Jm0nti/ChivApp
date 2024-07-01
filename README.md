## Cómo ejecutar: 
1. Instalar Node.js (https://nodejs.org/en)
2. Abrir la carpeta del proyecto en VScode.
3. En Terminal, crear una nueva terminal.
4. En la terminal, ejecutar los siguientes comandos uno por uno para iniciar npm e instalar las dependencias de package.json:
   - ```npm init```
   - ```npm install```

Una vez instaladas las dependencias, se puede ejecutar la app con el comando ```node server.cjs``` desde la terminal. Una vez ejecutado el comando podemos abrir el navegador e ingresar la dirección ```http://localhost:3000/``` Donde se podrá ver la aplicación.

## Manejo de código
Los archivos de código de la carpeta build **NO SE DEBEN MODIFICAR**, tanto los archivos .js como .css.
La edición de código ocurre desde los archivos en la carpeta src donde están los archivos .js y .scss

### Estilos y archivos scss 
En esta versión del proyecto se utiliza .scss, que permite una mejor estructuración de las diferentes secciones de estilos en vez de tener todo en una sola hoja de estilos que puede tener miles de líneas de código.
En la carpeta **scss** se encuentran las carpetas **base** y **layout**, en **base** se definen generalidades como variables, estilos genéricos y globales que tendrá toda la página. En **layout** se manejan los estilos
de cada subpágina o sección. 

La modificación de los estilos se hace desde estos archivos pertenecientes a **layout** y **base**. Gracias a la dependencia gulp, todos los cambios hechos en estos archivos, se sincronizan con app.css que es **la hoja de estilos que carga el html**, por eso no se debe modificar el archivo original **app.css**.

### Sincronizar cambios con gulp 
Así como gulp sincroniza los estilos, también sincroniza los scripts que están en src/js a la carpeta build/js. El proyecto carga los scripts y estilos de la carpeta **build** mientras que la carpeta **src** debe servir para hacer modificaciones de código. 

Para que estos cambios se reflejen en tiempo real se debe ejecutar el siguiente comando en la terminal: 

```npm run dev```

Así, todos los cambios que se hagan a los archivos de la carpeta src se ven reflejados en el proyecto, que carga elementos de la carpeta build.
