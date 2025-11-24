// Configuración de la API - Usamos tu backend completo en Render
const API_BASE_URL = "https://api-estudiantes-cursos.onrender.com";

// Elementos del DOM
const elementos = {
    // Formularios
    formEstudiante: document.getElementById('form-estudiante'),
    formCurso: document.getElementById('form-curso'),
    formInscripcion: document.getElementById('form-inscripcion'),
    
    // Tablas
    tablaEstudiantes: document.getElementById('tabla-estudiantes'),
    tbodyEstudiantes: document.getElementById('tbody-estudiantes'),
    tablaCursos: document.getElementById('tabla-cursos'),
    tbodyCursos: document.getElementById('tbody-cursos'),
    tablaInscripciones: document.getElementById('tabla-inscripciones'),
    tbodyInscripciones: document.getElementById('tbody-inscripciones'),
    
    // Loadings
    loadingEstudiantes: document.getElementById('loading-estudiantes'),
    loadingCursos: document.getElementById('loading-cursos'),
    loadingInscripciones: document.getElementById('loading-inscripciones'),
    
    // Selects para inscripciones
    estudianteSelect: document.getElementById('estudiante-select'),
    cursoSelect: document.getElementById('curso-select'),
    
    // Notificación
    notificacion: document.getElementById('notificacion')
};

// Clase para manejar estudiantes
class StudentService {
    static async getAll() {
        try {
            const response = await fetch(`${API_BASE_URL}/estudiantes`);
            if (!response.ok) throw new Error('Error al obtener estudiantes');
            return await response.json();
        } catch (error) {
            throw new Error(`Error: ${error.message}`);
        }
    }

    static async create(student) {
        try {
            const response = await fetch(`${API_BASE_URL}/estudiantes`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(student)
            });
            
            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(`Error ${response.status}: ${errorText}`);
            }
            
            const result = await response.json();
            return result.data || result;
        } catch (error) {
            throw new Error(`Error: ${error.message}`);
        }
    }

    static async update(id, student) {
        try {
            const response = await fetch(`${API_BASE_URL}/estudiantes/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(student)
            });
            
            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(`Error ${response.status}: ${errorText}`);
            }
            
            return await response.json();
        } catch (error) {
            throw new Error(`Error: ${error.message}`);
        }
    }

    static async delete(id) {
        try {
            const response = await fetch(`${API_BASE_URL}/estudiantes/${id}`, {
                method: 'DELETE'
            });
            
            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(`Error ${response.status}: ${errorText}`);
            }
            
            return await response.json();
        } catch (error) {
            throw new Error(`Error: ${error.message}`);
        }
    }
}

// Clase para manejar cursos
class CourseService {
    static async getAll() {
        try {
            const response = await fetch(`${API_BASE_URL}/cursos`);
            if (!response.ok) throw new Error('Error al obtener cursos');
            return await response.json();
        } catch (error) {
            throw new Error(`Error: ${error.message}`);
        }
    }

    static async create(course) {
        try {
            const response = await fetch(`${API_BASE_URL}/cursos`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(course)
            });
            
            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(`Error ${response.status}: ${errorText}`);
            }
            
            const result = await response.json();
            return result.data || result;
        } catch (error) {
            throw new Error(`Error: ${error.message}`);
        }
    }

    static async update(id, course) {
        try {
            const response = await fetch(`${API_BASE_URL}/cursos/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(course)
            });
            
            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(`Error ${response.status}: ${errorText}`);
            }
            
            return await response.json();
        } catch (error) {
            throw new Error(`Error: ${error.message}`);
        }
    }

    static async delete(id) {
        try {
            const response = await fetch(`${API_BASE_URL}/cursos/${id}`, {
                method: 'DELETE'
            });
            
            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(`Error ${response.status}: ${errorText}`);
            }
            
            return await response.json();
        } catch (error) {
            throw new Error(`Error: ${error.message}`);
        }
    }
}

