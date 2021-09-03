const jsonHelper = require('./jsonHelper');

// 1. 
const peliculasDeJSON = jsonHelper.leerJson('peliculas');

// 2.
// 2.A.
const gestionDePeliculas = {
    peliculas: peliculasDeJSON,
    // 2.B.
    listarPeliculas: function (array = this.peliculas) {
        array.forEach(pelicula => {
            console.log(`
            ${pelicula.titulo}, de ${pelicula.director}. Duración de ${pelicula.duracionEnMinutos} minutos, ${pelicula.ganoOscar ? "Premiada" : "Sin Premios"} (${pelicula.calificacionIMDB} en IMDB)`);
        });
    },
    // 2.C.
    buscarPorId: function (numberID) {
        return this.peliculas.find(pelicula => pelicula.id === numberID);
    },
    // 2.D.
    peliculasPremiadas: function () {
        return this.peliculas.filter(pelicula => pelicula.ganoOscar);
    },
    // 2.E.
    filtrarPorDuracion: function (duracionMinima, duracionMaxima) {
        return this.peliculas.filter(pelicula => (pelicula.duracionEnMinutos >= duracionMinima && pelicula.duracionEnMinutos <= duracionMaxima));
    },
    // 2.F.
    ordenarPorCalificacion: function (array = this.peliculas) {
        return array.sort((peliculaA, peliculaB) => peliculaA.calificacionIMDB - peliculaB.calificacionIMDB);
    },
    // 2.G.
    duracionTotal: function () {
        const duracionTotalEnMinutos = this.peliculas.reduce((acumulador, pelicula) => acumulador + pelicula.duracionEnMinutos, 0)
        return `La duración en minutos de todas las peliculas sumadas es de ${duracionTotalEnMinutos} minutos`;
    },
    // 2.H.
    premiarPeliculaPorTitulo: function (tituloPelicula) {
        let peliculaAPremiar;

        this.peliculas.forEach(pelicula => {
            if (pelicula.titulo === tituloPelicula) {
                pelicula.ganoOscar = true;
                jsonHelper.escribirJson('peliculas', this.peliculas);
                peliculaAPremiar = pelicula;
                return peliculaAPremiar;
            }
        });

        return peliculaAPremiar;
    },
    // 2.I.
    eliminarPorId: function (numberID) {
        const peliculaAEliminar = this.buscarPorId(numberID);
        const indexPeliculaAEliminar = this.peliculas.indexOf(this.buscarPorId(numberID));
        this.peliculas.splice(indexPeliculaAEliminar, 1);
        jsonHelper.escribirJson('peliculas', this.peliculas);
        return peliculaAEliminar;
    }
}


/******************************/
/* Ejecución de las consignas */
/******************************/

console.log("***** 2.B. *****");
gestionDePeliculas.listarPeliculas();
console.log("****************\n");

console.log("***** 2.C. *****");
gestionDePeliculas.listarPeliculas([gestionDePeliculas.buscarPorId(6)]) // utilizando metodo listarPeliculas
console.table([gestionDePeliculas.buscarPorId(6)]); // opcion de tabla
console.log("****************\n");


console.log("***** 2.D. *****");
gestionDePeliculas.listarPeliculas(gestionDePeliculas.peliculasPremiadas()); // utilizando metodo listarPeliculas
console.table(gestionDePeliculas.peliculasPremiadas()) // opcion de tabla
console.log("****************\n");

console.log("***** 2.E. *****");
gestionDePeliculas.listarPeliculas(gestionDePeliculas.filtrarPorDuracion(50, 100)) // utilizando metodo listarPeliculas
console.table(gestionDePeliculas.filtrarPorDuracion(50, 100)) // opcion de tabla
console.log("****************\n");

console.log("***** 2.F. *****");
gestionDePeliculas.listarPeliculas(gestionDePeliculas.ordenarPorCalificacion()) // utilizando metodo listarPeliculas
console.table(gestionDePeliculas.ordenarPorCalificacion()) // opcion de tabla
console.log("****************\n");

console.log("***** 2.G. *****");
console.log(`La duración total de todas las peliculas es de ${gestionDePeliculas.duracionTotal()} minutos.`);
console.log("****************\n");


console.log("***** 2.H. *****");
console.log("↓ PELICULA PREMIADA ↓")
console.table([gestionDePeliculas.premiarPeliculaPorTitulo("Tom and Huck")]);
console.log("****************\n");

// console.log("***** 2.I. ELIMINAR PELICULA *****");
// console.log(`La pelicula eliminada fue ${gestionDePeliculas.eliminarPorId(4).titulo}.`);
// console.log("****************\n");