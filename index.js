alert("Ingrese la contraseña secreta del unicornio 🦄");
alert("Si no la adivina no me hago cargo de las consecuencias 😈");

const contrasenas = [
    { nombre: 'unicornio', contrasena: 'ESC', pista: 'Las iniciales de un teclado' },
];

function verificarContrasena(contrasenaIngresada, contrasenaObjeto) {
    const esCorrecta = contrasenaIngresada === contrasenaObjeto.contrasena;
    console.log("Verificando contraseña: " + (esCorrecta ? 'Correcta' : 'Incorrecta'));
    return esCorrecta;
}

let intentos = 5;
while (intentos > 0) {
    const intento = prompt("Ingresar contraseña");
    console.log("Intento número " + (6 - intentos) + ": " + intento);
    
    const contrasenaObjeto = contrasenas.find(obj => verificarContrasena(intento, obj));

    if (intentos === 2) {
        alert("Te queda " + (intentos - 1) + " intento. Pista: " + contrasenas[0].pista);
    }

    if (contrasenaObjeto) {
        alert("Contraseña correcta");
        break;
    } else {
        alert("Contraseña incorrecta. Te quedan " + (intentos - 1) + " intentos.");
        intentos--;
    }
}

if (intentos === 0) {
    const pistas = contrasenas.map(obj => "La contraseña del " + obj.nombre + " era: " + obj.contrasena + ", pista: " + obj.pista);
    console.log("Se agotaron todos los intentos. La contraseña era: ", obj.contrasena);
    alert("Ya no tenés más intentos. " + pistas.join('\n'));
} 