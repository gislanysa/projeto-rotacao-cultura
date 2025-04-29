document.addEventListener("DOMContentLoaded", () => {
    const filterButtons = document.querySelectorAll(".filter-btn");
    const seedGroups = document.querySelectorAll(".family-group");
  
    // Função para aplicar o filtro e destacar o botão
    const applyFilter = (family) => {
        filterButtons.forEach((btn) => btn.classList.remove("active"));
        const activeButton = document.querySelector(`[data-family="${family}"]`);
        if (activeButton) {
            activeButton.classList.add("active");
        }
  
        seedGroups.forEach((group) => {
            if (family === "all" || group.dataset.family === family) {
                group.style.display = "block";
            } else {
                group.style.display = "none";
            }
        });
    };

    // Adicionar evento de clique para os filtros
    filterButtons.forEach((button) => {
        button.addEventListener("click", () => {
            const family = button.dataset.family;
            applyFilter(family);
        });
    });

    // Aplicar o filtro "Poaceae" ao carregar a página
    applyFilter("poaceae");
});

  