// Clase para manejar inscripciones
class EnrollmentService {
    static async getAll() {
        try {
            const response = await fetch(`${API_BASE_URL}/inscripciones`);
            if (!response.ok) throw new Error('Error al obtener inscripciones');
            return await response.json();
        } catch (error) {
            throw new Error(`Error: ${error.message}`);
        }
    }

    static async create(inscripcion) {
        try {
            const response = await fetch(`${API_BASE_URL}/inscripciones`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(inscripcion)
            });
            
            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(`Error ${response.status}: ${errorText}`);
            }
            
            const result = await response.json();
            return result.data || result;
        } catch (error) {
            throw new Error(`Error: ${error.message}`);
        }
    }

    static async delete(id) {
        try {
            const response = await fetch(`${API_BASE_URL}/inscripciones/${id}`, {
                method: 'DELETE'
            });
            
            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(`Error ${response.status}: ${errorText}`);
            }
            
            return await response.json();
        } catch (error) {
            throw new Error(`Error: ${error.message}`);
        }
    }

    // Obtener datos completos para inscripciones
    static async getInscripcionesCompletas() {
        try {
            const [inscripciones, estudiantes, cursos] = await Promise.all([
                this.getAll(),
                StudentService.getAll(),
                CourseService.getAll()
            ]);

            return inscripciones.map(inscripcion => {
                const estudiante = estudiantes.find(e => e.id === inscripcion.estudiante_id);
                const curso = cursos.find(c => c.id === inscripcion.curso_id);
                
                return {
                    ...inscripcion,
                    estudiante_nombre: estudiante ? estudiante.nombre : 'No encontrado',
                    estudiante_email: estudiante ? estudiante.email : 'No encontrado',
                    curso_nombre: curso ? curso.nombre : 'No encontrado',
                    curso_creditos: curso ? curso.creditos : 'N/A'
                };
            });
        } catch (error) {
            throw new Error(`Error al obtener inscripciones completas: ${error.message}`);
        }
    }
}

// Utilidades
class Utils {
    static mostrarNotificacion(mensaje, tipo = 'success') {
        elementos.notificacion.textContent = mensaje;
        elementos.notificacion.className = `notificacion ${tipo}`;
        elementos.notificacion.style.display = 'block';
        
        setTimeout(() => {
            elementos.notificacion.style.display = 'none';
        }, 5000);
    }

    static mostrarLoading(loadingElement, tablaElement) {
        if (loadingElement) loadingElement.style.display = 'block';
        if (tablaElement) tablaElement.style.display = 'none';
    }

    static ocultarLoading(loadingElement, tablaElement) {
        if (loadingElement) loadingElement.style.display = 'none';
        if (tablaElement) tablaElement.style.display = 'table';
    }

    static confirmarAccion(mensaje) {
        return confirm(mensaje);
    }

    static escaparHTML(texto) {
        if (!texto) return '';
        return texto.toString()
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#039;');
    }

    static formatearFecha(fecha) {
        if (!fecha) return 'N/A';
        return new Date(fecha).toLocaleDateString('es-ES');
    }
}

// Renderizado de datos
class Renderer {
    static renderEstudiantes(estudiantes) {
        if (!elementos.tbodyEstudiantes) return;
        
        elementos.tbodyEstudiantes.innerHTML = '';
        
        if (estudiantes.length === 0) {
            const fila = document.createElement('tr');
            fila.innerHTML = `<td colspan="5" style="text-align: center;">No hay estudiantes registrados</td>`;
            elementos.tbodyEstudiantes.appendChild(fila);
            return;
        }
        
        estudiantes.forEach(estudiante => {
            const fila = document.createElement('tr');
            fila.innerHTML = `
                <td>${estudiante.id}</td>
                <td>${Utils.escaparHTML(estudiante.nombre)}</td>
                <td>${Utils.escaparHTML(estudiante.email)}</td>
                <td>${Utils.formatearFecha(estudiante.fecha_creacion)}</td>
                <td class="acciones">
                    <button class="btn btn-edit" onclick="editarEstudiante(${estudiante.id}, '${Utils.escaparHTML(estudiante.nombre)}', '${Utils.escaparHTML(estudiante.email)}')">
                        Editar
                    </button>
                    <button class="btn btn-delete" onclick="eliminarEstudiante(${estudiante.id}, '${Utils.escaparHTML(estudiante.nombre)}')">
                        Eliminar
                    </button>
                </td>
            `;
            elementos.tbodyEstudiantes.appendChild(fila);
        });
    }

