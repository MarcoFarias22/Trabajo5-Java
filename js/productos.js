// 1. Definición del array de productos  
const productos = [
    { id: 1, nombre: "Laptop Gamer", precio: 85000, categoria: "Electronica", enStock: true },
    { id: 2, nombre: "Cafetera Express", precio: 15000, categoria: "Hogar", enStock: true },
    { id: 3, nombre: "Auriculares Bluetooth", precio: 8000, categoria: "Electronica", enStock: false },
    { id: 4, nombre: "Silla de Escritorio", precio: 25000, categoria: "Hogar", enStock: true },
    { id: 5, nombre: "Teclado Mecánico", precio: 12000, categoria: "Electronica", enStock: true },
    { id: 6, nombre: "Remera Algodón", precio: 5000, categoria: "Ropa", enStock: true },
    { id: 7, nombre: "Zapatillas Running", precio: 35000, categoria: "Ropa", enStock: false },
    { id: 8, nombre: "Monitor 24 Pulgadas", precio: 45000, categoria: "Electronica", enStock: true }
];


// 2. Referencias al DOM
const contenedor = document.getElementById("contenedorProductos");
const inputBusqueda = document.getElementById("inputBusqueda");
const selectCategoria = document.getElementById("selectCategoria");
const rangePrecio = document.getElementById("rangePrecio");
const valorPrecio = document.getElementById("valorPrecio");
const checkStock = document.getElementById("checkStock");

// 3. Función para renderizar tarjetas
const mostrarProductos = (lista) => {
    contenedor.innerHTML = lista.map(p => `
        <div class="tarjeta">
            <h3>${p.nombre}</h3>
            <p>Categoría: ${p.categoria}</p>
            <p>Precio: $${p.precio}</p>
            <p>${p.enStock ? "✅ En Stock" : "❌ Sin Stock"}</p>
        </div>
    `).join("");
};

// 4. Función de filtrado combinado 
const filtrar = () => {
    const texto = inputBusqueda.value.toLowerCase();
    const cat = selectCategoria.value;
    const precioMax = parseInt(rangePrecio.value);
    const soloStock = checkStock.checked;

    valorPrecio.innerText = precioMax;

    const filtrados = productos.filter(p => {
        const coincideNombre = p.nombre.toLowerCase().includes(texto);
        const coincideCat = cat === "todos" || p.categoria === cat;
        const coincidePrecio = p.precio <= precioMax;
        const coincideStock = !soloStock || p.enStock;

        return coincideNombre && coincideCat && coincidePrecio && coincideStock;
    });

    mostrarProductos(filtrados);
};

// 5. Eventos para actualización en tiempo real
inputBusqueda.addEventListener("input", filtrar);
selectCategoria.addEventListener("change", filtrar);
rangePrecio.addEventListener("input", filtrar);
checkStock.addEventListener("change", filtrar);

// Carga inicial
mostrarProductos(productos);