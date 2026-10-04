/* ==========================================================
   TECNOSOLUCIONES
   GITHUB PAGES - SEMANA 15
   CRUD + LOCALSTORAGE
========================================================== */


/* ==========================================================
   DATOS INICIALES
========================================================== */

const productosIniciales = [
    {
        id: 1,
        nombre: "Taladro Eléctrico",
        categoria: "Herramientas",
        precio: 90.00,
        stock: 8
    },
    {
        id: 2,
        nombre: "Teclado Inalámbrico",
        categoria: "Accesorios",
        precio: 25.50,
        stock: 15
    }
];

const proveedoresIniciales = [
    {
        id: 1,
        nombre: "Proveedor Tecnológico",
        telefono: "0999999999",
        correo: "proveedor@gmail.com"
    },
    {
        id: 2,
        nombre: "Soluciones Digitales",
        telefono: "0988888888",
        correo: "ventas@soluciones.com"
    }
];

const clientesIniciales = [
    {
        id: 1,
        nombre: "Juan Pérez",
        correo: "juan@gmail.com",
        telefono: "0999999999"
    },
    {
        id: 2,
        nombre: "María González",
        correo: "maria.gonzalez@gmail.com",
        telefono: "0987654321"
    }
];

const usuariosIniciales = [];


/* ==========================================================
   FUNCIONES GENERALES
========================================================== */

function cargarDatos(clave, datosIniciales) {

    const datos = localStorage.getItem(clave);

    if (datos) {
        try {
            return JSON.parse(datos);
        } catch (error) {
            console.error("Error al leer:", clave);
        }
    }

    localStorage.setItem(
        clave,
        JSON.stringify(datosIniciales)
    );

    return [...datosIniciales];
}


function guardarDatos(clave, datos) {

    localStorage.setItem(
        clave,
        JSON.stringify(datos)
    );
}


/* ==========================================================
   PRODUCTOS
========================================================== */

let productos = cargarDatos(
    "tecnoSolucionesProductos",
    productosIniciales
);


function mostrarProductos() {

    const tabla =
        document.getElementById("tablaProductos");

    const contador =
        document.getElementById("contadorProductos");

    const contadorTabla =
        document.getElementById("contadorProductosTabla");

    const sinProductos =
        document.getElementById("sinProductos");

    if (!tabla) {
        return;
    }

    const busqueda =
        document
            .getElementById("busquedaProductos")
            ?.value
            .toLowerCase()
            .trim() || "";

    const filtrados =
        productos.filter(producto =>
            producto.nombre.toLowerCase().includes(busqueda) ||
            producto.categoria.toLowerCase().includes(busqueda)
        );

    tabla.innerHTML = "";

    filtrados.forEach(producto => {

        const fila =
            document.createElement("tr");

        fila.innerHTML = `
            <td>
                <strong>${producto.nombre}</strong>
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

                <button
                    class="btn btn-sm btn-primary me-1"
                    onclick="editarProducto(${producto.id})"
                    title="Editar"
                >
                    <i class="bi bi-pencil"></i>
                </button>

                <button
                    class="btn btn-sm btn-danger"
                    onclick="eliminarProducto(${producto.id})"
                    title="Eliminar"
                >
                    <i class="bi bi-trash"></i>
                </button>

            </td>
        `;

        tabla.appendChild(fila);

    });

    if (contador) {
        contador.textContent = productos.length;
    }

    if (contadorTabla) {
        contadorTabla.textContent = filtrados.length;
    }

    if (sinProductos) {

        if (filtrados.length === 0) {
            sinProductos.style.display = "block";
        } else {
            sinProductos.style.display = "none";
        }

    }
}


function guardarProducto(evento) {

    evento.preventDefault();

    const id =
        document.getElementById("idProducto").value;

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
            document.getElementById("precioProducto").value
        );

    const stock =
        parseInt(
            document.getElementById("stockProducto").value
        );


    if (
        nombre === "" ||
        categoria === "" ||
        isNaN(precio) ||
        isNaN(stock)
    ) {

        mostrarMensaje(
            "mensajeProducto",
            "Complete todos los campos correctamente.",
            "error"
        );

        return;
    }


    if (id) {

        const indice =
            productos.findIndex(
                producto => producto.id === Number(id)
            );

        if (indice !== -1) {

            productos[indice] = {
                id: Number(id),
                nombre,
                categoria,
                precio,
                stock
            };

        }

    } else {

        const nuevoId =
            productos.length > 0
                ? Math.max(
                    ...productos.map(producto => producto.id)
                ) + 1
                : 1;

        productos.push({
            id: nuevoId,
            nombre,
            categoria,
            precio,
            stock
        });

    }


    guardarDatos(
        "tecnoSolucionesProductos",
        productos
    );

    mostrarProductos();

    limpiarFormularioProducto();

    mostrarMensaje(
        "mensajeProducto",
        id
            ? "Producto actualizado correctamente."
            : "Producto registrado correctamente.",
        "exito"
    );
}


