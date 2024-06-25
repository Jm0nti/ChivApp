
import { src, dest, watch, series } from 'gulp'
import * as dartSass from 'sass'
import gulpSass from 'gulp-sass'

const sass = gulpSass(dartSass)

export function js( done ) { // Aqui se toma el archivo origen js y se copia a la carpeta build/js
    src('src/js/**/*.js')
        .pipe( dest('build/js') ) 

    done()
}


export function css( done ) {
    src('src/scss/app.scss', {sourcemaps: true}) // Toma el archivo app.scss y genera un archivo app.css en la carpeta build/css
        .pipe( sass().on('error', sass.logError) )
        .pipe( dest('build/css', {sourcemaps: '.'}) ) // Genera el archivo app.css.map que sirve para mapear los estilos en el inspector del navegador

    done()
}

export function dev() {
    watch('src/scss/**/*.scss', css)
    watch('src/js/**/*.js', js)  // Ejecuta la tarea js cuando se detectan cambios en los archivos js, genera el archivo app.js en la carpeta build/js
}

export default series( js, css, dev ) // Ejecuta las tareas js, css y dev en serie que permite ejecutar una tarea tras otra