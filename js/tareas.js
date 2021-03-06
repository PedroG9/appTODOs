const listaTareas = new Array();

var btnAgregar = document.querySelector('#btnAgregar');
var seccionTareas = document.querySelector('#listaTareas');
var idTarea = 1;



//  Evento AGREGAR TAREA

btnAgregar.addEventListener('click', agregarTarea);

function agregarTarea(){
    event.preventDefault();
    let nombreTarea = document.querySelector('#agregarNombre').value;
    let prioridadTarea = document.querySelector('#agregarPrioridad').value;
    if (nombreTarea != '' && prioridadTarea != '') {
        guardarTarea(nombreTarea, prioridadTarea);
        document.querySelector('#agregarNombre').value = '';
        document.querySelector('#agregarPrioridad').value = '';
    }
    borrarTarea();
}

function guardarTarea(pNombreTarea, pPrioridadTarea) {
    let registro = new Object();
    registro.id= idTarea;
    registro.nombreTarea = pNombreTarea;
    registro.prioridadTarea = pPrioridadTarea;

    listaTareas.push(registro);
    //console.log(listaTareas);
    pintarTarea(registro);
    idTarea++;
}

function pintarTarea(pObjeto) {
    seccionTareas.innerHTML += `<article class="task ${pObjeto.prioridadTarea}">
                                        <h3>${pObjeto.nombreTarea}</h3>
                                        <button class="btnDelete">Eliminar</button>
                                    </article>`

}

// boton BORRAR

function borrarTarea(){
    let botonEliminar = document.querySelectorAll('.btnDelete');
    for(boton of botonEliminar){
        boton.addEventListener('click', event => {
            
            let tareaBorrar = event.target.parentNode;
            tareaBorrar.parentNode.removeChild(tareaBorrar);

            let posicionTarea = event.target.dataset.id
            listaTareas.splice(posicionTarea, 1);
            
        });
    }
}

// filtro FILTRAR PRIORIDAD

var selectPrioridad = document.querySelector('#buscarPrioridad');
selectPrioridad.addEventListener('change', capturarPrioridad);

function capturarPrioridad() {
    if (selectPrioridad.value != "") {
        pintarTarea(filtrarXprioridad(listaTareas, selectPrioridad));
    } else {
        pintarTarea(listaTareas);
    }
}

function filtrarXprioridad(plistaTareas, pSelectPrioridad) {
    let listaFiltrada = new Array();
    for (registro of plistaTareas) {
        if (registro.prioridadTarea == (pSelectPrioridad.value).toLowerCase()) {
            listaFiltrada.push(registro);
        }
    }
    return listaFiltrada;
}

// filtro FILTRAR POR NOMBRE

var botonBuscar = document.querySelector('#btnBuscar');
botonBuscar.addEventListener('click', capturarNombre);
var nombreBuscar = document.querySelector('#buscarNombre').value;

function capturarNombre(event) {
    event.preventDefault();
    if (nombreBuscar != "") {
        pintarTarea(filtrarXnombre(listaTareas, nombreBuscar));
    } else {
        pintarTarea(listaTareas);
    }
}

function filtrarXnombre(){
    let listaFiltradaXnombre = new Array();
    for(registro of listaTareas){
        let nombreTarea = registro.nombreTarea.toLowerCase();
        if (nombreTarea.includes(nombreBuscar)){
            listaFiltradaXnombre.push(registro);
        }
    }
    return listaFiltradaXnombre;
}