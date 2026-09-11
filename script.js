/* =====================================================
   SEGUNDA VIDA
   FUNCIONES PRINCIPALES
===================================================== */


/* =====================================================
   DATOS DE PRODUCTOS
===================================================== */

const productosInfo = {

    "Audífonos inalámbricos": {
        categoria: "Tecnología",
        descripcion:
            "Audífonos inalámbricos funcionales. Una buena opción para escuchar música, estudiar o disfrutar contenido multimedia.",
        estado: "Buen estado",
        ubicacion: "Machetá",
        icono: "🎧"
    },

    "Colección de libros": {
        categoria: "Libros",
        descripcion:
            "Colección de libros disponibles para encontrar nuevos lectores y continuar sus historias.",
        estado: "Buen estado",
        ubicacion: "Machetá",
        icono: "📚"
    },

    "Chaqueta juvenil": {
        categoria: "Ropa",
        descripcion:
            "Chaqueta poco usada y conservada en buenas condiciones. Lista para tener una nueva historia.",
        estado: "Muy buen estado",
        ubicacion: "Machetá",
        icono: "🧥"
    },

    "Lámpara de escritorio": {
        categoria: "Hogar",
        descripcion:
            "Lámpara de escritorio ideal para estudiar, leer o trabajar cómodamente.",
        estado: "Buen estado",
        ubicacion: "Machetá",
        icono: "💡"
    },

    "Mochila": {
        categoria: "Otros",
        descripcion:
            "Mochila resistente que puede utilizarse para el colegio, actividades diarias o viajes.",
        estado: "Buen estado",
        ubicacion: "Machetá",
        icono: "🎒"
    },

    "Teclado mecánico": {
        categoria: "Tecnología",
        descripcion:
            "Teclado mecánico funcional disponible para intercambio y reutilización.",
        estado: "Buen estado",
        ubicacion: "Machetá",
        icono: "⌨️"
    }

};


/* =====================================================
   MODAL PARA PUBLICAR
===================================================== */

function abrirModal() {

    const modal = document.getElementById("modal");

    modal.classList.add("show");

    document.body.style.overflow = "hidden";

}


function cerrarModal() {

    const modal = document.getElementById("modal");

    modal.classList.remove("show");

    document.body.style.overflow = "";

}


/* =====================================================
   CERRAR MODAL AL HACER CLICK AFUERA
===================================================== */

document.addEventListener("click", function(event) {

    const modal = document.getElementById("modal");

    if (event.target === modal) {
        cerrarModal();
    }


    const productModal =
        document.getElementById("product-modal");

    if (event.target === productModal) {
        cerrarProducto();
    }

});


/* =====================================================
   PUBLICAR OBJETO
===================================================== */

function publicarObjeto(event) {

    event.preventDefault();


    const nombre =
        document.getElementById("nombreObjeto").value.trim();

    const categoria =
        document.getElementById("categoriaObjeto").value;

    const estado =
        document.getElementById("estadoObjeto").value;

    const descripcion =
        document.getElementById("descripcionObjeto").value.trim();

    const ubicacion =
        document.getElementById("ubicacionObjeto").value.trim();


    if (
        !nombre ||
        !categoria ||
        !estado ||
        !descripcion ||
        !ubicacion
    ) {

        mostrarToast(
            "Completa todos los campos."
        );

        return;
    }


    /*
       Elegimos un emoji dependiendo
       de la categoría.
    */

    let icono = "📦";

    if (categoria === "Ropa") {
        icono = "👕";
    }

    if (categoria === "Libros") {
        icono = "📚";
    }

    if (categoria === "Tecnología") {
        icono = "💻";
    }

    if (categoria === "Hogar") {
        icono = "🏠";
    }


    /*
       Guardamos los datos para que
       también puedan verse en el modal.
    */

    productosInfo[nombre] = {

        categoria: categoria,

        descripcion: descripcion,

        estado: estado,

        ubicacion: ubicacion,

        icono: icono

    };


    /*
       Creamos la nueva tarjeta.
    */

    const productos =
        document.getElementById("productos");


    const tarjeta =
        document.createElement("article");


    tarjeta.className = "product-card";


    tarjeta.dataset.categoria = categoria;

    tarjeta.dataset.nombre = nombre;


    tarjeta.innerHTML = `

        <div class="product-image other">

            ${icono}

            <span class="condition">
                ${estado}
            </span>

        </div>


        <div class="product-info">

            <span class="product-category">
                ${categoria.toUpperCase()}
            </span>

            <h3>
                ${escaparHTML(nombre)}
            </h3>

            <p>
                ${escaparHTML(descripcion)}
            </p>

            <div class="product-bottom">

                <span class="location">
                    📍 ${escaparHTML(ubicacion)}
                </span>

                <button onclick="verProducto('${escaparAtributo(nombre)}')">
                    Ver más
                </button>

            </div>

        </div>
    `;


    productos.prepend(tarjeta);


    /*
       Limpiamos formulario.
    */

    document.getElementById("form-publicar").reset();


    cerrarModal();


    /*
       Mostramos mensaje.
    */

    mostrarToast(
        "¡Tu objeto fue publicado correctamente!"
    );


    /*
       Nos desplazamos hacia los objetos.
    */

    setTimeout(function() {

        document
            .getElementById("explorar")
            .scrollIntoView({
                behavior: "smooth"
            });

    }, 400);

}


/* =====================================================
   MOSTRAR PRODUCTO
===================================================== */

