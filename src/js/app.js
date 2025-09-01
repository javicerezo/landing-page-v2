// import { botasColeccion } from "./db";

// VARIABLES
const contenedorProducto = document.querySelector('.js-seccion1__contenedor-producto');
// const contenedorMensaje = document.querySelector('.js-seccion5__contenedor-mensaje');
// const contenedorMensajeModal = document.querySelector('.js-modal__contenedor-mensaje');
const contenedorModal =  document.querySelector('.js-modal');
const inputNombreSeccion5 = document.querySelector('.js-seccion5__input-nombre');
const inputCorreoSeccion5 = document.querySelector('.js-seccion5__input-correo');
const formularioSeccion5 = document.querySelector('.js-seccion5__form');

console.log(contenedorModal)

let contador = 0;
let infoCorreo = {
    nombre: '',
    correo: ''
}
const er = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/; 
const time = 5000;

// EVENTOS
window.addEventListener('DOMContentLoaded', () => {
    cargarModalSuscripcion(time);
    cargarSeccion1();
    
    
    const ulBolitas = document.querySelector('.js-seccion1__ul');
    cargarBolitas(ulBolitas);

    //slider de imagen
    const btnFlecha = document.querySelector('.js-seccion1__flechas');
    btnFlecha.addEventListener('click', e => {
        const contenedorImagen = document.querySelector('.js-seccion1__img');
        const nombre = document.querySelector('.js-seccion1__nombre-h5');
        const imagen = contenedorImagen.children[0];
        if(e.target.classList.contains('fa-arrow-left-long')) {
            if(contador > 0) {
                limpiarHTML(nombre);
                contador--;
                moverImagen(contador, nombre, imagen);
                moverBolita(ulBolitas, contador, 'izquierda');
            }
        }
        if(e.target.classList.contains('fa-arrow-right-long')) {
            if(contador < botasColeccion.length - 1) {
                limpiarHTML(nombre);
                contador++;
                moverImagen(contador, nombre, imagen);
                moverBolita(ulBolitas, contador, 'derecha');
            }
        }
    });
})

inputNombreSeccion5.addEventListener('blur', rellenarCorreo);
inputCorreoSeccion5.addEventListener('blur', rellenarCorreo);
formularioSeccion5.addEventListener('submit', e => {
    e.preventDefault();
    enviarCorreo(e);
    resetInputs();
    resetFormulario(formularioSeccion5);
}); 

contenedorModal.addEventListener('click', e => {
    const inputNombreModal = document.querySelector('.js-modal__input-nombre');
    const inputCorreoModal = document.querySelector('.js-modal__input-email');
    const formularioModal = document.querySelector('.js-modal__form');
    if (e.target.classList.contains('fa-xmark') || e.target.classList.contains('c-modal__screen')) {
        contenedorModal.classList.remove('c-modal--mod');
        resetInputs();
    }
    inputNombreModal.addEventListener('blur', rellenarCorreo);
    inputCorreoModal.addEventListener('blur', rellenarCorreo);
    formularioModal.addEventListener('submit', e => {
        e.preventDefault();
        enviarCorreo(e);
        resetInputs();
        resetFormulario(formularioModal);
    });
});

// FUNCIONES
function cargarSeccion1 () {
    const producto = document.createElement('div');
    producto.classList.add('Seccion1__producto');
    producto.innerHTML = `
        <div class="Seccion1__producto-arriba"></div>
        <div class="Seccion1__producto-abajo"></div>
        <div class="Seccion1__nombre">
            <h5 class="Seccion1__nombre-h5">Dynafit</h5>
            <h5 class="Seccion1__nombre-h5 js-seccion1__nombre-h5">Mezzalama</h5>
            <div class="Seccion1__nombre-raya"></div>
        </div>
        <div class="Seccion1__img js-seccion1__img">
            <img src="public/assets/imgs/nueva-coleccion/botas0.jpg" alt="imagen botas">
        </div>
        <div class="Seccion1__listado">
            <ul class="Seccion1__ul js-seccion1__ul">

            </ul>
            <div class="Seccion1__divisor"></div>
            <div class="Seccion1__flechas js-seccion1__flechas">
                <li class="Seccion1__flecha"><i class="fa-solid fa-arrow-left-long"></i></li>
                <li class="Seccion1__flecha"><i class="fa-solid fa-arrow-right-long"></i></li>
            </div>
        </div>
    `;
    contenedorProducto.appendChild(producto);
};

function cargarBolitas (contenedor) {
    botasColeccion.forEach( bota => {
        const li = document.createElement('li');
        li.classList.add('c-seccion1__li');
        li.innerHTML = `
            <i class="fa-solid fa-circle"></i>
        `;
        contenedor.appendChild(li);
    });
    contenedor.children[0].children[0].classList.toggle('fa-solid');
    contenedor.children[0].children[0].classList.toggle('fa-regular');
}

function moverImagen (contador, nombreBota, imagen) {
    const nuevaBota = botasColeccion.find(element => element.id === contador);
    const {nombre, src} = nuevaBota;
    nombreBota.textContent = nombre;
    imagen.setAttribute('src', src);
}

function moverBolita (contenedor, id, direccion) {
    contenedor.children[id].children[0].classList.toggle('fa-solid');
    contenedor.children[id].children[0].classList.toggle('fa-regular');
    if (direccion === 'izquierda'){
        contenedor.children[id+1].children[0].classList.toggle('fa-solid');
        contenedor.children[id+1].children[0].classList.toggle('fa-regular');
    } else if (direccion === 'derecha') {
        contenedor.children[id-1].children[0].classList.toggle('fa-solid');
        contenedor.children[id-1].children[0].classList.toggle('fa-regular');
    }
}








function cargarModalSuscripcion(tiempo) {
    setTimeout(() => {
        contenedorModal.classList.add('Modal--mod');
    }, tiempo);
}


