// Define el desplazamiento para el cifrado de César
const DESPLAZAMIENTO = 3;

// Función para convertir el texto a minúsculas y cifrar usando el cifrado de César
function cifrarTexto(texto) {
    return texto.toLowerCase().split('').map(caracter => {
        const codigo = caracter.charCodeAt(0);
        if (codigo >= 97 && codigo <= 122) { // Minúsculas
            return String.fromCharCode((codigo - 97 + DESPLAZAMIENTO) % 26 + 97);
        }
        return caracter; // Otros caracteres no se cifran
    }).join('');
}

// Función para descifrar texto usando el cifrado de César
function descifrarTexto(texto) {
    return texto.toLowerCase().split('').map(caracter => {
        const codigo = caracter.charCodeAt(0);
        if (codigo >= 97 && codigo <= 122) { // Minúsculas
            return String.fromCharCode((codigo - 97 - DESPLAZAMIENTO + 26) % 26 + 97);
        }
        return caracter; // Otros caracteres no se descifran
    }).join('');
}

// Función para manejar el clic en el botón de cifrar
function manejarCifrar() {
    const texto = document.getElementById('input').value;
    const textoCifrado = cifrarTexto(texto);
    mostrarResultado(textoCifrado);
}

// Función para manejar el clic en el botón de descifrar
function manejarDescifrar() {
    const texto = document.getElementById('input').value;
    const textoDescifrado = descifrarTexto(texto);
    mostrarResultado(textoDescifrado);
}

// Función para copiar el resultado al portapapeles
function copiarResultado() {
    const output = document.getElementById('output').innerText;
    navigator.clipboard.writeText(output).catch(err => {
        console.error('Error al copiar el texto: ', err);
    });
}

// Función para mostrar el resultado en la página y agregar el botón de copiar si hay texto
function mostrarResultado(texto) {
    const output = document.getElementById('output');
    output.innerText = texto;

    // Elimina la imagen de fondo si hay texto
    if (texto) {
        output.style.backgroundImage = 'none'; // Quita la imagen de fondo
    }

    // Si hay texto en el output y el botón no existe, añadir el botón de copiar
    if (texto && !document.getElementById('copiarButton')) {
        const copiarButton = document.createElement('button');
        copiarButton.id = 'copiarButton';
        copiarButton.className = 'botones';
        copiarButton.textContent = 'Copiar';
        copiarButton.addEventListener('click', copiarResultado);
        output.parentNode.appendChild(copiarButton);
    }
}

function manejarBorrado() {
    const output = document.getElementById('output');
    output.innerText = ''; // Borra el texto

    // Mostrar la imagen o el mensaje predeterminado según el tamaño de la pantalla
    if (window.matchMedia("(min-width: 992px)").matches) {
        output.style.backgroundImage = "url('img/Muñeco.png')";
        output.innerText = ''; // Asegura que el mensaje predeterminado no se muestre
    } else {
        mostrarMensajePredeterminado(); // Mostrar mensaje en pantallas pequeñas
    }

    // Elimina el botón de copiar si existe
    const copiarButton = document.getElementById('copiarButton');
    if (copiarButton) {
        copiarButton.remove();
    }
}

function validarCaracteres(event) {
    const allowedChars = /^[a-z\s]*$/; // Permitir letras y espacios
    const key = String.fromCharCode(event.which || event.keyCode);

    if (!allowedChars.test(key) && event.keyCode !== 8) { // 8 es el código de retroceso (backspace)
        event.preventDefault();
    }
}

function mostrarMensajePredeterminado() {
    const output = document.getElementById('output');
    const mediaQuery992 = window.matchMedia("(max-width: 992px)");
    const mediaQuery600 = window.matchMedia("(max-width: 600px)");
    
    if ((mediaQuery992.matches || mediaQuery600.matches) && !output.innerText.trim()) {
        output.innerText = "Ningún mensaje fue encontrado.\nIngresa el texto que desees encriptar o desencriptar.";
        output.style.backgroundImage = 'none'; // Asegura que la imagen no se muestre
    }
}

// Llama a la función al cargar la página y al cambiar el tamaño de la ventana
window.addEventListener('load', mostrarMensajePredeterminado);
window.addEventListener('resize', () => {
    // Muestra el mensaje predeterminado en pantallas pequeñas y borra el texto en pantallas grandes
    mostrarMensajePredeterminado();
    if (window.matchMedia("(min-width: 992px)").matches) {
        document.getElementById('output').innerText = '';
        document.getElementById('output').style.backgroundImage = "url('img/Muñeco.png')";
    }
});

document.getElementById('input').addEventListener('input', () => {
    if (!document.getElementById('input').value.trim()) {
        manejarBorrado();
    }
});

document.getElementById('input').addEventListener('keypress', validarCaracteres);
document.getElementById('cifrarButton').addEventListener('click', manejarCifrar);
document.getElementById('decifrarButton').addEventListener('click', manejarDescifrar);