function verProducto(nombre) {

    const producto = productosInfo[nombre];


    if (!producto) {

        mostrarToast(
            "No se pudo encontrar este objeto."
        );

        return;
    }


    document.getElementById("product-title").textContent =
        nombre;


    document.getElementById("product-category").textContent =
        producto.categoria.toUpperCase();


    document.getElementById("product-description").textContent =
        producto.descripcion;


    document.getElementById("product-condition").textContent =
        producto.estado;


    document.getElementById("product-location").textContent =
        "📍 " + producto.ubicacion;


    document.getElementById("product-icon").textContent =
        producto.icono;


    const modal =
        document.getElementById("product-modal");


    modal.classList.add("show");


    document.body.style.overflow = "hidden";

}


/* =====================================================
   CERRAR PRODUCTO
===================================================== */

function cerrarProducto() {

    const modal =
        document.getElementById("product-modal");


    modal.classList.remove("show");


    document.body.style.overflow = "";

}


/* =====================================================
   BOTÓN "ME INTERESA"
===================================================== */

function contactar() {

    cerrarProducto();


    mostrarToast(
        "¡Interés registrado! Pronto podrás contactar al usuario."
    );

}


/* =====================================================
   FILTRAR POR CATEGORÍA
===================================================== */

function filtrarCategoria(categoria) {

    const tarjetas =
        document.querySelectorAll(".product-card");


    const botones =
        document.querySelectorAll(".filter");


    /*
       Actualizar botones
    */

    botones.forEach(function(boton) {

        boton.classList.remove("active");

        if (
            boton.textContent.trim() === categoria
        ) {

            boton.classList.add("active");

        }

    });


    let cantidadVisible = 0;


    tarjetas.forEach(function(tarjeta) {

        const categoriaProducto =
            tarjeta.dataset.categoria;


        if (
            categoria === "Todos" ||
            categoriaProducto === categoria
        ) {

            tarjeta.style.display = "";

            cantidadVisible++;

        } else {

            tarjeta.style.display = "none";

        }

    });


    mostrarSinResultados(cantidadVisible);


    /*
       Si la categoría viene desde
       las tarjetas superiores,
       llevamos al usuario a explorar.
    */

    const explorar =
        document.getElementById("explorar");


    if (
        explorar &&
        window.scrollY < explorar.offsetTop - 200
    ) {

        explorar.scrollIntoView({
            behavior: "smooth"
        });

    }

}


/* =====================================================
   BUSCADOR
===================================================== */

function buscarObjetos() {

    const texto =
        document
            .getElementById("buscador")
            .value
            .toLowerCase()
            .trim();


    const tarjetas =
        document.querySelectorAll(".product-card");


    let cantidadVisible = 0;


    tarjetas.forEach(function(tarjeta) {

        const nombre =
            tarjeta.dataset.nombre.toLowerCase();


        const categoria =
            tarjeta.dataset.categoria.toLowerCase();


        if (
            nombre.includes(texto) ||
            categoria.includes(texto)
        ) {

            tarjeta.style.display = "";

            cantidadVisible++;

        } else {

            tarjeta.style.display = "none";

        }

    });


    mostrarSinResultados(cantidadVisible);


    /*
       Al buscar, quitamos el estado
       activo de los filtros.
    */

    if (texto !== "") {

        document
            .querySelectorAll(".filter")
            .forEach(function(boton) {

                boton.classList.remove("active");

            });

    } else {

        document
            .querySelector('.filter')
            .classList.add("active");

    }

}


/* =====================================================
   SIN RESULTADOS
===================================================== */

function mostrarSinResultados(cantidad) {

    const mensaje =
        document.getElementById("sin-resultados");


    if (cantidad === 0) {

        mensaje.style.display = "block";

    } else {

        mensaje.style.display = "none";

    }

}


/* =====================================================
   TOAST / MENSAJES
===================================================== */

let toastTimeout;


function mostrarToast(mensaje) {

    const toast =
        document.getElementById("toast");


    const texto =
        document.getElementById("toast-message");


    texto.textContent = mensaje;


    toast.classList.add("show");


    clearTimeout(toastTimeout);


    toastTimeout = setTimeout(function() {

        toast.classList.remove("show");

    }, 3500);

}


/* =====================================================
   SEGURIDAD BÁSICA PARA TEXTO INSERTADO
===================================================== */

function escaparHTML(texto) {

    return texto
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");

}


function escaparAtributo(texto) {

    return texto
        .replace(/\\/g, "\\\\")
        .replace(/'/g, "\\'");

}


/* =====================================================
   CERRAR MODALES CON ESC
===================================================== */

document.addEventListener("keydown", function(event) {

    if (event.key === "Escape") {

        cerrarModal();

        cerrarProducto();

    }

});


/* =====================================================
   ANIMACIÓN AL HACER SCROLL
===================================================== */

const observer =
    new IntersectionObserver(
        function(entries) {

            entries.forEach(function(entry) {

                if (entry.isIntersecting) {

                    entry.target.style.opacity = "1";

                    entry.target.style.transform =
                        "translateY(0)";

                }

            });

        },
        {
            threshold: 0.08
        }
    );


document
    .querySelectorAll(".product-card, .category-card, .step")
    .forEach(function(element) {

        element.style.opacity = "0";

        element.style.transform = "translateY(15px)";

        element.style.transition =
            "opacity .5s ease, transform .5s ease";

        observer.observe(element);

    });


/* =====================================================
   MENSAJE INICIAL
===================================================== */

console.log(
    "♻ Segunda Vida está funcionando correctamente."
);