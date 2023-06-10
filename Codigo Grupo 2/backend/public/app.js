const inputs = document.querySelectorAll(".input-field");
const link = document.querySelectorAll(".toggle");
const main= document.querySelector("main");
const nombre = document.getElementById("nombres");
const apellidos= document.getElementById("apellidos");
const email = document.getElementById("email");
const pass = document.getElementById("passwordtwo");
const form = document.getElementById("form");
const parrafo = document.getElementById("warnings");

// Agregar eventos a los campos de entrada

inputs.forEach((inp) => {
    inp.addEventListener("focus", () => {
        inp.classList.add("active");
    });
    inp.addEventListener("blur", () => {
        if(inp.value != "") return;
        inp.classList.remove("active");
    });
});

// Agregar eventos a los enlaces

link.forEach((btn) => {
    btn.addEventListener("click", () => {
        main.classList.toggle("sign-up-mode"); 
    });
});

// Agregar evento al formulario al enviar

form.addEventListener("submit", e=>{
    e.preventDefault() // Evitar el envío del formulario por defecto
    let warnings = "";// Variable que sirve para almacenar las advertencias
    let entrar = false;// Variable para controlar si se debe entrar en las validaciones
    const regexLetras = /^[a-zA-Z\s]+$/; // Expresión para validar solo letras y espacios
    parrafo.innerHTML = "";// Limpiar el párrafo de advertencias

    // Validar el campo de nombres
    if(!regexLetras.test(nombre.value)){
        warnings += `El nombre no es valido <br>`;
        entrar = true;
    }

    // Validar el campo de apellidos
    if(!regexLetras.test(apellidos.value)){
        warnings += `El apellido no es valido  <br>`;
        entrar = true;
    }

    // Validar la longitud de contraseña
    if(pass.value.length < 8){
        warnings += `La contraseña no es valida <br>`;
        entrar = true;
    }

    // Mostrar las advertencias si es necesario
    if(entrar){
        parrafo.innerHTML = warnings;
    }else{
        parrafo.innerHTML = "Enviado";
    }
})