    static renderCursos(cursos) {
        if (!elementos.tbodyCursos) return;
        
        elementos.tbodyCursos.innerHTML = '';
        
        if (cursos.length === 0) {
            const fila = document.createElement('tr');
            fila.innerHTML = `<td colspan="6" style="text-align: center;">No hay cursos registrados</td>`;
            elementos.tbodyCursos.appendChild(fila);
            return;
        }
        
        cursos.forEach(curso => {
            const fila = document.createElement('tr');
            fila.innerHTML = `
                <td>${curso.id}</td>
                <td>${Utils.escaparHTML(curso.nombre)}</td>
                <td>${Utils.escaparHTML(curso.descripcion || 'Sin descripción')}</td>
                <td>${curso.creditos || 3}</td>
                <td>${Utils.formatearFecha(curso.fecha_creacion)}</td>
                <td class="acciones">
                    <button class="btn btn-edit" onclick="editarCurso(${curso.id}, '${Utils.escaparHTML(curso.nombre)}', '${Utils.escaparHTML(curso.descripcion || '')}', ${curso.creditos || 3})">
                        Editar
                    </button>
                    <button class="btn btn-delete" onclick="eliminarCurso(${curso.id}, '${Utils.escaparHTML(curso.nombre)}')">
                        Eliminar
                    </button>
                </td>
            `;
            elementos.tbodyCursos.appendChild(fila);
        });
    }

    static renderInscripciones(inscripciones) {
        if (!elementos.tbodyInscripciones) return;
        
        elementos.tbodyInscripciones.innerHTML = '';
        
        if (inscripciones.length === 0) {
            const fila = document.createElement('tr');
            fila.innerHTML = `<td colspan="6" style="text-align: center;">No hay inscripciones registradas</td>`;
            elementos.tbodyInscripciones.appendChild(fila);
            return;
        }
        
        inscripciones.forEach(inscripcion => {
            const fila = document.createElement('tr');
            fila.innerHTML = `
                <td>${inscripcion.id}</td>
                <td>${Utils.escaparHTML(inscripcion.estudiante_nombre)}</td>
                <td>${Utils.escaparHTML(inscripcion.curso_nombre)}</td>
                <td>${Utils.formatearFecha(inscripcion.fecha_inscripcion)}</td>
                <td class="acciones">
                    <button class="btn btn-delete" onclick="eliminarInscripcion(${inscripcion.id})">
                        Cancelar Inscripción
                    </button>
                </td>
            `;
            elementos.tbodyInscripciones.appendChild(fila);
        });
    }

    static llenarSelectEstudiantes(estudiantes) {
        if (!elementos.estudianteSelect) return;
        
        elementos.estudianteSelect.innerHTML = '<option value="">Seleccionar estudiante...</option>';
        estudiantes.forEach(estudiante => {
            const option = document.createElement('option');
            option.value = estudiante.id;
            option.textContent = `${Utils.escaparHTML(estudiante.nombre)} (${Utils.escaparHTML(estudiante.email)})`;
            elementos.estudianteSelect.appendChild(option);
        });
    }

    static llenarSelectCursos(cursos) {
        if (!elementos.cursoSelect) return;
        
        elementos.cursoSelect.innerHTML = '<option value="">Seleccionar curso...</option>';
        cursos.forEach(curso => {
            const option = document.createElement('option');
            option.value = curso.id;
            option.textContent = `${Utils.escaparHTML(curso.nombre)} (${curso.creditos || 3} créditos)`;
            elementos.cursoSelect.appendChild(option);
        });
    }
}

