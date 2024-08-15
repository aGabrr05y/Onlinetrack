document.addEventListener("DOMContentLoaded", () => {
    const containers = document.querySelectorAll(".container");

    // Función para guardar el estado en localStorage
    function guardarEstado() {
        const estados = Array.from(containers).map((container) => {
            const estado = container.dataset.estado;
            const comprador = container.querySelector("input").value;
            return { estado, comprador };
        });
        localStorage.setItem("estados", JSON.stringify(estados));
    }

    // Función para cargar el estado desde localStorage
    function cargarEstado() {
        const estadosGuardados = JSON.parse(localStorage.getItem("estados"));
        if (estadosGuardados) {
            containers.forEach((container, index) => {
                const { estado, comprador } = estadosGuardados[index];
                actualizarColor(container, estado);
                container.querySelector("input").value = comprador || "";
            });
        }
    }

    // Función para actualizar el color del contenedor según el estado
    function actualizarColor(container, estado) {
        container.dataset.estado = estado;
        switch (estado) {
            case "disponible":
                container.style.backgroundColor = "rgba(0, 153, 51, 0.432)";
                break;
            case "pendiente":
                container.style.backgroundColor = "rgba(187, 199, 21, 0.664)";
                break;
            case "vendido":
                container.style.backgroundColor = "rgba(153, 0, 0, 0.582)";
                break;
        }
    }

    // Evento click para los botones
    containers.forEach((container) => {
        const disponibleBtn = container.querySelector("#disponible");
        const pendienteBtn = container.querySelector("#pendiente");
        const vendidoBtn = container.querySelector("#vendido");

        disponibleBtn.addEventListener("click", () => {
            actualizarColor(container, "disponible");
            guardarEstado();
        });

        pendienteBtn.addEventListener("click", () => {
            actualizarColor(container, "pendiente");
            guardarEstado();
        });

        vendidoBtn.addEventListener("click", () => {
            actualizarColor(container, "vendido");
            guardarEstado();
        });
    });

    // Cargar estado al iniciar
    cargarEstado();
});
