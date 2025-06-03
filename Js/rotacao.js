document.addEventListener('DOMContentLoaded', function () {
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
        rotationContainer: document.getElementById('rotation-table-container'),
        filterButtons: document.querySelectorAll('.filter-btn'),
        seedGroups: document.querySelectorAll('.family-group')
    };

    const cultureColors = {
        "Milho": "#80FF80",
        "Soja": "#8080FF",
        "Trigo": "#80FF80",
        "Feijão": "#8080FF",
        "Cana de Açúcar": "#80FF80",
        "Arroz": "#80FF80",
        "Tomate": "#F03218",
        "Batata": "#F03218",
        "Banana": "#F0D301",
        "Café": "#6B270A",
        "Laranja": "#E15E00",
        "Algodão": "#FFFFFF",
        "Descanso": "#F0E6ED"
    };

    function initEventListeners() {
        elements.addButtons.forEach(btn => {
            btn.addEventListener('click', function (event) {
                handleSeedSelection(event);
            });
        });

        elements.terrainButtons.forEach(btn => {
            btn.addEventListener('click', function (event) {
                handleTerrainSelection(event);
            });
        });

        elements.timeButtons.forEach(btn => {
            btn.addEventListener('click', function (event) {
                handleTimeSelection(event);
            });
        });

        elements.generateBtn.addEventListener('click', function () {
            generateRotationTable();
        });

        elements.filterButtons.forEach(button => {
            button.addEventListener('click', function () {
                const family = button.dataset.family;
                applyFilter(family);
            });
        });
    }

    function handleSeedSelection(event) {
        const button = event.currentTarget;
        const card = button.closest('.seed-card');
        if (!card) return;

        const family = card.dataset.family;
        const name = card.querySelector('h4').textContent;
        const seedId = card.id;

        if (button.classList.contains('selected')) {
            state.seeds = state.seeds.filter(seed => seed.id !== seedId);
            state.selectedFamilies.delete(family);
            button.textContent = 'Adicionar';
            button.classList.remove('selected');
            enableOtherSeedsFromFamily(family);
        } else {
            if (state.seeds.length >= 4) {
                alert('Você só pode selecionar no máximo 4 sementes!');
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
        }

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
        const button = event.currentTarget;
        const card = button.closest('.terreno-card');
        if (!card) return;

        const name = card.querySelector('h3').textContent;
        const terrainId = card.id || name.replace(/\s+/g, '-').toLowerCase();

        if (button.classList.contains('selected')) {
            state.terrain = null;
            button.textContent = 'Adicionar';
            button.classList.remove('selected');
            elements.terrainButtons.forEach(btn => {
                btn.disabled = false;
                btn.classList.remove('disabled', 'selected');
                btn.textContent = 'Adicionar';
            });
        } else {
            elements.terrainButtons.forEach(btn => {
                btn.classList.remove('selected');
                if (btn !== button) {
                    btn.disabled = true;
                    btn.classList.add('disabled');
                    btn.textContent = 'Indisponível';
                }
            });

            state.terrain = { name, id: terrainId };
            button.textContent = 'Selecionado';
            button.classList.add('selected');
        }

        updateGenerateButton();
    }

    function handleTimeSelection(event) {
        const button = event.currentTarget;
        const time = button.textContent.trim();

        if (button.classList.contains('selected')) {
            state.time = null;
            button.classList.remove('selected');
            elements.timeButtons.forEach(btn => {
                btn.disabled = false;
                btn.classList.remove('disabled', 'selected');
            });
        } else {
            elements.timeButtons.forEach(btn => {
                btn.classList.remove('selected');
                if (btn !== button) {
                    btn.disabled = true;
                    btn.classList.add('disabled');
                }
            });

            state.time = time;
            button.classList.add('selected');
        }

        updateGenerateButton();
    }

    function updateGenerateButton() {
        const canGenerate = state.seeds.length > 0 && state.terrain && state.time;
        elements.generateBtn.disabled = !canGenerate;
        elements.generateBtn.classList.toggle('active', canGenerate);
    }

    function generateRotationTable() {
        if (state.seeds.length === 0 || !state.terrain || !state.time) {
            alert('Por favor, selecione pelo menos uma semente, um terreno e o tempo!');
            return;
        }

        let months;
        switch (state.time) {
            case "6 meses": months = 6; break;
            case "1 ano": months = 12; break;
            case "2 anos": months = 24; break;
            default: months = 6;
        }

        const terrenoId = state.terrain.id.replace('terreno-', '');
        let numTalhoes;
        switch (terrenoId) {
            case '1': numTalhoes = 3; break;
            case '2': numTalhoes = 5; break;
            case '3': numTalhoes = 6; break;
            default: numTalhoes = 3;
        }

        const matrizRotacao = generateRandomRotation(numTalhoes, months, state.seeds);

        const table = document.createElement('table');
        table.className = 'rotation-table';

        const thead = document.createElement('thead');
        
        const headerRow = document.createElement('tr');
        headerRow.appendChild(document.createElement('th'));

        for (let i = 0; i < months; i++) {
            const th = document.createElement('th');
            th.textContent = `Mês ${i + 1}`;
            headerRow.appendChild(th);
        }
        thead.appendChild(headerRow);
        table.appendChild(thead);

        const tbody = document.createElement('tbody');

        matrizRotacao.forEach((talhao, index) => {
            const row = document.createElement('tr');
            const th = document.createElement('th');
            th.textContent = `Talhão ${index + 1}`;
            row.appendChild(th);

            talhao.forEach((cultura, monthIndex) => {
                const td = document.createElement('td');
                td.textContent = cultura;
                td.style.backgroundColor = cultureColors[cultura] || '#f8f9fa';
                td.style.color = '#000000';
                td.style.fontWeight = '500';
                td.title = `Talhão ${index + 1}, Mês ${monthIndex + 1}: ${cultura}`;
                row.appendChild(td);
            });

            tbody.appendChild(row);
        });

        table.appendChild(tbody);

        elements.rotationContainer.innerHTML = '';
        elements.rotationContainer.appendChild(table);

        const legend = createLegend();
        elements.rotationContainer.appendChild(legend);
    }

    const INITIAL_NO_DESCANSO_MONTHS = 3;

    const CULTURE_WEIGHTS = {
        DEFAULT: 10,
        DESCANSO: 5
    };

    function getRandomCultureWithWeights(cultures, weights) {
        const total = weights.reduce((a, b) => a + b, 0);
        const random = Math.random() * total;
        let sum = 0;

        for (let i = 0; i < cultures.length; i++) {
            sum += weights[i];
            if (random <= sum) return cultures[i];
        }

        return cultures[cultures.length - 1];
    }

    function generateRandomRotation(numTalhoes, numMeses, selectedSeeds) {
        const matrizRotacao = [];
        const regularCultures = selectedSeeds.map(seed => seed.name);
        const allCultures = [...regularCultures, "Descanso"];
        const MAX_CONSECUTIVE_REGULAR = 3;
        const MAX_CONSECUTIVE_DESCANSO = 1;

        for (let t = 0; t < numTalhoes; t++) {
            const talhao = [];
            let lastCulture = null;
            let consecutiveCount = 0;

            for (let m = 0; m < numMeses; m++) {
                // Descanso obrigatório a cada 6 meses
                if (m > 0 && m % 6 === 0) {
                    if (lastCulture === "Descanso") {
                        const available = regularCultures.filter(c => c !== lastCulture);
                        const chosenCulture = available[Math.floor(Math.random() * available.length)];
                        talhao.push(chosenCulture);
                        lastCulture = chosenCulture;
                        consecutiveCount = 1;
                    } else {
                        talhao.push("Descanso");
                        lastCulture = "Descanso";
                        consecutiveCount = 1;
                    }
                    continue;
                }

                let availableCultures;
                if (lastCulture === "Descanso" && consecutiveCount >= MAX_CONSECUTIVE_DESCANSO) {
                    availableCultures = allCultures.filter(c => c !== "Descanso");
                } else if (lastCulture !== "Descanso" && consecutiveCount >= MAX_CONSECUTIVE_REGULAR) {
                    availableCultures = allCultures.filter(c => c !== lastCulture);
                } else {
                    availableCultures = [...allCultures];
                }

                if (m < INITIAL_NO_DESCANSO_MONTHS) {
                    availableCultures = availableCultures.filter(c => c !== "Descanso");
                }

                if (availableCultures.length === 0) {
                    availableCultures = regularCultures.length > 0 ? [...regularCultures] : ["Descanso"];
                }

                const weights = availableCultures.map(c =>
                    c === "Descanso" ? CULTURE_WEIGHTS.DESCANSO : CULTURE_WEIGHTS.DEFAULT
                );

                const chosenCulture = getRandomCultureWithWeights(availableCultures, weights);

                if (chosenCulture === lastCulture) {
                    consecutiveCount++;
                } else {
                    consecutiveCount = 1;
                }

                talhao.push(chosenCulture);
                lastCulture = chosenCulture;
            }

            matrizRotacao.push(talhao);
        }

        return matrizRotacao;
    }

    function createLegend() {
        const legend = document.createElement('div');
        legend.className = 'rotation-legend';
        legend.innerHTML = '<h4>Legenda:</h4><div class="legend-items"></div>';

        const itemsContainer = legend.querySelector('.legend-items');

        state.seeds.forEach(seed => {
            const item = document.createElement('div');
            item.className = 'legend-item';
            item.innerHTML = `
                <span class="legend-color" style="background-color: ${cultureColors[seed.name] || '#f8f9fa'}"></span>
                <span class="legend-name">${seed.name}</span>
            `;
            itemsContainer.appendChild(item);
        });

        const item = document.createElement('div');
        item.className = 'legend-item';
        item.innerHTML = `
            <span class="legend-color" style="background-color: ${cultureColors["Descanso"]}"></span>
            <span class="legend-name">Descanso</span>
        `;
        itemsContainer.appendChild(item);

        return legend;
    }

    function applyFilter(family) {
        elements.filterButtons.forEach(btn => btn.classList.remove('active'));
        const activeButton = document.querySelector(`[data-family="${family}"]`);
        if (activeButton) activeButton.classList.add('active');

        elements.seedGroups.forEach(group => {
            group.style.display = (family === 'all' || group.dataset.family === family) ? 'block' : 'none';
        });
    }

    initEventListeners();
    applyFilter('all');
});