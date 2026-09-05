```javascript
// ==========================================================
// TECNOSOLUCIONES
// SEMANA 12 - PERSISTENCIA DE DATOS
// ==========================================================


// ==========================================================
// SERVICIOS DE TECNOSOLUCIONES
// ==========================================================

const servicios = [

    {
        nombre: "Desarrollo Web",
        descripcion:
            "Diseñamos sitios web modernos, funcionales y adaptables a diferentes dispositivos.",
        color: "primary"
    },

    {
        nombre: "Soporte Técnico",
        descripcion:
            "Ofrecemos mantenimiento preventivo y correctivo para equipos informáticos.",
        color: "success"
    },

    {
        nombre: "Capacitación",
        descripcion:
            "Realizamos cursos y asesorías sobre herramientas digitales y tecnología.",
        color: "warning"
    },

    {
        nombre: "Consultoría",
        descripcion:
            "Brindamos asesoramiento tecnológico para empresas y emprendedores.",
        color: "info"
    }

];


// ==========================================================
// MOSTRAR SERVICIOS
// ==========================================================

function mostrarServicios() {

    const contenedorServicios =
        document.getElementById("contenedorServicios");

    if (!contenedorServicios) {
        return;
    }

    contenedorServicios.innerHTML = "";

    servicios.forEach(function(servicio) {

        contenedorServicios.innerHTML += `

            <div class="col-md-6 col-lg-3">

                <div class="card shadow h-100">

                    <div class="card-body text-center">

                        <h5 class="card-title">
                            ${servicio.nombre}
                        </h5>

                        <p class="card-text">
                            ${servicio.descripcion}
                        </p>

                        <button
                            class="btn btn-${servicio.color}"
                            onclick="mostrarDetalle(
                                '${servicio.nombre}',
                                '${servicio.descripcion}'
                            )">

                            Ver detalles

                        </button>

                    </div>

                </div>

            </div>

        `;

    });

}


// ==========================================================
// MOSTRAR DETALLE DEL SERVICIO
// ==========================================================

function mostrarDetalle(nombre, descripcion) {

    alert(
        nombre +
        "\n\n" +
        descripcion
    );

}


// ==========================================================
// SEMANA 12
// PERSISTENCIA DE PRODUCTOS
// ==========================================================


// Recuperar productos guardados
let productos =
    JSON.parse(
        localStorage.getItem(
            "tecnoSolucionesProductos"
        )
    ) || [];


// ==========================================================
// ELEMENTOS DEL HTML
// ==========================================================

const formularioProducto =
    document.getElementById("formProducto");

const tablaProductos =
    document.getElementById("tablaProductos");

const contadorProductos =
    document.getElementById("contadorProductos");

const mensajeProducto =
    document.getElementById("mensajeProducto");

const sinProductos =
    document.getElementById("sinProductos");


// ==========================================================
// MOSTRAR PRODUCTOS
// ==========================================================

function mostrarProductos() {

    if (!tablaProductos) {
        return;
    }

    tablaProductos.innerHTML = "";

    if (contadorProductos) {

        contadorProductos.textContent =
            productos.length;

    }


    // Si no existen productos
    if (productos.length === 0) {

        if (sinProductos) {

            sinProductos.style.display =
                "block";

        }

        return;
    }


    if (sinProductos) {

        sinProductos.style.display =
            "none";

    }


    // Recorrer productos
    productos.forEach(function(producto) {

        const estado =
            producto.stock > 0
                ? "Disponible"
                : "Agotado";


        const claseEstado =
            producto.stock > 0
                ? "success"
                : "danger";


        tablaProductos.innerHTML += `

            <tr>

                <td>
                    ${producto.id}
                </td>

                <td>
                    ${producto.nombre}
                </td>

                <td>
                    ${producto.categoria}
                </td>

                <td>
                    $${Number(producto.precio).toFixed(2)}
                </td>

                <td>
                    ${producto.stock}
                </td>

                <td>

                    <span class="badge bg-${claseEstado}">
                        ${estado}
                    </span>

                </td>

                <td>

                    <button
                        type="button"
                        class="btn btn-danger btn-sm"
                        onclick="eliminarProducto(${producto.id})">

                        Eliminar

                    </button>

                </td>

            </tr>

        `;

    });

}


// ==========================================================
// REGISTRAR PRODUCTO
// ==========================================================

if (formularioProducto) {

    formularioProducto.addEventListener(
        "submit",
        function(evento) {

            evento.preventDefault();


            // Obtener datos
            const nombre =
                document
                    .getElementById("nombreProducto")
                    .value
                    .trim();


            const categoria =
                document
                    .getElementById("categoriaProducto")
                    .value
                    .trim();


            const precio =
                parseFloat(
                    document
                        .getElementById("precioProducto")
                        .value
                );


            const stock =
                parseInt(
                    document
                        .getElementById("stockProducto")
                        .value
                );


            // ==================================================
            // VALIDACIONES
            // ==================================================

            if (
                nombre === "" ||
                categoria === "" ||
                isNaN(precio) ||
                isNaN(stock)
            ) {

                mostrarMensajeProducto(
                    "Complete todos los campos.",
                    "danger"
                );

                return;
            }


            if (precio < 0) {

                mostrarMensajeProducto(
                    "El precio no puede ser negativo.",
                    "danger"
                );

                return;
            }


            if (stock < 0) {

                mostrarMensajeProducto(
                    "El stock no puede ser negativo.",
                    "danger"
                );

                return;
            }


            // ==================================================
            // GENERAR ID
            // ==================================================

            let nuevoId = 1;


            if (productos.length > 0) {

                nuevoId =
                    Math.max(
                        ...productos.map(
                            function(producto) {
                                return producto.id;
                            }
                        )
                    ) + 1;

            }


            // ==================================================
            // CREAR PRODUCTO
            // ==================================================

            const nuevoProducto = {

                id: nuevoId,

                nombre: nombre,

                categoria: categoria,

                precio: precio,

                stock: stock

            };


            // ==================================================
            // AGREGAR PRODUCTO
            // ==================================================

            productos.push(nuevoProducto);


            // ==================================================
            // GUARDAR EN LOCALSTORAGE
            // ==================================================

            localStorage.setItem(

                "tecnoSolucionesProductos",

                JSON.stringify(productos)

            );


            // ==================================================
            // ACTUALIZAR TABLA
            // ==================================================

            mostrarProductos();


            // Limpiar formulario
            formularioProducto.reset();


            // Mostrar mensaje
            mostrarMensajeProducto(

                "Producto registrado correctamente.",

                "success"

            );

        }
    );

}


// ==========================================================
// ELIMINAR PRODUCTO
// ==========================================================

function eliminarProducto(id) {

    const confirmar =
        confirm(
            "¿Está seguro de eliminar este producto?"
        );


    if (!confirmar) {
        return;
    }


    // Eliminar producto
    productos =
        productos.filter(
            function(producto) {

                return producto.id !== id;

            }
        );


    // Actualizar localStorage
    localStorage.setItem(

        "tecnoSolucionesProductos",

        JSON.stringify(productos)

    );


    // Actualizar tabla
    mostrarProductos();


    mostrarMensajeProducto(

        "Producto eliminado correctamente.",

        "warning"

    );

}


// ==========================================================
// MOSTRAR MENSAJES DE PRODUCTOS
// ==========================================================

function mostrarMensajeProducto(
    texto,
    tipo
) {

    if (!mensajeProducto) {
        return;
    }


    mensajeProducto.innerHTML = `

        <div
            class="alert alert-${tipo}"
            role="alert">

            ${texto}

        </div>

    `;


    setTimeout(
        function() {

            mensajeProducto.innerHTML = "";

        },
        3000
    );

}


// ==========================================================
// FORMULARIO DE CONTACTO
// ==========================================================

const formularioServicio =
    document.getElementById("formServicio");

const mensajeContacto =
    document.getElementById("mensajeContacto");


if (formularioServicio) {

    formularioServicio.addEventListener(
        "submit",
        function(evento) {

            evento.preventDefault();


            const nombre =
                document
                    .getElementById("nombre")
                    .value
                    .trim();


            const correo =
                document
                    .getElementById("correo")
                    .value
                    .trim();


            const servicio =
                document
                    .getElementById("servicio")
                    .value;


            const detalle =
                document
                    .getElementById("detalleSolicitud")
                    .value
                    .trim();


            if (
                nombre === "" ||
                correo === "" ||
                servicio === "" ||
                detalle === ""
            ) {

                if (mensajeContacto) {

                    mensajeContacto.innerHTML = `

                        <div class="alert alert-danger">

                            Complete todos los campos
                            del formulario.

                        </div>

                    `;

                }

                return;
            }


            if (mensajeContacto) {

                mensajeContacto.innerHTML = `

                    <div class="alert alert-success">

                        <strong>Solicitud enviada correctamente.</strong>

                        <br>

                        Gracias ${nombre}.
                        Hemos recibido su solicitud
                        de ${servicio}.

                    </div>

                `;

            }


            formularioServicio.reset();

        }
    );

}


// ==========================================================
// INICIALIZACIÓN
// ==========================================================

mostrarServicios();

mostrarProductos();
```


