// script.js

// Obtener el elemento del contador de coins
const contadorCoinsElement = document.getElementById('contador-coins');

// Función para incrementar las coins
function incrementarCoins() {
    let coins = parseInt(contadorCoinsElement.textContent);
    coins += 10; // Ejemplo: sumar 10 coins
    contadorCoinsElement.textContent = coins;
    console.log("Coins actuales: ", coins);
}

// Función para decrementar las coins
function decrementarCoins() {
    let coins = parseInt(contadorCoinsElement.textContent);
    if (coins > 0) { // Evita coins negativas si no es el comportamiento deseado
        coins -= 5; // Ejemplo: restar 5 coins
        contadorCoinsElement.textContent = coins;
    }
    console.log("Coins actuales: ", coins);
}

// Lógica para el menú desplegable y los hexágonos
document.addEventListener('DOMContentLoaded', function() {
    const dropdownBtn = document.querySelector('.dropbtn');
    const dropdown = document.querySelector('.dropdown');

    if (dropdownBtn && dropdown) {
        dropdownBtn.addEventListener('click', function() {
            dropdown.classList.toggle('show');
        });

        // Cerrar el menú si se hace clic fuera
        window.addEventListener('click', function(event) {
            if (!event.target.matches('.dropbtn') && !event.target.closest('.dropdown-content')) {
                if (dropdown.classList.contains('show')) {
                    dropdown.classList.remove('show');
                }
            }
        });
    }

    // Lógica para la interactividad de los hexágonos normales (no el de inicio)
    const hexagons = document.querySelectorAll('.hexagon:not(.hexagon-start)');
    const hexInicio = document.getElementById('hex-inicio');
    let currentActiveHexagon = null; // Para rastrear el hexágono activo

    // Función para manejar la apertura de la cápsula para hexágonos de lección
    function openLessonCapsula(hexagonId) {
        console.log(`Abriendo cápsula para el hexágono de lección: ${hexagonId}`);

        if (currentActiveHexagon) {
            currentActiveHexagon.classList.remove('active');
        }

        const clickedHexagon = document.getElementById(hexagonId);
        if (clickedHexagon) {
            clickedHexagon.classList.add('active');
            currentActiveHexagon = clickedHexagon;
        }

        let capsula = document.querySelector('.capsula-interactiva');
        if (!capsula) {
            capsula = document.createElement('div');
            capsula.classList.add('capsula-interactiva');
            document.body.appendChild(capsula);
        }

        capsula.innerHTML = `
            <h2>Contenido de la Lección ${hexagonId}</h2>
            <p>Aquí va el material de estudio, preguntas o desafíos para este hexágono.</p>
            <div class="opciones-capsula">
                <button class="opcion-btn" id="btn-respuesta-correcta">Respuesta Correcta (+ Dinero)</button>
                <button class="opcion-btn" id="btn-respuesta-incorrecta">Respuesta Incorrecta (- Dinero)</button>
            </div>
            <button class="cerrar-capsula">Cerrar</button>
        `;
        capsula.style.display = 'block';

        document.getElementById('btn-respuesta-correcta').onclick = () => {
            incrementarCoins(); // Gana dinero
            alert("¡Respuesta Correcta! Has ganado coins.");
            capsula.style.display = 'none';
            if (currentActiveHexagon) {
                currentActiveHexagon.classList.remove('active');
                currentActiveHexagon = null;
            }
        };

        document.getElementById('btn-respuesta-incorrecta').onclick = () => {
            decrementarCoins(); // Pierde dinero
            alert("¡Respuesta Incorrecta! Has perdido coins.");
            capsula.style.display = 'none';
            if (currentActiveHexagon) {
                currentActiveHexagon.classList.remove('active');
                currentActiveHexagon = null;
            }
        };

        document.querySelector('.cerrar-capsula').onclick = () => {
            capsula.style.display = 'none';
            if (currentActiveHexagon) {
                currentActiveHexagon.classList.remove('active');
                currentActiveHexagon = null;
            }
        };
    }

    // Función para manejar la apertura de la cápsula del hexágono de inicio
    function openInicioCapsula() {
        console.log("Abriendo cápsula del hexágono de inicio.");

        // Si ya hay un hexágono activo (de lección), quítale la clase
        if (currentActiveHexagon) {
            currentActiveHexagon.classList.remove('active');
        }
        // Marcar el hexágono de inicio como activo
        hexInicio.classList.add('active');
        currentActiveHexagon = hexInicio;

        let capsula = document.querySelector('.capsula-interactiva');
        if (!capsula) {
            capsula = document.createElement('div');
            capsula.classList.add('capsula-interactiva');
            document.body.appendChild(capsula);
        }

        capsula.innerHTML = `
            <h2>¡Bienvenido a ZumbaCash!</h2>
            <p>Aquí aprenderás todo sobre educación financiera de una manera divertida y práctica. ¡Prepárate para manejar tus coins como un experto!</p>
            <p>¿Estás listo para iniciar tu ruta financiera?</p>
            <div class="opciones-capsula">
                <button class="opcion-btn" id="btn-iniciar-ruta">¡Sí, empecemos!</button>
                <button class="opcion-btn" id="btn-no-ahora">Quizás más tarde</button>
            </div>
            <button class="cerrar-capsula">Cerrar</button>
        `;
        capsula.style.display = 'block';

        document.getElementById('btn-iniciar-ruta').onclick = () => {
            alert("¡Excelente! Que comience tu aventura financiera.");
            capsula.style.display = 'none';
            if (currentActiveHexagon) {
                currentActiveHexagon.classList.remove('active');
                currentActiveHexagon = null;
            }
            // Aquí podrías agregar lógica adicional, como habilitar los demás hexágonos.
        };

        document.getElementById('btn-no-ahora').onclick = () => {
            alert("¡Está bien! Cuando estés listo, aquí te esperamos.");
            capsula.style.display = 'none';
            if (currentActiveHexagon) {
                currentActiveHexagon.classList.remove('active');
                currentActiveHexagon = null;
            }
        };

        document.querySelector('.cerrar-capsula').onclick = () => {
            capsula.style.display = 'none';
            if (currentActiveHexagon) {
                currentActiveHexagon.classList.remove('active');
                currentActiveHexagon = null;
            }
        };
    }


    // Asignar el evento click a todos los hexágonos (excepto el de inicio)
    hexagons.forEach(hexagon => {
        hexagon.addEventListener('click', function() {
            openLessonCapsula(this.id); // Llama a la función para lecciones
        });
    });

    // Asignar el evento click al hexágono de inicio específicamente
    if (hexInicio) {
        hexInicio.addEventListener('click', function() {
            openInicioCapsula(); // Llama a la función específica del inicio
        });
    }
});