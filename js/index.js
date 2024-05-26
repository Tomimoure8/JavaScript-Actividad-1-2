// Algoritmo que solicita una contraseña al usuario hasta que ingrese "ESC"
alert ("Ingrese la contraseña secreta del unicornio 🦄");
alert ("Si no la adivina, no podrá escapar del programa. 😈")
let contraseña = prompt ("Ingresar la contraseña");
while (contraseña != "ESC") {
    alert ("El profe intento: " + contraseña);
    contraseña = prompt ("Próximo intento...😎");
}