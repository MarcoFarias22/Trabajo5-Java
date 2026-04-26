// Ejercicios de JavaScript 

const calcularPromedio = (notas) => {
    if (notas.length === 0) return 0;
    const suma = notas.reduce((acumulador, nota) => acumulador + nota, 0);
    return suma / notas.length;
};

const filtrarAprobados = (alumnos) => {
    return alumnos.filter(alumno => alumno.nota >= 6);
};


const formatearAlumnos = (alumnos) => {
    return alumnos.map(alumno => `Nombre: ${alumno.nombre} - Nota: ${alumno.nota}`);
};


const buscarAlumno = (alumnos, nombreBuscado) => {
    return alumnos.find(alumno => alumno.nombre.toLowerCase() === nombreBuscado.toLowerCase());
};

// Pruebas con console.log() ---
const listaAlumnos = [
    { nombre: "Marco", nota: 10 },
    { nombre: "Ana", nota: 5 },
    { nombre: "Luis", nota: 8 },
    { nombre: "Marta", nota: 4 }
];

console.log("--- Resultados Punto 1 ---");
console.log("Promedio de notas:", calcularPromedio([10, 5, 8, 4]));
console.log("Alumnos aprobados:", filtrarAprobados(listaAlumnos));
console.log("Lista formateada:", formatearAlumnos(listaAlumnos));
console.log("Búsqueda de 'Marco':", buscarAlumno(listaAlumnos, "Marco"));