function editarProducto(id) {

    const producto =
        productos.find(
            item => item.id === id
        );

    if (!producto) {
        return;
    }

    document.getElementById("idProducto").value =
        producto.id;

    document.getElementById("nombreProducto").value =
        producto.nombre;

    document.getElementById("categoriaProducto").value =
        producto.categoria;

    document.getElementById("precioProducto").value =
        producto.precio;

    document.getElementById("stockProducto").value =
        producto.stock;


    const titulo =
        document.getElementById(
            "tituloFormularioProducto"
        );

    if (titulo) {
        titulo.textContent =
            "Editar producto";
    }

    const boton =
        document.getElementById(
            "botonGuardarProducto"
        );

    if (boton) {
        boton.innerHTML =
            '<i class="bi bi-save"></i> Actualizar producto';
    }

    document
        .getElementById("formProducto")
        ?.scrollIntoView({
            behavior: "smooth",
            block: "center"
        });
}


function eliminarProducto(id) {

    if (
        !confirm(
            "¿Está seguro de eliminar este producto?"
        )
    ) {
        return;
    }

    productos =
        productos.filter(
            producto => producto.id !== id
        );

    guardarDatos(
        "tecnoSolucionesProductos",
        productos
    );

    mostrarProductos();
}


function limpiarFormularioProducto() {

    const formulario =
        document.getElementById("formProducto");

    if (formulario) {
        formulario.reset();
    }

    document.getElementById("idProducto").value = "";

    const titulo =
        document.getElementById(
            "tituloFormularioProducto"
        );

    if (titulo) {
        titulo.textContent =
            "Nuevo producto";
    }

    const boton =
        document.getElementById(
            "botonGuardarProducto"
        );

    if (boton) {
        boton.innerHTML =
            '<i class="bi bi-save"></i> Guardar producto';
    }
}


/* ==========================================================
   PROVEEDORES
========================================================== */

let proveedores = cargarDatos(
    "tecnoSolucionesProveedores",
    proveedoresIniciales
);


function mostrarProveedores() {

    const tabla =
        document.getElementById("tablaProveedores");

    const contador =
        document.getElementById("contadorProveedores");

    if (!tabla) {
        return;
    }

    const busqueda =
        document
            .getElementById("busquedaProveedores")
            ?.value
            .toLowerCase()
            .trim() || "";

    const filtrados =
        proveedores.filter(proveedor =>
            proveedor.nombre.toLowerCase().includes(busqueda) ||
            proveedor.correo.toLowerCase().includes(busqueda)
        );

    tabla.innerHTML = "";

    filtrados.forEach(proveedor => {

        const fila =
            document.createElement("tr");

        fila.innerHTML = `
            <td>
                <strong>${proveedor.nombre}</strong>
            </td>

            <td>
                ${proveedor.telefono}
            </td>

            <td>
                ${proveedor.correo}
            </td>

            <td>

                <button
                    class="btn btn-sm btn-primary me-1"
                    onclick="editarProveedor(${proveedor.id})"
                >
                    <i class="bi bi-pencil"></i>
                </button>

                <button
                    class="btn btn-sm btn-danger"
                    onclick="eliminarProveedor(${proveedor.id})"
                >
                    <i class="bi bi-trash"></i>
                </button>

            </td>
        `;

        tabla.appendChild(fila);

    });

    if (contador) {
        contador.textContent = proveedores.length;
    }
}


