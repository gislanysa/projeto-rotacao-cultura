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
        title:  'Feijão (Phaseolus vulgaris)',
        img:    'assets/feijao.jpg',
        desc:   'Sazonalidade:\n Plantio ocorre de outubri a dezembro.\n Colheita ocorre de março a junho.\n\n Clima ideal:\n O feijão cresce melhor em temperaturas entre 18°C e 30°C.\n\n Solo ideal:\nPrefere solos leves, bem aerados, com boa capacidade de retenção de umidade, mas que não sejam encharcados.'
    },
    tomate: {
        title:  'Tomate (Solanum lycopersicum)',
        img:    'assets/tomate.jpg',
        desc:   'Sazonalidade:\n Plantio ocorre de fevereiro a maio.\n Colheita ocorre  ocorre entre 4 a 6 meses após o plantio.\n\n Clima ideal:\n O tomate cresce melhor em temperaturas moderadas, entre 18°C e 28°C. Temperaturas muito altas ou muito baixas podem afetar negativamente a qualidade dos frutos.\n\n Solo ideal:\n Prefere solos bem drenados, férteis e ricos em matéria orgânica, como solos argilosos ou arenosos. O solo deve ser leve e com boa capacidade de retenção de água.'
    },
    batata: {
        title:  'Batata (Solanum tuberosum)',
        img:    'assets/batata.jpg',
        desc:   'Sazonalidade:\n Plantio ocorre de janeiro a março.\n Colheita ocorre entre 3 a 4 meses após o plantio.\n\n Clima ideal:\n  A batata cresce melhor em climas temperados, com temperaturas médias entre 15°C e 20°C. Ela não tolera calor excessivo e se desenvolve melhor em temperaturas mais amenas.\n\n Solo ideal:\nA batata prefere solos bem drenados, ricos em matéria orgânica e com boa estrutura física. Solos arenosos ou argilosos bem-preparados são os mais indicados.'
    },
    banana: {
        title:  'Banana (Musa spp.)',
        img:    'assets/banana.jpg',
        desc:   'Sazonalidade:\n O plantio da banana pode ser realizado ao longo de todo o ano, com o pico de plantio entre janeiro e março.\n Colheita ocorre aproximadamente 9 a 12 meses após o plantio.\n\n Clima ideal:\n A banana cresce bem em climas quentes, com temperaturas médias entre 25°C e 30°C. Ela não tolera geadas.\n\n Solo ideal:\nPrefere solos bem drenados, ricos em matéria orgânica, como solos argilosos ou arenosos com boa capacidade de retenção de água.'
    },
    algodao: {
        title:  'Algodão (Gossypium hirsutum)',
        img:    'assets/algodao.jpg',
        desc:   'Sazonalidade:\n Plantio ocorre de outubro a dezembro.\n Colheita ocorre de março a maio.\n\n Clima ideal:\nO algodão prefere temperaturas altas, com uma média entre 25°C e 30°C durante o ciclo de cultivo.\n\n Solo ideal:\nSolos bem drenados e ricos em matéria orgânica, como solos argilosos ou arenosos, são ideais para o cultivo do algodão.'
    },
    cafe: {
        title:  'Café (Coffea arabica)',
        img:    'assets/cafe.jpg',
        desc:   'Sazonalidade:\n Plantio durante todo o ano, mas o pico de plantio ocorre entre setembro e novembro.\n Colheita ocorre entre maio a setembro.\n\n Clima ideal:\nO café arabica cresce melhor em temperaturas amenas, entre 18°C e 25°C. Já o café robusta (Coffea canephora) prefere temperaturas mais altas.\n\n Solo ideal:\nPrefere solos bem drenados, profundos e ricos em matéria orgânica, como solos argilosos ou argilo-arenosos.'
    },
    laranja: {
        title:  'Laranja (Citrus sinensis)',
        img:    'assets/laranja.jpg',
        desc:   'Sazonalidade:\n O plantio da laranja pode ser realizado ao longo de todo o ano, mas o pico é geralmente entre fevereiro e março.\n Colheita ocorre de março a agosto.\n\n Clima ideal:\n A laranja se desenvolve melhor em climas tropicais e subtropicais, com temperaturas médias entre 20°C e 28°C.\n\n Solo ideal:\n A laranja prefere solos bem drenados, com boa retenção de água e rica em matéria orgânica, como solos argilosos ou arenosos.'
    },

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
  
  //  C) fechar modal clicando no overlay ou no botão “×” 
  modal.addEventListener('click', e => {
    if (
      e.target.classList.contains('modal-overlay') ||
      e.target.classList.contains('close')
    ) {
      modal.classList.remove('open');
    }
  });
  