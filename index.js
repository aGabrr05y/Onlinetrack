document.addEventListener("DOMContentLoaded", () => {
    const containers = document.querySelectorAll(".container");
    const overlay = document.getElementById("overlay");

    // Expandir imagen al hacer clic
    function expandImage(event) {
        const imgSrc = event.target.src;
        overlay.innerHTML = `<img src="${imgSrc}">`;
        overlay.style.display = "flex";
    }

    // Cerrar la imagen expandida al hacer clic en el overlay
    overlay.addEventListener("click", () => {
        overlay.style.display = "none";
    });

    containers.forEach((container, index) => {
        const image = container.querySelector(".expandable-image");
        image.addEventListener("click", expandImage);

        const enviarBtn = container.querySelector(".enviar-precio");
        const input = container.querySelector(".comprador");

        enviarBtn.addEventListener("click", () => {
            const precioVendido = input.value;
            container.querySelector(".precio-vendido span").textContent = precioVendido || "0";

            const fechaVendido = new Date().toLocaleString();
            container.querySelector(".fecha-vendido span").textContent = fechaVendido;

            guardarEstado();
        });

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

    cargarEstado();

    function guardarEstado() {
        const estados = Array.from(containers).map((container) => {
            const estado = container.dataset.estado;
            const comprador = container.querySelector(".comprador").value;
            const precioVendido = container.querySelector(".precio-vendido span").textContent;
            const fechaVendido = container.querySelector(".fecha-vendido span").textContent;
            return { estado, comprador, precioVendido, fechaVendido };
        });
        localStorage.setItem("estados", JSON.stringify(estados));
    }

    function cargarEstado() {
        const estadosGuardados = JSON.parse(localStorage.getItem("estados"));
        if (estadosGuardados) {
            containers.forEach((container, index) => {
                const { estado, comprador, precioVendido, fechaVendido } = estadosGuardados[index];
                actualizarColor(container, estado);
                container.querySelector(".comprador").value = comprador || "";
                container.querySelector(".precio-vendido span").textContent = precioVendido || "0";
                container.querySelector(".fecha-vendido span").textContent = fechaVendido || "N/A";
            });
        }
    }

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

        // Mover contenedor al grupo correspondiente
        const grupos = {
            "disponible": document.getElementById("grupoVerde"),
            "pendiente": document.getElementById("grupoAmarillo"),
            "vendido": document.getElementById("grupoRojo")
        };
        grupos[estado].appendChild(container);
    }

    // Manejar la visibilidad de los grupos
    document.getElementById("toggleRojo").addEventListener("click", () => {
        toggleVisibility("grupoRojo");
    });
    document.getElementById("toggleVerde").addEventListener("click", () => {
        toggleVisibility("grupoVerde");
    });
    document.getElementById("toggleAmarillo").addEventListener("click", () => {
        toggleVisibility("grupoAmarillo");
    });

    function toggleVisibility(groupId) {
        const group = document.getElementById(groupId);
        group.style.display = group.style.display === "none" ? "block" : "none";
    }
});
