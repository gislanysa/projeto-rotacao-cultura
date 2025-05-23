document.addEventListener('DOMContentLoaded', function() {
    const state = {
        seeds: [],
        terrain: null,
        time: null,
        selectedFamilies: new Set()
    };

    const elements = {
        seedCards: document.querySelectorAll('.seed-card'),
        addButtons: document.querySelectorAll('.add-button'),
        terrainCards: document.querySelectorAll('.terreno-card'),
        terrainButtons: document.querySelectorAll('.btn-adicionar'),
        timeButtons: document.querySelectorAll('.tempo-button'),
        generateBtn: document.getElementById('generate-rotation'),
        rotationBody: document.getElementById('rotation-body'),
        rotationTable: document.getElementById('rotation-table')
    };


    elements.timeButtons.forEach(btn => {
        btn.dataset.originalText = btn.textContent;
    });
    elements.terrainButtons.forEach(btn => {
        btn.dataset.originalText = btn.textContent;
    });

   
    elements.addButtons.forEach(btn => {
        btn.addEventListener('click', handleSeedSelection);
    });

    elements.terrainButtons.forEach(btn => {
        btn.addEventListener('click', handleTerrainSelection);
    });

    elements.timeButtons.forEach(btn => {
        btn.addEventListener('click', handleTimeSelection);
    });

    elements.generateBtn.addEventListener('click', generateRotationTable);

    
    function handleSeedSelection(event) {
        const button = event.target;
        const card = button.closest('.seed-card');
        const family = card.dataset.family;
        const name = card.querySelector('h4').textContent;
        const seedId = card.id;

     
        if (button.classList.contains('selected')) {
            removeSeedSelection(seedId, family, button);
            return;
        }

        
        if (state.seeds.length >= 3) {
            alert('Você só pode selecionar no máximo 3 sementes!');
            return;
        }

        if (state.selectedFamilies.has(family)) {
            alert('Você já selecionou uma semente desta família botânica!');
            return;
        }

       
        state.seeds.push({ name, family, id: seedId });
        state.selectedFamilies.add(family);

        
        button.textContent = 'Selecionada';
        button.classList.add('selected');

       
        disableOtherSeedsFromFamily(family, seedId);
        updateGenerateButton();
    }

    function removeSeedSelection(seedId, family, button) {
        
        state.seeds = state.seeds.filter(seed => seed.id !== seedId);
        state.selectedFamilies.delete(family);

        
        button.textContent = 'Adicionar';
        button.classList.remove('selected');

        
        enableOtherSeedsFromFamily(family);
        updateGenerateButton();
    }

    function disableOtherSeedsFromFamily(family, currentSeedId) {
        elements.seedCards.forEach(card => {
            if (card.dataset.family === family && card.id !== currentSeedId) {
                const btn = card.querySelector('.add-button');
                btn.disabled = true;
                btn.classList.add('disabled');
                btn.textContent = 'Indisponível';
            }
        });
    }

    function enableOtherSeedsFromFamily(family) {
        elements.seedCards.forEach(card => {
            if (card.dataset.family === family) {
                const btn = card.querySelector('.add-button');
                btn.disabled = false;
                btn.classList.remove('disabled');
                btn.textContent = 'Adicionar';
            }
        });
    }

    
    function handleTerrainSelection(event) {
        const button = event.target;
        const card = button.closest('.terreno-card');
        const name = card.querySelector('h3').textContent;
        const terrainId = card.id || name.replace(/\s+/g, '-').toLowerCase();

       
        if (button.classList.contains('selected')) {
            state.terrain = null;
            button.textContent = button.dataset.originalText || 'Adicionar';
            button.classList.remove('selected');
            
            
            elements.terrainButtons.forEach(btn => {
                btn.disabled = false;
                btn.classList.remove('disabled');
                btn.textContent = btn.dataset.originalText || 'Adicionar';
            });
            
            updateGenerateButton();
            return;
        }

        
        elements.terrainButtons.forEach(btn => {
            btn.classList.remove('selected');
        });

        
        state.terrain = { name, id: terrainId };
        button.textContent = 'Selecionado';
        button.classList.add('selected');

        
        elements.terrainButtons.forEach(btn => {
            if (btn !== button) {
                btn.disabled = true;
                btn.classList.add('disabled');
                btn.style.cursor = 'not-allowed';
                btn.textContent = 'Indisponível';
            }
        });

        updateGenerateButton();
    }

    
    function handleTimeSelection(event) {
    const button = event.target;
    const time = button.dataset.originalText || button.textContent; // Pega o texto original

    // Se já está selecionado, desseleciona
    if (button.classList.contains('selected')) {
        state.time = null;
        button.classList.remove('selected');
        
        // Reativa outros botões
        elements.timeButtons.forEach(btn => {
            btn.disabled = false;
            btn.classList.remove('disabled');
        });
        
        updateGenerateButton();
        return;
    }

    // Desseleciona todos primeiro
    elements.timeButtons.forEach(btn => {
        btn.classList.remove('selected');
    });

    // Seleciona o atual
    state.time = time;
    button.classList.add('selected');

    // Desativa outros botões
    elements.timeButtons.forEach(btn => {
        if (btn !== button) {
            btn.disabled = true;
            btn.classList.add('disabled');
        }
    });

    updateGenerateButton();
}

    function updateGenerateButton() {
        const canGenerate = state.seeds.length > 0 && state.terrain && state.time;
        elements.generateBtn.disabled = !canGenerate;
        
        
        if (canGenerate) {
            elements.generateBtn.classList.add('active');
        } else {
            elements.generateBtn.classList.remove('active');
        }
    }

    function generateRotationTable() {
    if (state.seeds.length !== 3 || !state.terrain || !state.time) {
        alert('Por favor, selecione 3 sementes, um terreno e o tempo!');
        return;
    }

    const totalMonths = state.time.includes('ano') ? parseInt(state.time) * 12 : parseInt(state.time);
    const monthsPerStage = Math.floor(totalMonths / 3); // 3 culturas

    const lotes = 3;
    const tableHTML = [];
    const monthNames = ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"];

    // Limpa tabela
    elements.rotationBody.innerHTML = '';

    // Cabeçalho dinâmico: Lote | Jan | Fev | ...
    const headerRow = document.createElement('tr');
    headerRow.innerHTML = `<th>Lote</th>`;
    for (let i = 0; i < totalMonths; i++) {
        headerRow.innerHTML += `<th>${monthNames[i % 12]}</th>`;
    }

    // Substitui thead pelo novo cabeçalho
    elements.rotationTable.querySelector('thead').innerHTML = '';
    elements.rotationTable.querySelector('thead').appendChild(headerRow);

    // Gera linhas por lote com rotação
    for (let lote = 0; lote < lotes; lote++) {
        const row = document.createElement('tr');
        row.innerHTML = `<td>Lote ${lote + 1}</td>`;
        for (let i = 0; i < 3; i++) {
            const seedIndex = (i + lote) % 3;
            for (let j = 0; j < monthsPerStage; j++) {
                row.innerHTML += `<td class="culture" style="background-color:${getColorForCulture(state.seeds[seedIndex].name)}">${state.seeds[seedIndex].name}</td>`;
            }
        }
        elements.rotationBody.appendChild(row);
    }

    elements.rotationTable.style.display = 'table';
}

function getColorForCulture(name) {
    const cores = {
        'Milho': '#00FF00',
        'Arroz': '#00FF00',
        'Cana de Açucar': '#00FF00',
        'Trigo': '#00FF00',
        'Soja': '#0000FF',
        'Feijão': '#0000FF',
        'Tomate': '#FF0000',
        'Batata': '#FF0000',
        'Banana': '#FFFF00',
        'Algodão': '#FFFFFF',
        'Café': '#8B4513',
        'Laranja': '#FFA500'
        // adicione mais conforme suas sementes
    };
    return cores[name] || '#e2e8f0'; // cor padrão caso não encontre
}

    function formatDate(date) {
        return date.toLocaleDateString('pt-BR', {
            month: '2-digit',
            year: 'numeric'
        }).replace('/', '/');
    }
});