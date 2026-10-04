/* ==========================================================
   TECNOSOLUCIONES
   GITHUB PAGES - SEMANA 15
   FUNCIONES CON LOCALSTORAGE
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


const clientesIniciales = [
    {
        id: 1,
        nombre: "Juan Pérez",
        correo: "juan@gmail.com",
        telefono: "0999999999",
        estado: "Activo"
    },
    {
        id: 2,
        nombre: "María González",
        correo: "maria.gonzalez@gmail.com",
        telefono: "0987654321",
        estado: "Activo"
    },
    {
        id: 3,
        nombre: "Carlos Mendoza",
        correo: "carlos.mendoza@gmail.com",
        telefono: "0976543210",
        estado: "Activo"
    }
];


const proveedoresIniciales = [
    {
        id: 1,
        nombre: "Proveedor Tecnológico",
        contacto: "Pedro López",
        correo: "proveedor@gmail.com",
        servicio: "Equipos tecnológicos",
        estado: "Activo"
    },
    {
        id: 2,
        nombre: "Soluciones Digitales",
        contacto: "Ana Torres",
        correo: "ventas@soluciones.com",
        servicio: "Software y tecnología",
        estado: "Activo"
    }
];


const facturasIniciales = [
    {
        id: 1,
        numero: "FAC-001",
        cliente: "Juan Pérez",
        fecha: "2026-10-04",
        total: 150.00,
        estado: "Pendiente"
    }
];


/* ==========================================================
   CARGAR DATOS
========================================================== */

function cargarDatos(clave, datosIniciales) {

    const datosGuardados =
        localStorage.getItem(clave);

    if (datosGuardados) {

        return JSON.parse(datosGuardados);

    }

    localStorage.setItem(
        clave,
        JSON.stringify(datosIniciales)
    );

    return datosIniciales;
}


/* ==========================================================
   GUARDAR DATOS
========================================================== */

function guardarDatos(clave, datos) {

    localStorage.setItem(
        clave,
        JSON.stringify(datos)
    );
}


/* ==========================================================
   PRODUCTOS
========================================================== */

function mostrarProductos() {

    const tabla =
        document.getElementById("listaProductos");

    const contador =
        document.getElementById("contadorProductos");

    if (!tabla) {
        return;
    }

    const productos =
        cargarDatos(
            "tecnoSolucionesProductos",
            productosIniciales
        );

    tabla.innerHTML = "";

    productos.forEach(producto => {

        const fila =
            document.createElement("tr");

        const estado =
            producto.stock > 0
                ? `<span class="estado-activo">Disponible</span>`
                : `<span class="estado-agotado">Agotado</span>`;

        fila.innerHTML = `
            <td>${producto.id}</td>

            <td>
                <strong>
                    ${producto.nombre}
                </strong>
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
                ${estado}
            </td>
        `;

        tabla.appendChild(fila);

    });

    if (contador) {

        contador.textContent =
            productos.length;

    }

}


/* ==========================================================
   CLIENTES
========================================================== */

function mostrarClientes() {

    const tabla =
        document.getElementById("listaClientes");

    if (!tabla) {
        return;
    }

    const clientes =
        cargarDatos(
            "tecnoSolucionesClientes",
            clientesIniciales
        );

    tabla.innerHTML = "";

    clientes.forEach(cliente => {

        const fila =
            document.createElement("tr");

        fila.innerHTML = `
            <td>
                ${cliente.id}
            </td>

            <td>
                <strong>
                    ${cliente.nombre}
                </strong>
            </td>

            <td>
                ${cliente.correo}
            </td>

            <td>
                ${cliente.telefono}
            </td>

            <td>
                <span class="estado-activo">
                    ${cliente.estado}
                </span>
            </td>
        `;

        tabla.appendChild(fila);

    });

}


/* ==========================================================
   PROVEEDORES
========================================================== */

