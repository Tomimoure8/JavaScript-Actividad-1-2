document.addEventListener("DOMContentLoaded", function() {
    Swal.fire({
        title: 'Bienvenido al juego',
        text: 'Ingrese la contraseña secreta para continuar.',
        icon: 'info'
    }).then(() => {
        Swal.fire({
            title: 'Pista',
            text: 'Es una tecla que tiene una vocal y dos consonantes.',
            icon: 'info'
        }).then(() => {
        Swal.fire({
            title: '¡Empieza!',
            text: 'Hace click en el candado para comenzar.',
            icon: 'info'
        });
    });
});

    // Define el objeto con la contraseña y la pista.
    const imagen = document.createElement("img");
    imagen.setAttribute("src", "./img/padlock-cerrado.png");
    imagen.className = "imagen-centrada";
    const tuContenedor = document.getElementById("tu-contenedor");
    tuContenedor.appendChild(imagen);

    const imagenDos = document.createElement("img");
    imagenDos.setAttribute("src", "./img/close-159133_1920.png");
    imagenDos.className = "imagenDos-centrada";
    imagenDos.addEventListener("load", function() {
        console.log("ImagenDos cargada correctamente");
        console.log("imagenDos");
    });

    const imagenTres = document.createElement("img");
    imagenTres.setAttribute("src", "./img/open-cable.png");
    imagenTres.className = "imagenTres-centrada";
    const nuevaImagen = imagenTres;


    let contenedorInputBoton = document.getElementById ("contenedor-input-boton");
    let botonCodigo = document.getElementById ("verificar-contrasena");
    contenedorInputBoton.appendChild (botonCodigo);


    function crearListaPeliculas(peliculas) {
        const listaPeliculas = document.createElement("ul");
        peliculas.forEach(pelicula => {
            const itemLista = document.createElement("li");
            itemLista.textContent = `Título: ${pelicula.titulo}, Género: ${pelicula.genero}, Director: ${pelicula.director}, Año: ${pelicula.año}`;
            listaPeliculas.appendChild(itemLista);
        });
        return listaPeliculas;
    }

    // NUEVO
    let titulo = document.createElement ("h1");
    titulo.innerText = "FIN DEL JUEGO";


    function cambiarImagen(nuevaImagen) {
        const contenedor = document.getElementById("tu-contenedor");
        const imagenActual = contenedor.querySelector("img");
        if (imagenActual) {
            contenedor.removeChild(imagenActual);
        }
        contenedor.appendChild(nuevaImagen);
    }

    const contrasenas = [
        { nombre: "unicornio", contrasena: "ESC", pista: "Las iniciales de un teclado" },
    ];

    // Función para verificar si la contraseña es correcta.
    function verificarContrasena(contrasenaIngresada, contrasenaObjeto) {
        const esCorrecta = contrasenaIngresada === contrasenaObjeto.contrasena;
        console.log("Verificando contraseña: " + (esCorrecta ? "Correcta" : "Incorrecta"));
        localStorage.setItem ("intento-contraseña",  contrasenaIngresada);
        return esCorrecta;
    };

    // Bucle para gestionar los intentos.
    function gestionarIntentos() {
        imagen.remove();
        let intentos = 5;
        let intentosContraseña = [];

        while (intentos > 0) {
            const intento = prompt("Ingresar contraseña");
            console.log("Intento número " + (6 - intentos) + ": " + intento);

            const contrasenaObjeto = contrasenas.find(obj => verificarContrasena(intento, obj));

            if (intentos === 2) {
                alert("Te queda " + (intentos - 1) + " intento. Pista: " + contrasenas[0].pista);
        }

        if (contrasenaObjeto) {
            Swal.fire({
                title: 'Contraseña correcta!',
                text: 'Felicitaciones por haber acertado',
                icon: 'success',
            }).then(() => {
            cambiarImagen(imagenTres);
                Swal.fire({
                    title: 'Verifica la contraseña!',
                    text: 'AHORA Presiona el candado para SACARLO y concluír el juego debajo',
                    icon: 'info',
                }).
            tuContenedor.removeChild(imagenDos);
            });

            document.getElementById("contenedor-input-boton").style.display = "block";

            break;
        } else {
            alert("Contraseña incorrecta. Te quedan " + (intentos - 1) + " intentos.");
            intentos--;
        }

        intentosContraseña.push (intento);
    }

      // Mensaje final si se agotan los intentos.
    if (intentos === 0) {
        const intentosJSON = JSON.stringify (intentosContraseña);
        sessionStorage.setItem ("intentos-contraseña", intentosJSON);

        const pistas = contrasenas.map(
            obj => "La contraseña del " + obj.nombre + " era: " + obj.contrasena + ", pista: " + obj.pista
        );
        console.log("Se agotaron todos los intentos. La contraseña era: ", contrasenas[0].contrasena);
        alert("Ya no tenés más intentos. " + pistas.join("\n"));
        tuContenedor.appendChild(imagenDos);
        }
    }

    imagen.addEventListener("click", gestionarIntentos);
    imagenDos.addEventListener("click", gestionarIntentos);
    imagenTres.addEventListener("click", function() {
        imagenTres.style.display = "none";
    });

    botonCodigo.addEventListener("click", function() {
        const contrasenaIngresada = document.getElementById("contrasena-usuario").value;
        const contrasenaObjeto = contrasenas.find(obj => verificarContrasena(contrasenaIngresada, obj));

    if (contrasenaObjeto && contrasenaIngresada === "ESC") {
        fetch("recompensas.json")
            .then(response => response.json())
            .then(peliculas => {
            mostrarListaPeliculas(peliculas);
            tuContenedor.appendChild(titulo);
        })
        .catch(error => console.error("Error cargando la lista de películas:", error));
    } else {
        Swal.fire({
            title: 'Contraseña incorrecta!',
            text: '¡Parece que no aprendiste nada!',
            icon: 'error',
        });
    }
});

    // Función para mostrar la lista de películas
    function mostrarListaPeliculas(peliculas) {
        const listaPeliculas = crearListaPeliculas(peliculas);
        const contenedor = document.getElementById("tu-contenedor");
        contenedor.appendChild(listaPeliculas);

        Swal.fire({
            title: 'Contraseña correcta!',
            text: 'Parece que te quedó claro',
            icon: 'success',
        }).then(() => {
                Swal.fire({
                    title: 'Felicitaciones por completar el juego!',
                    text: 'Como recompensa, te recomiendo estas 3 peliculas.',
                    icon: 'success',
                })
            });
    }
});