function guardarProveedor(evento) {

    evento.preventDefault();

    const id =
        document.getElementById("idProveedor").value;

    const nombre =
        document
            .getElementById("nombreProveedor")
            .value
            .trim();

    const telefono =
        document
            .getElementById("telefonoProveedor")
            .value
            .trim();

    const correo =
        document
            .getElementById("correoProveedor")
            .value
            .trim();


    if (nombre === "") {

        mostrarMensaje(
            "mensajeProveedor",
            "Ingrese el nombre del proveedor.",
            "error"
        );

        return;
    }


    if (id) {

        const indice =
            proveedores.findIndex(
                proveedor =>
                    proveedor.id === Number(id)
            );

        if (indice !== -1) {

            proveedores[indice] = {
                id: Number(id),
                nombre,
                telefono,
                correo
            };

        }

    } else {

        const nuevoId =
            proveedores.length > 0
                ? Math.max(
                    ...proveedores.map(
                        proveedor => proveedor.id
                    )
                ) + 1
                : 1;

        proveedores.push({
            id: nuevoId,
            nombre,
            telefono,
            correo
        });

    }


    guardarDatos(
        "tecnoSolucionesProveedores",
        proveedores
    );

    mostrarProveedores();

    document
        .getElementById("formProveedor")
        ?.reset();

    document.getElementById("idProveedor").value = "";

    mostrarMensaje(
        "mensajeProveedor",
        id
            ? "Proveedor actualizado correctamente."
            : "Proveedor registrado correctamente.",
        "exito"
    );
}


function editarProveedor(id) {

    const proveedor =
        proveedores.find(
            item => item.id === id
        );

    if (!proveedor) {
        return;
    }

    document.getElementById("idProveedor").value =
        proveedor.id;

    document.getElementById("nombreProveedor").value =
        proveedor.nombre;

    document.getElementById("telefonoProveedor").value =
        proveedor.telefono;

    document.getElementById("correoProveedor").value =
        proveedor.correo;

}


function eliminarProveedor(id) {

    if (
        !confirm(
            "¿Está seguro de eliminar este proveedor?"
        )
    ) {
        return;
    }

    proveedores =
        proveedores.filter(
            proveedor => proveedor.id !== id
        );

    guardarDatos(
        "tecnoSolucionesProveedores",
        proveedores
    );

    mostrarProveedores();
}


/* ==========================================================
   CLIENTES
========================================================== */

let clientes = cargarDatos(
    "tecnoSolucionesClientes",
    clientesIniciales
);


function mostrarClientes() {

    const tabla =
        document.getElementById("tablaClientes");

    const contador =
        document.getElementById("contadorClientes");

    if (!tabla) {
        return;
    }

    const busqueda =
        document
            .getElementById("busquedaClientes")
            ?.value
            .toLowerCase()
            .trim() || "";

    const filtrados =
        clientes.filter(cliente =>
            cliente.nombre.toLowerCase().includes(busqueda) ||
            cliente.correo.toLowerCase().includes(busqueda)
        );

    tabla.innerHTML = "";

    filtrados.forEach(cliente => {

        const fila =
            document.createElement("tr");

        fila.innerHTML = `
            <td>
                <strong>${cliente.nombre}</strong>
            </td>

            <td>
                ${cliente.correo}
            </td>

            <td>
                ${cliente.telefono}
            </td>

            <td>

                <button
                    class="btn btn-sm btn-primary me-1"
                    onclick="editarCliente(${cliente.id})"
                >
                    <i class="bi bi-pencil"></i>
                </button>

                <button
                    class="btn btn-sm btn-danger"
                    onclick="eliminarCliente(${cliente.id})"
                >
                    <i class="bi bi-trash"></i>
                </button>

            </td>
        `;

        tabla.appendChild(fila);

    });

    if (contador) {
        contador.textContent = clientes.length;
    }
}


function guardarCliente(evento) {

    evento.preventDefault();

    const id =
        document.getElementById("idCliente").value;

    const nombre =
        document
            .getElementById("nombreCliente")
            .value
            .trim();

    const correo =
        document
            .getElementById("correoCliente")
            .value
            .trim();

    const telefono =
        document
            .getElementById("telefonoCliente")
            .value
            .trim();


    if (nombre === "") {

        mostrarMensaje(
            "mensajeCliente",
            "Ingrese el nombre del cliente.",
            "error"
        );

        return;
    }


    if (id) {

        const indice =
            clientes.findIndex(
                cliente =>
                    cliente.id === Number(id)
            );

        if (indice !== -1) {

            clientes[indice] = {
                id: Number(id),
                nombre,
                correo,
                telefono
            };

        }

    } else {

        const nuevoId =
            clientes.length > 0
                ? Math.max(
                    ...clientes.map(
                        cliente => cliente.id
                    )
                ) + 1
                : 1;

        clientes.push({
            id: nuevoId,
            nombre,
            correo,
            telefono
        });

    }


    guardarDatos(
        "tecnoSolucionesClientes",
        clientes
    );

    mostrarClientes();

    document
        .getElementById("formCliente")
        ?.reset();

    document.getElementById("idCliente").value = "";

    mostrarMensaje(
        "mensajeCliente",
        id
            ? "Cliente actualizado correctamente."
            : "Cliente registrado correctamente.",
        "exito"
    );
}


