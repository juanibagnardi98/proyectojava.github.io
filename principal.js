const titulo = "Quiz de Magia"; 
let puntaje = 0; 
var preguntasRespondidas = 0; 
const preguntas = [
    { pregunta: "¿Quién es el director de Hogwarts?", opciones: ["Snape", "Dumbledore", "Voldemort"], correcta: "Dumbledore" },
    { pregunta: "¿Casa de Harry Potter?", opciones: ["Slytherin", "Gryffindor", "Ravenclaw"], correcta: "Gryffindor" },
    { pregunta: "¿Hechizo para desarmar?", opciones: ["Expelliarmus", "Avada Kedavra", "Lumos"], correcta: "Expelliarmus" }
];

function crearContador() {
    let total = 0;
    return function (puntos) {
        total += puntos;
        return total;
    };
}

const sumarPuntos = crearContador();

saludo();
function saludo() {
}

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
        }

        if (preguntasRespondidas < preguntas.length) {
            mostrarPregunta(preguntasRespondidas);
        } else {
            mostrarResultado();
        }
    }
});
function analizarDatos() {

    const textos = preguntas.map(p => p.pregunta);
    const filtradas = preguntas.filter(p => p.opciones.length > 2);
    const encontrada = preguntas.find(p => p.correcta === "Gryffindor");
    const totalOpciones = preguntas.reduce((acc, p) => acc + p.opciones.length, 0);
    const ordenadas = [...preguntas].sort((a, b) => a.pregunta.localeCompare(b.pregunta));

}
function obtenerDatos() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const exito = true;
            if (exito) {
                resolve(preguntas);
            } else {
                reject("Error al cargar preguntas");
            }
        }, 1000);
    });
}
async function iniciarQuiz() {
    try {
        const data = await obtenerDatos(); 
        mostrarPregunta(0);
        analizarDatos();
    } catch (error) {
        console.error("Hubo un error:", error);
    }
}

function mostrarResultado() {
    contenedor.innerHTML = "";
    resultado.textContent = `Tu puntaje final es: ${puntaje}`;
}

iniciarQuiz();