// js/api.js

const contenedor = document.getElementById("contenedorApi");
const estadoDiv = document.getElementById("estado");
const inputBusqueda = document.getElementById("inputBusquedaApi");

let pokemonCache = []; // Para guardar los datos y poder filtrar/buscar

// 1. Función asíncrona principal (Punto 4: a, b, c)
const obtenerDatos = async () => {
    try {
        // Estado de "Cargando..." (Punto 30d)
        estadoDiv.innerHTML = '<p class="mensaje-loading">Cargando Pokémon...</p>';
        contenedor.innerHTML = "";

        const respuesta = await fetch("https://pokeapi.co/api/v2/pokemon?limit=50");

        // Verificar respuesta (Punto 30b)
        if (!respuesta.ok) {
            throw new Error("No se pudo obtener la información de la API");
        }

        const datos = await respuesta.json();
        
        // Obtenemos los detalles de cada Pokémon para tener imágenes y tipos
        const promesas = datos.results.map(p => fetch(p.url).then(res => res.json()));
        pokemonCache = await Promise.all(promesas);

        // Limpiar mensaje y renderizar (Punto 30e)
        estadoDiv.innerHTML = "";
        renderizarTarjetas(pokemonCache);

    } catch (error) {
        // Manejo de errores (Punto 30f)
        estadoDiv.innerHTML = `<p class="mensaje-error">Hubo un problema: ${error.message}</p>`;
    }
};

// 2. Función para renderizar tarjetas (Punto 30e)
const renderizarTarjetas = (lista) => {
    if (lista.length === 0) {
        contenedor.innerHTML = "";
        estadoDiv.innerHTML = '<p class="mensaje-vacio">No se encontraron resultados.</p>';
        return;
    }

    estadoDiv.innerHTML = "";
    contenedor.innerHTML = lista.map(p => `
        <div class="tarjeta">
            <img src="${p.sprites.front_default}" alt="${p.name}">
            <h3>${p.name.toUpperCase()}</h3>
            <p><strong>Tipo:</strong> ${p.types.map(t => t.type.name).join(", ")}</p>
            <p><strong>ID:</strong> #${p.id}</p>
        </div>
    `).join("");
};

// 3. Buscador Dinámico (Punto 5: a, b, c, d)
inputBusqueda.addEventListener("input", (e) => {
    const termino = e.target.value.toLowerCase();

    // Requisito: Mínimo 3 caracteres (Punto 34a)
    if (termino.length > 0 && termino.length < 3) {
        estadoDiv.innerHTML = '<p class="info-busqueda">Escribe al menos 3 caracteres para buscar...</p>';
        return;
    }

    if (termino.length === 0) {
        estadoDiv.innerHTML = "";
        renderizarTarjetas(pokemonCache);
        return;
    }

    // Mostrar "Buscando..." (Punto 34b)
    estadoDiv.innerHTML = '<p class="mensaje-loading">Buscando...</p>';

    // Filtrado local (Punto 35)
    const resultados = pokemonCache.filter(p => 
        p.name.toLowerCase().includes(termino)
    );

    // Actualizar tarjetas (Punto 34c)
    renderizarTarjetas(resultados);
});

// Carga inicial
obtenerDatos();