function editarCliente(id) {

    const cliente =
        clientes.find(
            item => item.id === id
        );

    if (!cliente) {
        return;
    }

    document.getElementById("idCliente").value =
        cliente.id;

    document.getElementById("nombreCliente").value =
        cliente.nombre;

    document.getElementById("correoCliente").value =
        cliente.correo;

    document.getElementById("telefonoCliente").value =
        cliente.telefono;
}


function eliminarCliente(id) {

    if (
        !confirm(
            "¿Está seguro de eliminar este cliente?"
        )
    ) {
        return;
    }

    clientes =
        clientes.filter(
            cliente => cliente.id !== id
        );

    guardarDatos(
        "tecnoSolucionesClientes",
        clientes
    );

    mostrarClientes();
}


/* ==========================================================
   CONSULTA RELACIONADA
========================================================== */

function ejecutarConsultaRelacionada() {

    const tabla =
        document.getElementById(
            "tablaRelaciones"
        );

    const contador =
        document.getElementById(
            "contadorRelaciones"
        );

    const sinRelaciones =
        document.getElementById(
            "sinRelaciones"
        );

    if (!tabla) {
        return;
    }

    tabla.innerHTML = "";

    const cantidad =
        Math.min(
            productos.length,
            proveedores.length,
            clientes.length
        );

    for (
        let i = 0;
        i < cantidad;
        i++
    ) {

        const fila =
            document.createElement("tr");

        fila.innerHTML = `
            <td>
                ${productos[i].nombre}
            </td>

            <td>
                ${proveedores[i].nombre}
            </td>

            <td>
                ${clientes[i].nombre}
            </td>
        `;

        tabla.appendChild(fila);
    }

    if (contador) {
        contador.textContent = cantidad;
    }

    if (sinRelaciones) {

        sinRelaciones.style.display =
            cantidad === 0
                ? "block"
                : "none";
    }
}


/* ==========================================================
   USUARIOS
========================================================== */

let usuarios = cargarDatos(
    "tecnoSolucionesUsuarios",
    usuariosIniciales
);


function registrarUsuario(evento) {

    evento.preventDefault();

    const usuario =
        document
            .getElementById("usuarioRegistro")
            .value
            .trim();

    const password =
        document
            .getElementById("passwordRegistro")
            .value;


    if (
        usuario === "" ||
        password === ""
    ) {

        mostrarMensaje(
            "mensajeRegistro",
            "Complete usuario y contraseña.",
            "error"
        );

        return;
    }


    const existe =
        usuarios.some(
            item =>
                item.usuario.toLowerCase() ===
                usuario.toLowerCase()
        );

    if (existe) {

        mostrarMensaje(
            "mensajeRegistro",
            "El usuario ya existe.",
            "error"
        );

        return;
    }


    usuarios.push({
        id:
            usuarios.length > 0
                ? Math.max(
                    ...usuarios.map(
                        item => item.id
                    )
                ) + 1
                : 1,

        usuario,
        password
    });


    guardarDatos(
        "tecnoSolucionesUsuarios",
        usuarios
    );


    document
        .getElementById("formRegistro")
        ?.reset();


    mostrarMensaje(
        "mensajeRegistro",
        "Usuario registrado correctamente.",
        "exito"
    );
}


function iniciarSesion(evento) {

    evento.preventDefault();

    const usuario =
        document
            .getElementById("usuarioLogin")
            .value
            .trim();

    const password =
        document
            .getElementById("passwordLogin")
            .value;


    const encontrado =
        usuarios.find(
            item =>
                item.usuario === usuario &&
                item.password === password
        );


    if (!encontrado) {

        mostrarMensaje(
            "mensajeLogin",
            "Usuario o contraseña incorrectos.",
            "error"
        );

        return;
    }


    localStorage.setItem(
        "tecnoSolucionesSesion",
        JSON.stringify(encontrado)
    );


    actualizarSesion();

    document
        .getElementById("formLogin")
        ?.reset();


    mostrarMensaje(
        "mensajeLogin",
        "Inicio de sesión correcto.",
        "exito"
    );
}


function actualizarSesion() {

    const usuarioActual =
        document.getElementById(
            "nombreUsuarioActual"
        );

    const sesion =
        localStorage.getItem(
            "tecnoSolucionesSesion"
        );

    if (!usuarioActual) {
        return;
    }

    if (sesion) {

        const usuario =
            JSON.parse(sesion);

        usuarioActual.textContent =
            usuario.usuario;

    } else {

        usuarioActual.textContent =
            "No hay sesión";
    }
}


