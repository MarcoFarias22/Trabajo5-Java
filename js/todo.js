// Referencias al DOM
const form = document.getElementById("todoForm");
const input = document.getElementById("todoInput");
const lista = document.getElementById("listaTareas");
const contador = document.getElementById("contador");

let tareasPendientes = 0;

// Función para actualizar el contador
const actualizarContador = () => {
    contador.innerText = tareasPendientes;
};

// Evento de envío del formulario
form.addEventListener("submit", (e) => {
    e.preventDefault(); // Evita que se recargue la página

    const textoTarea = input.value.trim();

    // Validación: No permitir tareas vacías 
    if (textoTarea === "") {
        alert("Por favor, ingresá una tarea.");
        return;
    }

    // Crear el elemento de la lista (li)
    const nuevaTarea = document.createElement("li");
    
    // Contenido interno con botón de eliminar
    nuevaTarea.innerHTML = `
        <span>${textoTarea}</span>
        <button class="btn-eliminar">Eliminar</button>
    `;

    // Evento para tachar (completar) la tarea
    nuevaTarea.addEventListener("click", (e) => {
        // Solo tachamos si se hace clic en el texto, no en el botón
        if (e.target.tagName !== "BUTTON") {
            nuevaTarea.classList.toggle("completada");
        }
    });

    // Evento para eliminar la tarea
    const btnEliminar = nuevaTarea.querySelector(".btn-eliminar");
    btnEliminar.addEventListener("click", () => {
        nuevaTarea.remove();
        tareasPendientes--;
        actualizarContador();
    });

    // Agregar a la lista y limpiar input
    lista.appendChild(nuevaTarea);
    input.value = "";
    tareasPendientes++;
    actualizarContador();
});