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
        if (!state.seeds.length || !state.terrain || !state.time) {
            alert('Por favor, complete todas as seleções!');
            return;
        }

        
        const totalMonths = state.time.includes('ano') ? 
            parseInt(state.time) * 12 : 
            parseInt(state.time);
        
        const monthsPerStage = Math.floor(totalMonths / state.seeds.length);
        const startDate = new Date();
        
        
        elements.rotationBody.innerHTML = '';
        elements.rotationTable.style.display = 'table';
        
        state.seeds.forEach((seed, index) => {
            const start = new Date(startDate);
            start.setMonth(start.getMonth() + (index * monthsPerStage));
            
            const end = new Date(start);
            end.setMonth(end.getMonth() + monthsPerStage);
            
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${index + 1}</td>
                <td>${seed.name}</td>
                <td>${seed.family}</td>
                <td>${monthsPerStage} meses</td>
                <td>${formatDate(start)} - ${formatDate(end)}</td>
            `;
            elements.rotationBody.appendChild(row);
        });
    }

    function formatDate(date) {
        return date.toLocaleDateString('pt-BR', {
            month: '2-digit',
            year: 'numeric'
        }).replace('/', '/');
    }
});