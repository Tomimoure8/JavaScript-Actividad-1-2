// Algoritmo que solicita una contraseña al usuario hasta que ingrese "ESC"
alert ("Ingrese la contraseña secreta del unicornio 🦄");
alert ("Si no la adivina no me hago cargo de las consecuencias 😈")
const contrasena = "ESC";
function verificarContrasena (contrasenaIngresada) {
    if (contrasenaIngresada === contrasena) {
        return true;
    }
    else {
        return false;
    }
}
let intentos = 5;
while (intentos > 0) {
    const intento = prompt ("Ingresar contraseña");
    if (verificarContrasena (intento)) {
        alert ("Contraseña correcta");
        break;
    }
    else {
        alert (`Contraseña incorrecta. Te quedan ${intentos - 1} intentos.`);
        intentos--;
    }
}
if (intentos === 0) {
    alert ("Ya no tenés más intentos. La contraseña del unicornio era: " +contrasena);
} 