(function () {
    
    // VARIABLES
    const contenedorProducto = document.querySelector('.js-seccion1__contenedor-producto');
    const contenedorMensaje = document.querySelector('.js-seccion5__contenedor-mensaje');
    const contenedorMensajeModal = document.querySelector('.js-modal__contenedor-mensaje');
    const contenedorModal =  document.querySelector('.js-modal');
    const inputNombreSeccion5 = document.querySelector('.js-seccion5__input-nombre');
    const inputCorreoSeccion5 = document.querySelector('.js-seccion5__input-correo');
    const formularioSeccion5 = document.querySelector('.js-seccion5__form');

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
        producto.classList.add('c-seccion1__producto');
        producto.innerHTML = `
            <div class="c-seccion1__producto-arriba"></div>
            <div class="c-seccion1__producto-abajo"></div>
            <div class="c-seccion1__nombre">
                <h5 class="c-seccion1__nombre-h5">Dynafit</h5>
                <h5 class="c-seccion1__nombre-h5 js-seccion1__nombre-h5">Mezzalama</h5>
                <div class="c-seccion1__nombre-raya"></div>
            </div>
            <div class="c-seccion1__img js-seccion1__img">
                <img src="public/assets/imgs/nueva-coleccion/botas0.jpg" alt="imagen botas">
            </div>
            <div class="c-seccion1__listado">
                <ul class="c-seccion1__ul js-seccion1__ul">
    
                </ul>
                <div class="c-seccion1__divisor"></div>
                <div class="c-seccion1__flechas js-seccion1__flechas">
                    <li class="c-seccion1__flecha"><i class="fa-solid fa-arrow-left-long"></i></li>
                    <li class="c-seccion1__flecha"><i class="fa-solid fa-arrow-right-long"></i></li>
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
    
    function limpiarHTML (contenedor) {
        while (contenedor.firstChild) {
            contenedor.removeChild(contenedor.firstChild);
        }
    }

    function rellenarCorreo (e) {
        infoCorreo[e.target.name] = e.target.value.trim();
        console.log(infoCorreo)
    }

    function enviarCorreo (e) {
        const {nombre, correo} = infoCorreo;
        const correoCorrecto = comprobarCorreo(correo);
        let contenedor;
        if(e.target.classList.contains('js-seccion5__form')) {
            contenedor = contenedorMensaje;
        }
        if(e.target.classList.contains('js-modal__form')) {
            contenedor = contenedorMensajeModal;
        }
        if(nombre !=='' && correoCorrecto === true){
            mostrarMensaje(contenedor, 'exito', 'Se ha enviado correctamente');
            setTimeout(() => {
                contenedorModal.classList.remove('c-modal--mod');
            }, 3500);
        } else {
            mostrarMensaje(contenedor, 'alerta', 'Error al rellenar los campos');
        }
    }

    function comprobarCorreo (email) {
        let correcto = false;
        if (!er.test(email)){
            return correcto;
        } else {
            correcto = true;
            return correcto;
        }
    }

    function mostrarMensaje (contenedorMensaje, tipo, mensaje) {
        if(contenedorMensaje.childElementCount === 0) {
            const p = document.createElement('p');
            p.classList.add('u-mensaje');
            p.dataset.cy = 'mensaje';
            p.textContent = mensaje;
            if (tipo === 'exito') {
                p.classList.add(`u-mensaje--${tipo}`);
            }
            if (tipo === 'error') {
                p.classList.add(`u-mensaje--${tipo}`);
            }
            if (tipo === 'alerta') {
                p.classList.add(`u-mensaje--${tipo}`);
            }
            contenedorMensaje.appendChild(p);
            setTimeout((e) => {
                limpiarHTML(contenedorMensaje);
            }, 10000);
        }
    }

    function cargarModalSuscripcion(tiempo) {
        setTimeout(() => {
            contenedorModal.classList.add('c-modal--mod');
        }, tiempo);
    }

    function resetInputs() {
        infoCorreo.nombre = '';
        infoCorreo.correo = '';
    };

    function resetFormulario (formulario){
        setTimeout(() => {
            formulario.reset();
        }, 3000);
    };

})();