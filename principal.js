let puntaje = 0;
let preguntasRespondidas = 0;
let preguntas = [];

function crearContador() {
    let total = 0;
    return function (puntos) {
        total += puntos;
        return total;
    };
}

const sumarPuntos = crearContador();

const contenedor = document.getElementById("quiz");
const resultado = document.getElementById("resultado");

function mostrarPregunta(index) {
    contenedor.innerHTML = "";

    const pregunta = preguntas[index];

    const h2 = document.createElement("h2");
    h2.textContent = pregunta.pregunta;
    contenedor.appendChild(h2);

    pregunta.opciones.forEach(op => {
        const btn = document.createElement("button");
        btn.textContent = op;
        btn.dataset.correcta = pregunta.correcta;
        contenedor.appendChild(btn);
    });
}

contenedor.addEventListener("click", function (e) {
    if (e.target.tagName === "BUTTON") {
        const respuesta = e.target.textContent;
        const correcta = e.target.dataset.correcta;

        preguntasRespondidas++;

        if (respuesta === correcta) {
            puntaje = sumarPuntos(1);

            Swal.fire({
                title: "¡Correcto!",
                icon: "success",
                timer: 1000,
                showConfirmButton: false
            });

        } else {
            Swal.fire({
                title: "Incorrecto",
                text: `La respuesta era: ${correcta}`,
                icon: "error",
                timer: 1500,
                showConfirmButton: false
            });
        }

        setTimeout(() => {
            if (preguntasRespondidas < preguntas.length) {
                mostrarPregunta(preguntasRespondidas);
            } else {
                mostrarResultado();
            }
        }, 1000);
    }
});

function analizarDatos() {
    const textos = preguntas.map(p => p.pregunta);
    const filtradas = preguntas.filter(p => p.opciones.length > 2);
    const encontrada = preguntas.find(p => p.correcta === "Gryffindor");
    const totalOpciones = preguntas.reduce((acc, p) => acc + p.opciones.length, 0);
    const ordenadas = [...preguntas].sort((a, b) => a.pregunta.localeCompare(b.pregunta));
}


async function obtenerDatos() {
    try {
        const response = await fetch("preguntas.json");
        const data = await response.json();
        preguntas = data;

        mostrarPregunta(0);
        analizarDatos();

    } catch (error) {
        Swal.fire({
            title: "Error",
            text: "No se pudieron cargar las preguntas",
            icon: "error"
        });
    }
}


function mostrarResultado() {
    contenedor.innerHTML = "";

    Swal.fire({
        title: "¡Quiz terminado!",
        text: `Tu puntaje final es: ${puntaje}`,
        icon: "info"
    });
}


obtenerDatos();