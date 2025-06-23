// --- Contadores Globales ---
let coins = 100;
let puntos = 0; // Nuevo contador de puntos

const contadorCoinsElement = document.getElementById('contador-coins');
const contadorPuntosElement = document.getElementById('contador-puntos');

// Función para actualizar el display de monedas
function actualizarContadorCoins() {
    contadorCoinsElement.textContent = coins;
}

// Función para actualizar el display de puntos
function actualizarContadorPuntos() {
    contadorPuntosElement.textContent = puntos;
}

// Funciones para manipular monedas (si aún las necesitas con botones)
function incrementarCoins() {
    coins += 10;
    actualizarContadorCoins();
}

function decrementarCoins() {
    if (coins >= 10) {
        coins -= 10;
        actualizarContadorCoins();
    } else {
        alert("¡No tienes suficientes monedas!");
    }
}

// --- Datos de las Cápsulas (Preguntas) ---
// Aquí puedes definir la información para cada hexágono.
// Usa el ID del hexágono como clave.
const datosCapsulas = {
    "hex-inicio": {
        titulo: "¡Bienvenido a ZumbaCash!",
        situacion: "Has llegado a la celda de inicio. ¿Qué harás primero para empezar tu aventura financiera?",
        opciones: [
            { texto: "Explorar los módulos básicos de inversión.", valorPuntos: 10, esCorrecta: true },
            { texto: "Buscar atajos para ganar mucho dinero rápido.", valorPuntos: -5, esCorrecta: false },
            { texto: "Ignorar la educación financiera y seguir igual.", valorPuntos: -10, esCorrecta: false }
        ]
    },
    "hex-1-1": {
        titulo: "Presupuesto Personal",
        situacion: "Te enfrentas a fin de mes y tu dinero está a punto de agotarse. ¿Cómo lo manejas?",
        opciones: [
            { texto: "Crear un presupuesto detallado de ingresos y gastos.", valorPuntos: 15, esCorrecta: true },
            { texto: "Pedir un préstamo para cubrir los gastos del mes.", valorPuntos: -10, esCorrecta: false },
            { texto: "No llevar registro y esperar que el dinero dure.", valorPuntos: -5, esCorrecta: false },
            { texto: "Vender algo que no necesitas para generar ingresos extra.", valorPuntos: 5, esCorrecta: true } // Opción con menor puntuación, pero correcta
        ]
    },
    "hex-1-2": {
        titulo: "Ahorro para el Futuro",
        situacion: "Quieres comprar una casa en 5 años. ¿Cuál es la mejor estrategia de ahorro?",
        opciones: [
            { texto: "Establecer una meta de ahorro mensual y automatizar la transferencia.", valorPuntos: 20, esCorrecta: true },
            { texto: "Guardar el dinero que te sobra a fin de mes (si es que sobra).", valorPuntos: 5, esCorrecta: false }, // No es la mejor, pero no es terrible
            { texto: "No ahorrar, confías en que un día te llegará una herencia.", valorPuntos: -15, esCorrecta: false }
        ]
    },
    // Puedes añadir más objetos de cápsulas para cada hexágono, por ejemplo:
    // "hex-2-1": {
    //     titulo: "Inversiones Básicas",
    //     situacion: "Tienes un poco de dinero extra. ¿Dónde lo invertirías para empezar?",
    //     opciones: [
    //         { texto: "Fondos mutuos diversificados.", valorPuntos: 18, esCorrecta: true },
    //         { texto: "Una sola acción de una empresa muy volátil.", valorPuntos: -10, esCorrecta: false },
    //         { texto: "Debajo del colchón.", valorPuntos: -5, esCorrecta: false }
    //     ]
    // },
    // etc.
};


