
const contenedor = document.getElementById("contenedorApi");
const estadoDiv = document.getElementById("estado");
const inputBusqueda = document.getElementById("inputBusquedaApi");

let pokemonCache = []; // Para guardar los datos y poder filtrar/buscar

// Función asíncrona principal 
const obtenerDatos = async () => {
    try {
        // Estado de "Cargando..." 
        estadoDiv.innerHTML = '<p class="mensaje-loading">Cargando Pokémon...</p>';
        contenedor.innerHTML = "";

        const respuesta = await fetch("https://pokeapi.co/api/v2/pokemon?limit=50");

        // Verificar respuesta 
        if (!respuesta.ok) {
            throw new Error("No se pudo obtener la información de la API");
        }

        const datos = await respuesta.json();
        
        // Obtenemos los detalles de cada Pokémon para tener imágenes y tipos
        const promesas = datos.results.map(p => fetch(p.url).then(res => res.json()));
        pokemonCache = await Promise.all(promesas);

        // Limpiar mensaje y renderizar 
        estadoDiv.innerHTML = "";
        renderizarTarjetas(pokemonCache);

    } catch (error) {
        // Manejo de errores 
        estadoDiv.innerHTML = `<p class="mensaje-error">Hubo un problema: ${error.message}</p>`;
    }
};

// Función para renderizar tarjetas 
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

//  Buscador Dinámico 
inputBusqueda.addEventListener("input", (e) => {
    const termino = e.target.value.toLowerCase();

    
    if (termino.length > 0 && termino.length < 3) {
        estadoDiv.innerHTML = '<p class="info-busqueda">Escribe al menos 3 caracteres para buscar...</p>';
        return;
    }
    

    if (termino.length === 0) {
        estadoDiv.innerHTML = "";
        renderizarTarjetas(pokemonCache);
        return;
    }


    
    estadoDiv.innerHTML = '<p class="mensaje-loading">Buscando...</p>';

    
    const resultados = pokemonCache.filter(p => 
        p.name.toLowerCase().includes(termino)
    );

    
    renderizarTarjetas(resultados);
});

// Carga inicial
obtenerDatos();