document.addEventListener("DOMContentLoaded", () => {
    const containers = document.querySelectorAll(".container");
    const overlay = document.getElementById("overlay");

    // Secciones para agrupar los contenedores según el estado
    const rojoGroup = document.getElementById("rojoGroup");
    const amarilloGroup = document.getElementById("amarilloGroup");
    const verdeGroup = document.getElementById("verdeGroup");

    // Botones para mostrar/ocultar los grupos
    const toggleRojoBtn = document.getElementById("toggleRojo");
    const toggleAmarilloBtn = document.getElementById("toggleAmarillo");
    const toggleVerdeBtn = document.getElementById("toggleVerde");

    // Function to expand image on click
    function expandImage(event) {
        const imgSrc = event.target.src;
        overlay.innerHTML = `<img src="${imgSrc}">`;
        overlay.style.display = "flex";
    }

    // Close expanded image when overlay is clicked
    overlay.addEventListener("click", () => {
        overlay.style.display = "none";
    });

    containers.forEach((container) => {
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
            actualizarColorYGrupo(container, "disponible");
            guardarEstado();
        });

        pendienteBtn.addEventListener("click", () => {
            actualizarColorYGrupo(container, "pendiente");
            guardarEstado();
        });

        vendidoBtn.addEventListener("click", () => {
            actualizarColorYGrupo(container, "vendido");
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
                actualizarColorYGrupo(container, estado);
                container.querySelector(".comprador").value = comprador || "";
                container.querySelector(".precio-vendido span").textContent = precioVendido || "0";
                container.querySelector(".fecha-vendido span").textContent = fechaVendido || "N/A";
            });
        }
    }

    // Función para actualizar el color y mover el contenedor al grupo adecuado
    function actualizarColorYGrupo(container, estado) {
        container.dataset.estado = estado;
        switch (estado) {
            case "disponible":
                container.style.backgroundColor = "rgba(0, 153, 51, 0.432)";
                verdeGroup.appendChild(container);
                break;
            case "pendiente":
                container.style.backgroundColor = "rgba(187, 199, 21, 0.664)";
                amarilloGroup.appendChild(container);
                break;
            case "vendido":
                container.style.backgroundColor = "rgba(153, 0, 0, 0.582)";
                rojoGroup.appendChild(container);
                break;
        }
    }

    // Funciones para mostrar/ocultar grupos
    toggleRojoBtn.addEventListener("click", () => {
        if (rojoGroup.style.display === "none") {
            rojoGroup.style.display = "block";
        } else {
            rojoGroup.style.display = "none";
        }
    });

    toggleAmarilloBtn.addEventListener("click", () => {
        if (amarilloGroup.style.display === "none") {
            amarilloGroup.style.display = "block";
        } else {
            amarilloGroup.style.display = "none";
        }
    });

    toggleVerdeBtn.addEventListener("click", () => {
        if (verdeGroup.style.display === "none") {
            verdeGroup.style.display = "block";
        } else {
            verdeGroup.style.display = "none";
        }
    });
});