// --- Funcionalidad Principal (al cargar el DOM) ---
document.addEventListener('DOMContentLoaded', () => {
    actualizarContadorCoins(); // Inicializa el display de monedas
    actualizarContadorPuntos(); // Inicializa el display de puntos

    const hexagons = document.querySelectorAll('.hexagon');
    let activeHexagon = document.getElementById('hex-inicio');

    // Inicializa el hexágono de inicio como activo
    if (activeHexagon) {
        activeHexagon.classList.add('active');
    }

    // Agrega listeners de click a todos los hexágonos
    hexagons.forEach(hexagon => {
        hexagon.addEventListener('click', function() {
            // Remueve la clase 'active' del hexágono anterior
            if (activeHexagon) {
                activeHexagon.classList.remove('active');
            }
            // Añade la clase 'active' al hexágono clickeado
            this.classList.add('active');
            activeHexagon = this; // Actualiza el hexágono activo

            // Muestra la cápsula si hay datos para este hexágono
            if (datosCapsulas[this.id]) {
                displayCapsula(this.id);
            } else {
                // Si no hay datos, puedes mostrar un mensaje o simplemente no hacer nada
                alert(`Haz clickeado el hexágono ${this.id}. ¡No hay una cápsula de información aquí todavía!`);
            }
        });
    });

    // --- Función para Mostrar la Cápsula Interactiva ---
    function displayCapsula(hexagonId) {
        // Cierra cualquier cápsula abierta previamente
        const existingCapsula = document.querySelector('.capsula-interactiva');
        if (existingCapsula) {
            existingCapsula.remove();
        }

        const data = datosCapsulas[hexagonId];
        if (!data) return; // No hay datos para este hexágono, no mostrar nada.

        const capsula = document.createElement('div');
        capsula.classList.add('capsula-interactiva'); // Clase para estilos CSS

        capsula.innerHTML = `
            <h2>${data.titulo}</h2>
            <p>${data.situacion}</p>
            <div class="opciones-capsula">
                ${data.opciones.map((opcion, index) => `
                    <button class="opcion-btn" data-index="${index}">${opcion.texto}</button>
                `).join('')}
            </div>
            <button class="cerrar-capsula">Cerrar</button>
        `;

        document.body.appendChild(capsula);

        // Posicionar la cápsula (ejemplo: centrada en pantalla)
        // Puedes ajustar esto para que aparezca cerca del hexágono si lo prefieres
        capsula.style.position = 'fixed';
        capsula.style.top = '50%';
        capsula.style.left = '50%';
        capsula.style.transform = 'translate(-50%, -50%)';
        capsula.style.zIndex = '1000'; // Asegúrate de que esté por encima de todo

        // Agrega listeners para las opciones de la cápsula
        capsula.querySelectorAll('.opcion-btn').forEach(button => {
            button.addEventListener('click', function() {
                const opcionIndex = this.dataset.index;
                const selectedOpcion = data.opciones[opcionIndex];

                // Actualizar puntos
                puntos += selectedOpcion.valorPuntos;
                actualizarContadorPuntos();

                // Mostrar retroalimentación (opcional)
                let feedbackMessage = selectedOpcion.esCorrecta ? "¡Correcto!" : "Incorrecto.";
                if (selectedOpcion.valorPuntos > 0) {
                    feedbackMessage += ` Ganas ${selectedOpcion.valorPuntos} puntos.`;
                } else if (selectedOpcion.valorPuntos < 0) {
                    feedbackMessage += ` Pierdes ${Math.abs(selectedOpcion.valorPuntos)} puntos.`;
                }
                alert(feedbackMessage); // Puedes usar un div flotante más elegante para esto

                // Deshabilitar opciones después de responder
                capsula.querySelectorAll('.opcion-btn').forEach(btn => btn.disabled = true);
                
                // Opcional: cerrar la cápsula automáticamente después de responder
                // capsula.remove();
            });
        });

        // Listener para el botón de cerrar
        capsula.querySelector('.cerrar-capsula').addEventListener('click', function() {
            capsula.remove();
        });
    }
});

// --- Funcionalidad del Dropdown de Bootstrap ---
// Bootstrap maneja esto automáticamente si los JS están correctamente enlazados.
// No necesitas JavaScript adicional aquí a menos que quieras personalizar su comportamiento.