function cerrarSesion() {

    localStorage.removeItem(
        "tecnoSolucionesSesion"
    );

    actualizarSesion();
}


/* ==========================================================
   CONTACTO
========================================================== */

function configurarFormularioContacto() {

    const formulario =
        document.getElementById(
            "formServicio"
        );

    if (!formulario) {
        return;
    }

    formulario.addEventListener(
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


            const mensaje =
                document.getElementById(
                    "mensajeContacto"
                );


            if (
                nombre === "" ||
                correo === "" ||
                servicio === "" ||
                detalle === ""
            ) {

                mostrarMensaje(
                    "mensajeContacto",
                    "Complete todos los campos.",
                    "error"
                );

                return;
            }


            const solicitudes =
                cargarDatos(
                    "tecnoSolucionesSolicitudes",
                    []
                );


            solicitudes.push({
                id:
                    solicitudes.length > 0
                        ? Math.max(
                            ...solicitudes.map(
                                item => item.id
                            )
                        ) + 1
                        : 1,

                nombre,
                correo,
                servicio,
                detalle,
                fecha:
                    new Date().toLocaleDateString(
                        "es-EC"
                    )
            });


            guardarDatos(
                "tecnoSolucionesSolicitudes",
                solicitudes
            );


            formulario.reset();


            mostrarMensaje(
                "mensajeContacto",
                "Solicitud enviada correctamente.",
                "exito"
            );

        }
    );
}


/* ==========================================================
   MENSAJES
========================================================== */

function mostrarMensaje(
    elementoId,
    texto,
    tipo
) {

    const elemento =
        document.getElementById(
            elementoId
        );

    if (!elemento) {
        return;
    }

    elemento.innerHTML = `
        <div class="mensaje-${tipo}">
            <i class="bi ${
                tipo === "exito"
                    ? "bi-check-circle-fill"
                    : "bi-exclamation-triangle-fill"
            }"></i>
            ${texto}
        </div>
    `;

    setTimeout(
        () => {
            elemento.innerHTML = "";
        },
        4000
    );
}


/* ==========================================================
   INICIALIZAR
========================================================== */

document.addEventListener(
    "DOMContentLoaded",
    function() {

        mostrarProductos();

        mostrarProveedores();

        mostrarClientes();

        actualizarSesion();

        configurarFormularioContacto();


        /* PRODUCTOS */

        document
            .getElementById("formProducto")
            ?.addEventListener(
                "submit",
                guardarProducto
            );

        document
            .getElementById(
                "botonCancelarEdicion"
            )
            ?.addEventListener(
                "click",
                limpiarFormularioProducto
            );

        document
            .getElementById(
                "busquedaProductos"
            )
            ?.addEventListener(
                "input",
                mostrarProductos
            );


        /* PROVEEDORES */

        document
            .getElementById("formProveedor")
            ?.addEventListener(
                "submit",
                guardarProveedor
            );

        document
            .getElementById(
                "botonCancelarProveedor"
            )
            ?.addEventListener(
                "click",
                function() {

                    document
                        .getElementById(
                            "formProveedor"
                        )
                        ?.reset();

                    document
                        .getElementById(
                            "idProveedor"
                        ).value = "";
                }
            );

        document
            .getElementById(
                "busquedaProveedores"
            )
            ?.addEventListener(
                "input",
                mostrarProveedores
            );


        /* CLIENTES */

        document
            .getElementById("formCliente")
            ?.addEventListener(
                "submit",
                guardarCliente
            );

        document
            .getElementById(
                "botonCancelarCliente"
            )
            ?.addEventListener(
                "click",
                function() {

                    document
                        .getElementById(
                            "formCliente"
                        )
                        ?.reset();

                    document
                        .getElementById(
                            "idCliente"
                        ).value = "";
                }
            );

        document
            .getElementById(
                "busquedaClientes"
            )
            ?.addEventListener(
                "input",
                mostrarClientes
            );


        /* CONSULTA RELACIONADA */

        document
            .getElementById(
                "botonConsultaRelacionada"
            )
            ?.addEventListener(
                "click",
                ejecutarConsultaRelacionada
            );


        /* USUARIOS */

        document
            .getElementById("formRegistro")
            ?.addEventListener(
                "submit",
                registrarUsuario
            );

        document
            .getElementById("formLogin")
            ?.addEventListener(
                "submit",
                iniciarSesion
            );

        document
            .getElementById(
                "botonCerrarSesion"
            )
            ?.addEventListener(
                "click",
                cerrarSesion
            );

    }
);