import {dbMonsterService} from '../domain/persistent/monsterTrackerDb.js';


export function createTrackerWizardOLD() {
    const container = document.createElement('dialog');
    container.id = 'trackerWizard';
    container.classList.add('tracker-wizard');  

    let wizardHeadline = document.createElement('h2');
    wizardHeadline.textContent = 'Wizard Headline';
    
    let monsterNameInput = document.createElement('input');
    monsterNameInput.classList.add('monster-name-input');
    monsterNameInput.type = 'text';
    monsterNameInput.placeholder = 'Monster Name';

    let closeBtn = document.createElement('button');
    closeBtn.id = 'closeBtn';
    closeBtn.textContent = 'Close';

    // Dialog schließen
    closeBtn.addEventListener('click', () => {
        container.close();
    });

    container.appendChild(wizardHeadline);
    container.appendChild(monsterNameInput);
    container.appendChild(closeBtn);

    return container;
}

export function createTrackerWizard() {
    const htmlString = `
        <dialog id="trackerWizard" class="tracker-wizard">
            <div id="imageSelectContainer" class="image-select-container">
                <img class="monster-icon" src="img/monster-icon-abscheulichkeit.png" data-image="img/monster-icon-abscheulichkeit.png">
                <img class="monster-icon" src="img/monster-icon-abscheulichkeit.png" data-image="img/monster-icon-drache.png">
            </div>
            <div id="statsInputContainer" class="stats-input-container">
                <label>Name
                    <input id="wizard-name-input" type="text" placeholder="Monster Name">
                </label>
                <label>Health
                    <input id="wizard-health-input" type="number" placeholder="Health">
            </label>
            <label>Armor
                <input id="wizard-armor-input" type="number" placeholder="Armor">
            </label>
            <label>Focus
                <input id="wizard-focuspoints-input" type="number" placeholder="Focus">
            </label>
            <label>Move
                <input id="wizard-movingpoints-input" type="number" placeholder="Move">
            </label>
            </div>
            <button id="wizard-create-btn">Create</button>
            <button id="wizard-cancel-btn">Cancel</button>
        </dialog>
    `;

    const element = document.createRange().createContextualFragment(htmlString).firstElementChild;


    element.style.backgroundColor = "lightgray";
    element.querySelector('#wizard-cancel-btn').addEventListener('click', () => element.close());
    element.querySelector('#wizard-create-btn').addEventListener('click', () => {
        const name = element.querySelector('#wizard-name-input').value;
        const selectedImage = element.querySelector('.monster-icon.selected')?.getAttribute('data-image') || 'img/monster-icon-abscheulichkeit.png';
        const health = parseInt(element.querySelector('#wizard-health-input').value, 10);
        const armor = parseInt(element.querySelector('#wizard-armor-input').value, 10);
        const focus = parseInt(element.querySelector('#wizard-focuspoints-input').value, 10);
        const move = parseInt(element.querySelector('#wizard-movingpoints-input').value, 10);

        dbMonsterService.addMonsterTrackerData({
            name,
            image: selectedImage,
            health,
            armor,
            focus,
            move
        });
        element.close();

    });

    return element;
}