function mostrarProveedores() {

    const tabla =
        document.getElementById("listaProveedores");

    if (!tabla) {
        return;
    }

    const proveedores =
        cargarDatos(
            "tecnoSolucionesProveedores",
            proveedoresIniciales
        );

    tabla.innerHTML = "";

    proveedores.forEach(proveedor => {

        const fila =
            document.createElement("tr");

        fila.innerHTML = `
            <td>
                ${proveedor.id}
            </td>

            <td>
                <strong>
                    ${proveedor.nombre}
                </strong>
            </td>

            <td>
                ${proveedor.contacto}
            </td>

            <td>
                ${proveedor.correo}
            </td>

            <td>
                ${proveedor.servicio}
            </td>

            <td>
                <span class="estado-activo">
                    ${proveedor.estado}
                </span>
            </td>
        `;

        tabla.appendChild(fila);

    });

}


/* ==========================================================
   FACTURACIÓN
========================================================== */

function mostrarFacturas() {

    const tabla =
        document.getElementById("listaFacturas");

    if (!tabla) {
        return;
    }

    const facturas =
        cargarDatos(
            "tecnoSolucionesFacturas",
            facturasIniciales
        );

    tabla.innerHTML = "";

    facturas.forEach(factura => {

        const fila =
            document.createElement("tr");

        fila.innerHTML = `
            <td>
                ${factura.id}
            </td>

            <td>
                <strong>
                    ${factura.numero}
                </strong>
            </td>

            <td>
                ${factura.cliente}
            </td>

            <td>
                ${factura.fecha}
            </td>

            <td>
                $${Number(factura.total).toFixed(2)}
            </td>

            <td>
                <span class="estado-pendiente">
                    ${factura.estado}
                </span>
            </td>
        `;

        tabla.appendChild(fila);

    });

}


/* ==========================================================
   SOLICITUD DE SERVICIO
========================================================== */

function cargarSolicitudes() {

    const solicitudes =
        localStorage.getItem(
            "tecnoSolucionesSolicitudes"
        );

    if (!solicitudes) {

        localStorage.setItem(
            "tecnoSolucionesSolicitudes",
            JSON.stringify([])
        );

        return [];

    }

    return JSON.parse(solicitudes);
}


function guardarSolicitudes(solicitudes) {

    localStorage.setItem(
        "tecnoSolucionesSolicitudes",
        JSON.stringify(solicitudes)
    );

}


/* ==========================================================
   FORMULARIO DE SOLICITUD
========================================================== */

function configurarFormulario() {

    const formulario =
        document.getElementById("formServicio");

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

            const categoria =
                document
                    .getElementById("categoria")
                    .value;

            const descripcion =
                document
                    .getElementById("descripcion")
                    .value
                    .trim();

            const mensaje =
                document.getElementById("mensaje");


            /* VALIDACIÓN */

            if (
                nombre === "" ||
                categoria === "" ||
                descripcion === ""
            ) {

                mensaje.innerHTML =
                    `<div class="mensaje-error">
                        Complete todos los campos.
                    </div>`;

                return;
            }


            /* OBTENER SOLICITUDES */

            const solicitudes =
                cargarSolicitudes();


            /* CREAR SOLICITUD */

            const nuevaSolicitud = {

                id:
                    solicitudes.length > 0
                        ? solicitudes[solicitudes.length - 1].id + 1
                        : 1,

                nombre:
                    nombre,

                servicio:
                    categoria,

                descripcion:
                    descripcion,

                fecha:
                    new Date().toLocaleDateString(
                        "es-EC"
                    )

            };


            /* GUARDAR */

            solicitudes.push(
                nuevaSolicitud
            );

            guardarSolicitudes(
                solicitudes
            );


            /* MENSAJE */

            mensaje.innerHTML =
                `<div class="mensaje-exito">
                    <i class="bi bi-check-circle-fill"></i>
                    Solicitud registrada correctamente.
                </div>`;


            /* LIMPIAR */

            formulario.reset();

        }
    );

}


/* ==========================================================
   INICIAR APLICACIÓN
========================================================== */

document.addEventListener(
    "DOMContentLoaded",
    function() {

        mostrarProductos();

        mostrarClientes();

        mostrarProveedores();

        mostrarFacturas();

        configurarFormulario();

    }
);