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

const seedInfo = {
    milho: {
      title: 'Milho (Zea mays)',
      img:   'assets/milho.jpg',
      desc:  'Sazonalidade:\n Plantio ocorre de setembro a dezembro.\n Colheita ocorre de fevereiro a junho.\n\n Clima ideal:\n O milho é sensível a temperaturas muito baixas, com a temperatura ideal variando entre 20°C e 30°C.\n\n Solo ideal:\n Solos argilosos ou arenosos, o milho prefere solos bem drenados e férteis, com boa capacidade de retenção de água.'
    },
    arroz: {
      title: 'Arroz (Oryza sativa)',
      img:   'assets/arroz.jpg',
      desc:  'Sazonalidade:\n Plantio ocorre de outubro a dezembro. \n Colheita ocorre de março a junho.\n\n Clima ideal:\n O arroz se adapta melhor a temperaturas entre 25°C e 35°C durante o ciclo de cultivo.\n\n Solo ideal:\n O arroz é tradicionalmente cultivado em solos de várzea, com boa capacidade de retenção de água, geralmente em solos argilosos ou silto-argilosos.'
    },
    cana_acucar: {
        title: 'Cana de açucar (Saccharum officinarum)',
        img:   'assets/cana_acucar.jpg',
        desc:  'Sazonalidade:\n Plantio ocorre durante todo o ano.\n Colheita ocorre de abril a novembro.\n\n Clima ideal:\n A cana-de-açúcar cresce melhor em climas quentes, com temperaturas médias entre 24°C e 30°C.\n\n Solo ideal:\nPrefere solos profundos, bem drenados e ricos em matéria orgânica, como solos argilosos ou arenosos.'
    },
    trigo: {
        title: 'Trigo (Triticum aestivum)',
        img:   'assets/trigo.jpg',
        desc:  'Sazonalidade:\nPlantio ocorre de maio a julho.\, Colheita ocorre de outubro a dezembro\n\n Clima ideal:\nO trigo cresce melhor em temperaturas amenas, entre 15°C e 25°C. \n\n Solo ideal:\n O trigo prefere solos bem drenados, com boa estrutura física, como os solos argilosos ou arenosos.'
    },
    soja: {
        title: 'Soja (Glycine max)',
        img:   'assets/soja.jpg',
        desc:  'Sazonalidade:\n Plantio ocorre de outubro a dezembro.\n Colheita ocorre de março a maio.\n\n Clima ideal:\n Ideal entre 20°C e 30°C. A soja não tolera temperaturas muito baixas ou geadas, e temperaturas abaixo de 12°C podem prejudicar o desenvolvimento das plantas.\n\n Solo ideal:\n A soja prefere solos leves, com boa capacidade de retenção de água, mas que não sofram encharcamento. Solos argilosos ou com baixa permeabilidade não são ideais.'

    },
    feijao: {

    }

};

const modal = document.getElementById('seed-modal');
const modalTitle = document.getElementById('modal-title');
const modalImg   = document.getElementById('modal-image');
const modalDesc  = document.getElementById('modal-desc');

function openModal(id) {
    const data = seedInfo[id];
    if (!data) return;                     
  
    modalTitle.textContent = data.title;
    modalImg.src           = data.img;
    modalImg.alt           = data.title;
    modalDesc.textContent  = data.desc;
  
    modal.classList.add('open');
  }
  
  /*  C) fechar modal clicando no overlay ou no botão “×”              */
  modal.addEventListener('click', e => {
    if (
      e.target.classList.contains('modal-overlay') ||
      e.target.classList.contains('close')
    ) {
      modal.classList.remove('open');
    }
  });
  