// Funciones de gestión de estudiantes
async function cargarEstudiantes() {
    try {
        Utils.mostrarLoading(elementos.loadingEstudiantes, elementos.tablaEstudiantes);
        const estudiantes = await StudentService.getAll();
        Renderer.renderEstudiantes(estudiantes);
        Renderer.llenarSelectEstudiantes(estudiantes);
        Utils.ocultarLoading(elementos.loadingEstudiantes, elementos.tablaEstudiantes);
    } catch (error) {
        console.error('Error cargando estudiantes:', error);
        Utils.mostrarNotificacion('Error al cargar estudiantes: ' + error.message, 'error');
        Utils.ocultarLoading(elementos.loadingEstudiantes, elementos.tablaEstudiantes);
    }
}

async function crearEstudiante(event) {
    event.preventDefault();
    
    const formData = new FormData(event.target);
    const estudiante = {
        nombre: formData.get('nombre'),
        email: formData.get('email')
    };

    // Validación básica
    if (!estudiante.nombre || !estudiante.email) {
        Utils.mostrarNotificacion('Por favor completa todos los campos', 'error');
        return;
    }

    try {
        await StudentService.create(estudiante);
        Utils.mostrarNotificacion('Estudiante creado exitosamente');
        event.target.reset();
        await cargarEstudiantes();
    } catch (error) {
        Utils.mostrarNotificacion('Error al crear estudiante: ' + error.message, 'error');
    }
}

function editarEstudiante(id, nombre, email) {
    const nuevoNombre = prompt('Editar nombre:', nombre);
    if (nuevoNombre === null) return;

    const nuevoEmail = prompt('Editar email:', email);
    if (nuevoEmail === null) return;

    StudentService.update(id, { nombre: nuevoNombre, email: nuevoEmail })
        .then(() => {
            Utils.mostrarNotificacion('Estudiante actualizado exitosamente');
            cargarEstudiantes();
        })
        .catch(error => {
            Utils.mostrarNotificacion('Error al actualizar estudiante: ' + error.message, 'error');
        });
}

function eliminarEstudiante(id, nombre) {
    if (Utils.confirmarAccion(`¿Estás seguro de que quieres eliminar al estudiante "${nombre}"?`)) {
        StudentService.delete(id)
            .then(() => {
                Utils.mostrarNotificacion('Estudiante eliminado exitosamente');
                cargarEstudiantes();
            })
            .catch(error => {
                Utils.mostrarNotificacion('Error al eliminar estudiante: ' + error.message, 'error');
            });
    }
}

// Funciones de gestión de cursos
async function cargarCursos() {
    try {
        Utils.mostrarLoading(elementos.loadingCursos, elementos.tablaCursos);
        const cursos = await CourseService.getAll();
        Renderer.renderCursos(cursos);
        Renderer.llenarSelectCursos(cursos);
        Utils.ocultarLoading(elementos.loadingCursos, elementos.tablaCursos);
    } catch (error) {
        console.error('Error cargando cursos:', error);
        Utils.mostrarNotificacion('Error al cargar cursos: ' + error.message, 'error');
        Utils.ocultarLoading(elementos.loadingCursos, elementos.tablaCursos);
    }
}

async function crearCurso(event) {
    event.preventDefault();
    
    const formData = new FormData(event.target);
    const curso = {
        nombre: formData.get('nombre'),
        descripcion: formData.get('descripcion'),
        creditos: parseInt(formData.get('creditos')) || 3
    };

    // Validación básica
    if (!curso.nombre) {
        Utils.mostrarNotificacion('El nombre del curso es obligatorio', 'error');
        return;
    }

    try {
        await CourseService.create(curso);
        Utils.mostrarNotificacion('Curso creado exitosamente');
        event.target.reset();
        await cargarCursos();
    } catch (error) {
        Utils.mostrarNotificacion('Error al crear curso: ' + error.message, 'error');
    }
}

