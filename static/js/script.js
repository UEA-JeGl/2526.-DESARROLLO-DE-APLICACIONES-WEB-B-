```javascript
// ==========================================================
// TECNOSOLUCIONES
// SEMANA 15 - CRUD
// GitHub Pages - Persistencia con localStorage
// ==========================================================


// ==========================================================
// FUNCIONES GENERALES
// ==========================================================

function obtenerDatos(clave) {
    try {
        return JSON.parse(localStorage.getItem(clave)) || [];
    } catch (error) {
        console.error("Error al obtener datos:", error);
        return [];
    }
}

function guardarDatos(clave, datos) {
    localStorage.setItem(clave, JSON.stringify(datos));
}

function escaparHTML(texto) {
    if (texto === null || texto === undefined) {
        return "";
    }

    return String(texto)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}

function mostrarMensaje(elemento, mensaje, tipo = "success") {
    if (!elemento) return;

    elemento.innerHTML = `
        <div class="alert alert-${tipo} mt-3">
            ${escaparHTML(mensaje)}
        </div>
    `;

    setTimeout(() => {
        elemento.innerHTML = "";
    }, 3000);
}


// ==========================================================
// SERVICIOS
// ==========================================================

const servicios = [
    {
        nombre: "Desarrollo Web",
        descripcion:
            "Diseñamos sitios web modernos, funcionales y adaptables a diferentes dispositivos.",
        icono: "bi-code-slash"
    },
    {
        nombre: "Soporte Técnico",
        descripcion:
            "Brindamos asistencia para resolver problemas de hardware, software y sistemas.",
        icono: "bi-tools"
    },
    {
        nombre: "Capacitación",
        descripcion:
            "Ofrecemos capacitación en herramientas tecnológicas y desarrollo de aplicaciones.",
        icono: "bi-mortarboard"
    },
    {
        nombre: "Consultoría Tecnológica",
        descripcion:
            "Asesoramos en la implementación y mejora de soluciones tecnológicas.",
        icono: "bi-lightbulb"
    }
];

function mostrarServicios() {
    const contenedor = document.getElementById("contenedorServicios");

    if (!contenedor) return;

    contenedor.innerHTML = "";

    servicios.forEach((servicio) => {
        contenedor.innerHTML += `
            <div class="col-md-6 col-lg-3 mb-4">
                <div class="card h-100 shadow-sm border-0">
                    <div class="card-body text-center">
                        <i class="bi ${servicio.icono} fs-1 text-primary"></i>

                        <h5 class="card-title mt-3">
                            ${escaparHTML(servicio.nombre)}
                        </h5>

                        <p class="card-text">
                            ${escaparHTML(servicio.descripcion)}
                        </p>
                    </div>
                </div>
            </div>
        `;
    });
}


// ==========================================================
// PRODUCTOS
// ==========================================================

function obtenerProductos() {
    return obtenerDatos("tecnoSolucionesProductos");
}

function guardarProductos(productos) {
    guardarDatos("tecnoSolucionesProductos", productos);
}

function mostrarProductos() {
    const tabla = document.getElementById("tablaProductos");
    const sinProductos = document.getElementById("sinProductos");
    const contador = document.getElementById("contadorProductosTabla");
    const busqueda = document.getElementById("busquedaProductos");

    if (!tabla) return;

    const productos = obtenerProductos();

    const textoBusqueda = busqueda
        ? busqueda.value.toLowerCase().trim()
        : "";

    const productosFiltrados = productos.filter((producto) => {
        return (
            String(producto.nombre || "").toLowerCase().includes(textoBusqueda) ||
            String(producto.categoria || "").toLowerCase().includes(textoBusqueda)
        );
    });

    tabla.innerHTML = "";

    if (contador) {
        contador.textContent = productosFiltrados.length;
    }

    if (productosFiltrados.length === 0) {
        if (sinProductos) {
            sinProductos.style.display = "block";
        }

        return;
    }

    if (sinProductos) {
        sinProductos.style.display = "none";
    }

    productosFiltrados.forEach((producto) => {
        const disponible = Number(producto.stock) > 0;

        tabla.innerHTML += `
            <tr>
                <td>${producto.id}</td>

                <td>
                    ${escaparHTML(producto.nombre)}
                </td>

                <td>
                    ${escaparHTML(producto.categoria)}
                </td>

                <td>
                    $${Number(producto.precio).toFixed(2)}
                </td>

                <td>
                    ${producto.stock}
                </td>

                <td>
                    <span class="badge ${
                        disponible
                            ? "bg-success"
                            : "bg-danger"
                    }">
                        ${
                            disponible
                                ? "Disponible"
                                : "Agotado"
                        }
                    </span>
                </td>

                <td>
                    <button
                        type="button"
                        class="btn btn-warning btn-sm me-1"
                        onclick="editarProducto(${producto.id})">
                        <i class="bi bi-pencil"></i>
                        Editar
                    </button>

                    <button
                        type="button"
                        class="btn btn-danger btn-sm"
                        onclick="eliminarProducto(${producto.id})">
                        <i class="bi bi-trash"></i>
                        Eliminar
                    </button>
                </td>
            </tr>
        `;
    });
}

function editarProducto(id) {
    const productos = obtenerProductos();

    const producto = productos.find(
        (item) => Number(item.id) === Number(id)
    );

    if (!producto) return;

    const idProducto = document.getElementById("idProducto");
    const nombre = document.getElementById("nombreProducto");
    const categoria = document.getElementById("categoriaProducto");
    const precio = document.getElementById("precioProducto");
    const stock = document.getElementById("stockProducto");
    const titulo = document.getElementById("tituloFormularioProducto");
    const boton = document.getElementById("botonGuardarProducto");
    const cancelar = document.getElementById("botonCancelarEdicion");

    if (idProducto) idProducto.value = producto.id;
    if (nombre) nombre.value = producto.nombre;
    if (categoria) categoria.value = producto.categoria;
    if (precio) precio.value = producto.precio;
    if (stock) stock.value = producto.stock;

    if (titulo) {
        titulo.textContent = "Editar producto";
    }

    if (boton) {
        boton.innerHTML = `
            <i class="bi bi-check-circle"></i>
            Actualizar producto
        `;
    }

    if (cancelar) {
        cancelar.style.display = "inline-block";
    }

    document
        .getElementById("formProducto")
        ?.scrollIntoView({
            behavior: "smooth",
            block: "center"
        });
}

function limpiarFormularioProducto() {
    const formulario = document.getElementById("formProducto");

    if (formulario) {
        formulario.reset();
    }

    const idProducto = document.getElementById("idProducto");
    const titulo = document.getElementById("tituloFormularioProducto");
    const boton = document.getElementById("botonGuardarProducto");
    const cancelar = document.getElementById("botonCancelarEdicion");

    if (idProducto) idProducto.value = "";

    if (titulo) {
        titulo.textContent = "Agregar producto";
    }

    if (boton) {
        boton.innerHTML = `
            <i class="bi bi-save"></i>
            Guardar producto
        `;
    }

    if (cancelar) {
        cancelar.style.display = "none";
    }
}

function eliminarProducto(id) {
    const productos = obtenerProductos();

    const producto = productos.find(
        (item) => Number(item.id) === Number(id)
    );

    if (!producto) return;

    const confirmar = confirm(
        `¿Deseas eliminar el producto "${producto.nombre}"?`
    );

    if (!confirmar) return;

    const nuevosProductos = productos.filter(
        (item) => Number(item.id) !== Number(id)
    );

    guardarProductos(nuevosProductos);

    mostrarProductos();
    mostrarConsultaRelacionada();
    actualizarContadores();
}


// ==========================================================
// PROVEEDORES
// ==========================================================

function obtenerProveedores() {
    return obtenerDatos("tecnoSolucionesProveedores");
}

function guardarProveedores(proveedores) {
    guardarDatos("tecnoSolucionesProveedores", proveedores);
}

function mostrarProveedores() {
    const tabla = document.getElementById("tablaProveedores");
    const busqueda = document.getElementById("busquedaProveedores");

    if (!tabla) return;

    const proveedores = obtenerProveedores();

    const textoBusqueda = busqueda
        ? busqueda.value.toLowerCase().trim()
        : "";

    const filtrados = proveedores.filter((proveedor) => {
        return (
            String(proveedor.nombre || "")
                .toLowerCase()
                .includes(textoBusqueda) ||

            String(proveedor.telefono || "")
                .toLowerCase()
                .includes(textoBusqueda) ||

            String(proveedor.correo || "")
                .toLowerCase()
                .includes(textoBusqueda)
        );
    });

    tabla.innerHTML = "";

    if (filtrados.length === 0) {
        tabla.innerHTML = `
            <tr>
                <td colspan="5" class="text-center text-muted">
                    No hay proveedores registrados.
                </td>
            </tr>
        `;

        return;
    }

    filtrados.forEach((proveedor) => {
        tabla.innerHTML += `
            <tr>
                <td>${proveedor.id}</td>

                <td>
                    ${escaparHTML(proveedor.nombre)}
                </td>

                <td>
                    ${escaparHTML(proveedor.telefono)}
                </td>

                <td>
                    ${escaparHTML(proveedor.correo)}
                </td>

                <td>
                    <button
                        type="button"
                        class="btn btn-warning btn-sm me-1"
                        onclick="editarProveedor(${proveedor.id})">
                        <i class="bi bi-pencil"></i>
                        Editar
                    </button>

                    <button
                        type="button"
                        class="btn btn-danger btn-sm"
                        onclick="eliminarProveedor(${proveedor.id})">
                        <i class="bi bi-trash"></i>
                        Eliminar
                    </button>
                </td>
            </tr>
        `;
    });
}

function editarProveedor(id) {
    const proveedores = obtenerProveedores();

    const proveedor = proveedores.find(
        (item) => Number(item.id) === Number(id)
    );

    if (!proveedor) return;

    document.getElementById("idProveedor").value = proveedor.id;
    document.getElementById("nombreProveedor").value = proveedor.nombre;
    document.getElementById("telefonoProveedor").value = proveedor.telefono;
    document.getElementById("correoProveedor").value = proveedor.correo;

    const boton = document.getElementById("botonGuardarProveedor");
    const cancelar = document.getElementById("botonCancelarProveedor");

    if (boton) {
        boton.innerHTML = `
            <i class="bi bi-check-circle"></i>
            Actualizar proveedor
        `;
    }

    if (cancelar) {
        cancelar.style.display = "inline-block";
    }

    document
        .getElementById("formProveedor")
        ?.scrollIntoView({
            behavior: "smooth",
            block: "center"
        });
}

function limpiarFormularioProveedor() {
    const formulario = document.getElementById("formProveedor");

    if (formulario) {
        formulario.reset();
    }

    const idProveedor = document.getElementById("idProveedor");
    const boton = document.getElementById("botonGuardarProveedor");
    const cancelar = document.getElementById("botonCancelarProveedor");

    if (idProveedor) idProveedor.value = "";

    if (boton) {
        boton.innerHTML = `
            <i class="bi bi-save"></i>
            Guardar proveedor
        `;
    }

    if (cancelar) {
        cancelar.style.display = "none";
    }
}

function eliminarProveedor(id) {
    const proveedores = obtenerProveedores();

    const proveedor = proveedores.find(
        (item) => Number(item.id) === Number(id)
    );

    if (!proveedor) return;

    const confirmar = confirm(
        `¿Deseas eliminar el proveedor "${proveedor.nombre}"?`
    );

    if (!confirmar) return;

    const nuevosProveedores = proveedores.filter(
        (item) => Number(item.id) !== Number(id)
    );

    guardarProveedores(nuevosProveedores);

    mostrarProveedores();
    mostrarConsultaRelacionada();
    actualizarContadores();
}


// ==========================================================
// CLIENTES
// ==========================================================

function obtenerClientes() {
    return obtenerDatos("tecnoSolucionesClientes");
}

function guardarClientes(clientes) {
    guardarDatos("tecnoSolucionesClientes", clientes);
}

function mostrarClientes() {
    const tabla = document.getElementById("tablaClientes");
    const busqueda = document.getElementById("busquedaClientes");

    if (!tabla) return;

    const clientes = obtenerClientes();

    const textoBusqueda = busqueda
        ? busqueda.value.toLowerCase().trim()
        : "";

    const filtrados = clientes.filter((cliente) => {
        return (
            String(cliente.nombre || "")
                .toLowerCase()
                .includes(textoBusqueda) ||

            String(cliente.correo || "")
                .toLowerCase()
                .includes(textoBusqueda) ||

            String(cliente.telefono || "")
                .toLowerCase()
                .includes(textoBusqueda)
        );
    });

    tabla.innerHTML = "";

    if (filtrados.length === 0) {
        tabla.innerHTML = `
            <tr>
                <td colspan="5" class="text-center text-muted">
                    No hay clientes registrados.
                </td>
            </tr>
        `;

        return;
    }

    filtrados.forEach((cliente) => {
        tabla.innerHTML += `
            <tr>
                <td>${cliente.id}</td>

                <td>
                    ${escaparHTML(cliente.nombre)}
                </td>

                <td>
                    ${escaparHTML(cliente.correo)}
                </td>

                <td>
                    ${escaparHTML(cliente.telefono)}
                </td>

                <td>
                    <button
                        type="button"
                        class="btn btn-warning btn-sm me-1"
                        onclick="editarCliente(${cliente.id})">
                        <i class="bi bi-pencil"></i>
                        Editar
                    </button>

                    <button
                        type="button"
                        class="btn btn-danger btn-sm"
                        onclick="eliminarCliente(${cliente.id})">
                        <i class="bi bi-trash"></i>
                        Eliminar
                    </button>
                </td>
            </tr>
        `;
    });
}

function editarCliente(id) {
    const clientes = obtenerClientes();

    const cliente = clientes.find(
        (item) => Number(item.id) === Number(id)
    );

    if (!cliente) return;

    document.getElementById("idCliente").value = cliente.id;
    document.getElementById("nombreCliente").value = cliente.nombre;
    document.getElementById("correoCliente").value = cliente.correo;
    document.getElementById("telefonoCliente").value = cliente.telefono;

    const boton = document.getElementById("botonGuardarCliente");
    const cancelar = document.getElementById("botonCancelarCliente");

    if (boton) {
        boton.innerHTML = `
            <i class="bi bi-check-circle"></i>
            Actualizar cliente
        `;
    }

    if (cancelar) {
        cancelar.style.display = "inline-block";
    }

    document
        .getElementById("formCliente")
        ?.scrollIntoView({
            behavior: "smooth",
            block: "center"
        });
}

function limpiarFormularioCliente() {
    const formulario = document.getElementById("formCliente");

    if (formulario) {
        formulario.reset();
    }

    const idCliente = document.getElementById("idCliente");
    const boton = document.getElementById("botonGuardarCliente");
    const cancelar = document.getElementById("botonCancelarCliente");

    if (idCliente) idCliente.value = "";

    if (boton) {
        boton.innerHTML = `
            <i class="bi bi-save"></i>
            Guardar cliente
        `;
    }

    if (cancelar) {
        cancelar.style.display = "none";
    }
}

function eliminarCliente(id) {
    const clientes = obtenerClientes();

    const cliente = clientes.find(
        (item) => Number(item.id) === Number(id)
    );

    if (!cliente) return;

    const confirmar = confirm(
        `¿Deseas eliminar el cliente "${cliente.nombre}"?`
    );

    if (!confirmar) return;

    const nuevosClientes = clientes.filter(
        (item) => Number(item.id) !== Number(id)
    );

    guardarClientes(nuevosClientes);

    mostrarClientes();
    mostrarConsultaRelacionada();
    actualizarContadores();
}


// ==========================================================
// FORMULARIO DE PRODUCTOS
// ==========================================================

document
    .getElementById("formProducto")
    ?.addEventListener("submit", function (evento) {

        evento.preventDefault();

        const id = document.getElementById("idProducto").value;
        const nombre = document.getElementById("nombreProducto").value.trim();
        const categoria = document.getElementById("categoriaProducto").value.trim();
        const precio = Number(document.getElementById("precioProducto").value);
        const stock = Number(document.getElementById("stockProducto").value);

        if (!nombre || !categoria) {
            alert("Complete todos los campos obligatorios.");
            return;
        }

        if (precio < 0 || Number.isNaN(precio)) {
            alert("Ingrese un precio válido.");
            return;
        }

        if (stock < 0 || Number.isNaN(stock)) {
            alert("Ingrese un stock válido.");
            return;
        }

        const productos = obtenerProductos();

        if (id) {

            const indice = productos.findIndex(
                (producto) =>
                    Number(producto.id) === Number(id)
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

            const nuevoProducto = {
                id:
                    productos.length > 0
                        ? Math.max(
                            ...productos.map(
                                (producto) => Number(producto.id)
                            )
                        ) + 1
                        : 1,

                nombre,
                categoria,
                precio,
                stock
            };

            productos.push(nuevoProducto);
        }

        guardarProductos(productos);

        limpiarFormularioProducto();
        mostrarProductos();
        mostrarConsultaRelacionada();
        actualizarContadores();

        const mensaje = document.getElementById("mensajeProducto");

        mostrarMensaje(
            mensaje,
            id
                ? "Producto actualizado correctamente."
                : "Producto registrado correctamente."
        );
    });


// ==========================================================
// FORMULARIO DE PROVEEDORES
// ==========================================================

document
    .getElementById("formProveedor")
    ?.addEventListener("submit", function (evento) {

        evento.preventDefault();

        const id = document.getElementById("idProveedor").value;
        const nombre = document.getElementById("nombreProveedor").value.trim();
        const telefono = document.getElementById("telefonoProveedor").value.trim();
        const correo = document.getElementById("correoProveedor").value.trim();

        if (!nombre || !telefono || !correo) {
            alert("Complete todos los campos del proveedor.");
            return;
        }

        const proveedores = obtenerProveedores();

        if (id) {

            const indice = proveedores.findIndex(
                (proveedor) =>
                    Number(proveedor.id) === Number(id)
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

            const nuevoProveedor = {
                id:
                    proveedores.length > 0
                        ? Math.max(
                            ...proveedores.map(
                                (proveedor) => Number(proveedor.id)
                            )
                        ) + 1
                        : 1,

                nombre,
                telefono,
                correo
            };

            proveedores.push(nuevoProveedor);
        }

        guardarProveedores(proveedores);

        limpiarFormularioProveedor();
        mostrarProveedores();
        mostrarConsultaRelacionada();
        actualizarContadores();

        mostrarMensaje(
            document.getElementById("mensajeProveedor"),
            id
                ? "Proveedor actualizado correctamente."
                : "Proveedor registrado correctamente."
        );
    });


// ==========================================================
// FORMULARIO DE CLIENTES
// ==========================================================

document
    .getElementById("formCliente")
    ?.addEventListener("submit", function (evento) {

        evento.preventDefault();

        const id = document.getElementById("idCliente").value;
        const nombre = document.getElementById("nombreCliente").value.trim();
        const correo = document.getElementById("correoCliente").value.trim();
        const telefono = document.getElementById("telefonoCliente").value.trim();

        if (!nombre || !correo || !telefono) {
            alert("Complete todos los campos del cliente.");
            return;
        }

        const clientes = obtenerClientes();

        if (id) {

            const indice = clientes.findIndex(
                (cliente) =>
                    Number(cliente.id) === Number(id)
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

            const nuevoCliente = {
                id:
                    clientes.length > 0
                        ? Math.max(
                            ...clientes.map(
                                (cliente) => Number(cliente.id)
                            )
                        ) + 1
                        : 1,

                nombre,
                correo,
                telefono
            };

            clientes.push(nuevoCliente);
        }

        guardarClientes(clientes);

        limpiarFormularioCliente();
        mostrarClientes();
        mostrarConsultaRelacionada();
        actualizarContadores();

        mostrarMensaje(
            document.getElementById("mensajeCliente"),
            id
                ? "Cliente actualizado correctamente."
                : "Cliente registrado correctamente."
        );
    });


// ==========================================================
// BÚSQUEDAS
// ==========================================================

document
    .getElementById("busquedaProductos")
    ?.addEventListener("input", mostrarProductos);

document
    .getElementById("busquedaProveedores")
    ?.addEventListener("input", mostrarProveedores);

document
    .getElementById("busquedaClientes")
    ?.addEventListener("input", mostrarClientes);


// ==========================================================
// BOTONES CANCELAR
// ==========================================================

document
    .getElementById("botonCancelarEdicion")
    ?.addEventListener("click", limpiarFormularioProducto);

document
    .getElementById("botonCancelarProveedor")
    ?.addEventListener("click", limpiarFormularioProveedor);

document
    .getElementById("botonCancelarCliente")
    ?.addEventListener("click", limpiarFormularioCliente);


// ==========================================================
// CONSULTA RELACIONADA
// ==========================================================

function mostrarConsultaRelacionada() {

    const tabla = document.getElementById("tablaRelaciones");
    const contador = document.getElementById("contadorRelaciones");
    const sinRelaciones = document.getElementById("sinRelaciones");

    if (!tabla) return;

    const productos = obtenerProductos();
    const proveedores = obtenerProveedores();
    const clientes = obtenerClientes();

    tabla.innerHTML = "";

    if (
        productos.length === 0 ||
        proveedores.length === 0 ||
        clientes.length === 0
    ) {

        if (contador) {
            contador.textContent = "0";
        }

        if (sinRelaciones) {
            sinRelaciones.style.display = "block";
        }

        return;
    }

    if (sinRelaciones) {
        sinRelaciones.style.display = "none";
    }

    productos.forEach((producto) => {

        const proveedor = proveedores[0];
        const cliente = clientes[0];

        tabla.innerHTML += `
            <tr>
                <td>
                    ${escaparHTML(producto.nombre)}
                </td>

                <td>
                    ${escaparHTML(proveedor.nombre)}
                </td>

                <td>
                    ${escaparHTML(cliente.nombre)}
                </td>

                <td>
                    $${Number(producto.precio).toFixed(2)}
                </td>
            </tr>
        `;
    });

    if (contador) {
        contador.textContent = productos.length;
    }
}


// ==========================================================
// BOTÓN CONSULTA RELACIONADA
// ==========================================================

document
    .getElementById("botonConsultaRelacionada")
    ?.addEventListener("click", function () {

        mostrarConsultaRelacionada();

        document
            .getElementById("tablaRelaciones")
            ?.scrollIntoView({
                behavior: "smooth",
                block: "center"
            });
    });


// ==========================================================
// CONTADORES
// ==========================================================

function actualizarContadores() {

    const productos = obtenerProductos();
    const proveedores = obtenerProveedores();
    const clientes = obtenerClientes();

    const contadorProductos =
        document.getElementById("contadorProductos");

    const contadorProveedores =
        document.getElementById("contadorProveedores");

    const contadorClientes =
        document.getElementById("contadorClientes");

    if (contadorProductos) {
        contadorProductos.textContent = productos.length;
    }

    if (contadorProveedores) {
        contadorProveedores.textContent = proveedores.length;
    }

    if (contadorClientes) {
        contadorClientes.textContent = clientes.length;
    }
}


// ==========================================================
// USUARIOS
// ==========================================================

function obtenerUsuarios() {
    return obtenerDatos("tecnoSolucionesUsuarios");
}

function guardarUsuarios(usuarios) {
    guardarDatos("tecnoSolucionesUsuarios", usuarios);
}

function actualizarSesion() {

    const usuarioActual =
        localStorage.getItem("tecnoSolucionesUsuarioActual");

    const contenidoAutenticacion =
        document.getElementById("contenidoAutenticacion");

    const panelAutenticacion =
        document.getElementById("panelAutenticacion");

    const nombreUsuarioActual =
        document.getElementById("nombreUsuarioActual");

    if (usuarioActual) {

        if (contenidoAutenticacion) {
            contenidoAutenticacion.style.display = "none";
        }

        if (panelAutenticacion) {
            panelAutenticacion.style.display = "block";
        }

        if (nombreUsuarioActual) {
            nombreUsuarioActual.textContent = usuarioActual;
        }

    } else {

        if (contenidoAutenticacion) {
            contenidoAutenticacion.style.display = "block";
        }

        if (panelAutenticacion) {
            panelAutenticacion.style.display = "none";
        }
    }
}


// ==========================================================
// REGISTRO
// ==========================================================

document
    .getElementById("formRegistro")
    ?.addEventListener("submit", function (evento) {

        evento.preventDefault();

        const usuario =
            document.getElementById("usuarioRegistro").value.trim();

        const password =
            document.getElementById("passwordRegistro").value;

        if (!usuario || !password) {
            alert("Ingrese usuario y contraseña.");
            return;
        }

        const usuarios = obtenerUsuarios();

        const existe = usuarios.some(
            (item) =>
                item.usuario.toLowerCase() === usuario.toLowerCase()
        );

        if (existe) {

            mostrarMensaje(
                document.getElementById("mensajeRegistro"),
                "El usuario ya existe.",
                "danger"
            );

            return;
        }

        usuarios.push({
            id:
                usuarios.length > 0
                    ? Math.max(
                        ...usuarios.map(
                            (item) => Number(item.id)
                        )
                    ) + 1
                    : 1,

            usuario,
            password
        });

        guardarUsuarios(usuarios);

        document.getElementById("formRegistro").reset();

        mostrarMensaje(
            document.getElementById("mensajeRegistro"),
            "Usuario registrado correctamente."
        );
    });


// ==========================================================
// LOGIN
// ==========================================================

document
    .getElementById("formLogin")
    ?.addEventListener("submit", function (evento) {

        evento.preventDefault();

        const usuario =
            document.getElementById("usuarioLogin").value.trim();

        const password =
            document.getElementById("passwordLogin").value;

        const usuarios = obtenerUsuarios();

        const encontrado = usuarios.find(
            (item) =>
                item.usuario === usuario &&
                item.password === password
        );

        if (!encontrado) {

            mostrarMensaje(
                document.getElementById("mensajeLogin"),
                "Usuario o contraseña incorrectos.",
                "danger"
            );

            return;
        }

        localStorage.setItem(
            "tecnoSolucionesUsuarioActual",
            encontrado.usuario
        );

        document.getElementById("formLogin").reset();

        actualizarSesion();
    });


// ==========================================================
// CERRAR SESIÓN
// ==========================================================

document
    .getElementById("botonCerrarSesion")
    ?.addEventListener("click", function () {

        localStorage.removeItem(
            "tecnoSolucionesUsuarioActual"
        );

        actualizarSesion();
    });


// ==========================================================
// FORMULARIO DE CONTACTO
// ==========================================================

document
    .getElementById("formServicio")
    ?.addEventListener("submit", function (evento) {

        evento.preventDefault();

        const nombre =
            document.getElementById("nombre").value.trim();

        const correo =
            document.getElementById("correo").value.trim();

        const servicio =
            document.getElementById("servicio").value;

        const detalle =
            document.getElementById("detalleSolicitud").value.trim();

        if (!nombre || !correo || !servicio || !detalle) {

            mostrarMensaje(
                document.getElementById("mensajeContacto"),
                "Complete todos los campos.",
                "danger"
            );

            return;
        }

        mostrarMensaje(
            document.getElementById("mensajeContacto"),
            "Solicitud enviada correctamente."
        );

        document.getElementById("formServicio").reset();
    });


// ==========================================================
// INICIALIZACIÓN
// ==========================================================

document.addEventListener("DOMContentLoaded", function () {

    mostrarServicios();

    mostrarProductos();

    mostrarProveedores();

    mostrarClientes();

    mostrarConsultaRelacionada();

    actualizarContadores();

    actualizarSesion();

});
```