function editarCurso(id, nombre, descripcion, creditos) {
    const nuevoNombre = prompt('Editar nombre del curso:', nombre);
    if (nuevoNombre === null) return;

    const nuevaDescripcion = prompt('Editar descripción:', descripcion);
    if (nuevaDescripcion === null) return;

    const nuevosCreditos = prompt('Editar créditos:', creditos);
    if (nuevosCreditos === null) return;

    CourseService.update(id, { 
        nombre: nuevoNombre, 
        descripcion: nuevaDescripcion, 
        creditos: parseInt(nuevosCreditos) || 3
    })
    .then(() => {
        Utils.mostrarNotificacion('Curso actualizado exitosamente');
        cargarCursos();
    })
    .catch(error => {
        Utils.mostrarNotificacion('Error al actualizar curso: ' + error.message, 'error');
    });
}

function eliminarCurso(id, nombre) {
    if (Utils.confirmarAccion(`¿Estás seguro de que quieres eliminar el curso "${nombre}"?`)) {
        CourseService.delete(id)
            .then(() => {
                Utils.mostrarNotificacion('Curso eliminado exitosamente');
                cargarCursos();
            })
            .catch(error => {
                Utils.mostrarNotificacion('Error al eliminar curso: ' + error.message, 'error');
            });
    }
}

// Funciones de gestión de inscripciones
async function cargarInscripciones() {
    try {
        Utils.mostrarLoading(elementos.loadingInscripciones, elementos.tablaInscripciones);
        const inscripciones = await EnrollmentService.getInscripcionesCompletas();
        Renderer.renderInscripciones(inscripciones);
        Utils.ocultarLoading(elementos.loadingInscripciones, elementos.tablaInscripciones);
    } catch (error) {
        console.error('Error cargando inscripciones:', error);
        Utils.mostrarNotificacion('Error al cargar inscripciones: ' + error.message, 'error');
        Utils.ocultarLoading(elementos.loadingInscripciones, elementos.tablaInscripciones);
    }
}

async function crearInscripcion(event) {
    event.preventDefault();
    
    const formData = new FormData(event.target);
    const inscripcion = {
        estudiante_id: parseInt(formData.get('estudiante_id')),
        curso_id: parseInt(formData.get('curso_id'))
    };

    // Validación
    if (!inscripcion.estudiante_id || !inscripcion.curso_id) {
        Utils.mostrarNotificacion('Por favor selecciona un estudiante y un curso', 'error');
        return;
    }

    try {
        await EnrollmentService.create(inscripcion);
        Utils.mostrarNotificacion('Inscripción realizada exitosamente');
        event.target.reset();
        await cargarInscripciones();
    } catch (error) {
        Utils.mostrarNotificacion('Error al crear inscripción: ' + error.message, 'error');
    }
}

function eliminarInscripcion(id) {
    if (Utils.confirmarAccion('¿Estás seguro de que quieres cancelar esta inscripción?')) {
        EnrollmentService.delete(id)
            .then(() => {
                Utils.mostrarNotificacion('Inscripción cancelada exitosamente');
                cargarInscripciones();
            })
            .catch(error => {
                Utils.mostrarNotificacion('Error al cancelar inscripción: ' + error.message, 'error');
            });
    }
}

// Event Listeners
document.addEventListener('DOMContentLoaded', function() {
    console.log('Inicializando aplicación con API completa...');
    
    // Cargar datos iniciales
    cargarEstudiantes();
    cargarCursos();
    cargarInscripciones();

    // Asignar event listeners a formularios
    if (elementos.formEstudiante) {
        elementos.formEstudiante.addEventListener('submit', crearEstudiante);
    }
    
    if (elementos.formCurso) {
        elementos.formCurso.addEventListener('submit', crearCurso);
    }
    
    if (elementos.formInscripcion) {
        elementos.formInscripcion.addEventListener('submit', crearInscripcion);
    }

    console.log('Aplicación con API completa inicializada correctamente');
});

// Hacer funciones globales para los onclick
window.editarEstudiante = editarEstudiante;
window.eliminarEstudiante = eliminarEstudiante;
window.editarCurso = editarCurso;
window.eliminarCurso = eliminarCurso;
window.eliminarInscripcion = eliminarInscripcion;