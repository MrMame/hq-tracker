import {dbMonsterService} from '../../domain/persistent/monsterTrackerDb.js';



export function createMonsterTrackerControl() {
    const htmlString = `
        <div class="tracker-control">
        
        <div class="button-container">
            <button class="monster-delete-btn">X</button>
        </div>
            <img class="monster-icon" src="img/monster-icon-abscheulichkeit.png">
            <div class="input-container">
                <input class="monster-name-input" type="text" placeholder="Monster Name">
                <label>Health
                    <input class="monster-health-input" type="number" placeholder="Health">
                </label>
                <label>Armor
                    <input class="monster-armor-input" type="number" placeholder="Armor">
                </label>
                <label>Focus
                    <input class="monster-focuspoints-input" type="number" placeholder="Focus">
                </label>
                <label>Move
                    <input class="monster-movingpoints-input" type="number" placeholder="Move">
                </label>
            </div>
        </div>
    `;

    const element = document.createRange().createContextualFragment(htmlString).firstElementChild;


    // Input Fields Store Value into Database on Change
    element.querySelectorAll('input').forEach(input => {
        input.addEventListener('change', () => {
            if (input.value != input.dataset.previousValue) {
                //Changed
                dbMonsterService.updateMonsterTrackerEntity(element.dataset.key, {
                    name: element.querySelector('.monster-name-input').value,
                    health: element.querySelector('.monster-health-input').value,
                    armor: element.querySelector('.monster-armor-input').value,
                    focus: element.querySelector('.monster-focuspoints-input').value,
                    move: element.querySelector('.monster-movingpoints-input').value
                }); 
            }
            input.dataset.previousValue = input.value; // Store the previous value in a data attribute
        });
    });


    // Event-Handler für den Delete-Button
    element.querySelector('.monster-delete-btn').addEventListener('click', () => {
        dbMonsterService.deleteMonsterTrackerEntity(element.dataset.key);
    });


    return element;
}



export function createMonsterTrackerControl_OLD() {
    const container = document.createElement('div');
    container.classList.add('tracker-control');

    let monsterNameInput = document.createElement('input');
    monsterNameInput.classList.add('monster-name-input');
    monsterNameInput.type = 'text';
    monsterNameInput.placeholder = 'Monster Name';

    let monsterIcon = document.createElement('img');
    monsterIcon.classList.add('monster-icon');
    monsterIcon.src = 'img/monster-icon-abscheulichkeit.png'; // Placeholder icon, replace with actual path if needed

    let monsterHealthInput = document.createElement('input');
    monsterHealthInput.classList.add('monster-health-input');
    monsterHealthInput.type = 'number';
    monsterHealthInput.placeholder = 'Health';

    let monsterArmorInput = document.createElement('input');
    monsterArmorInput.classList.add('monster-armor-input');
    monsterArmorInput.type = 'number';
    monsterArmorInput.placeholder = 'Armor';

    let monsterFocuspointsInput = document.createElement('input');
    monsterFocuspointsInput.classList.add('monster-focuspoints-input');
    monsterFocuspointsInput.type = 'number';
    monsterFocuspointsInput.placeholder = 'Focus';   

    let monsterMovingPointsInput = document.createElement('input');
    monsterMovingPointsInput.classList.add('monster-movingpoints-input');
    monsterMovingPointsInput.type = 'number';
    monsterMovingPointsInput.placeholder = 'Move';

    let monsterDeleteBtn = document.createElement('button');
    monsterDeleteBtn.classList.add('monster-delete-btn');
    monsterDeleteBtn.textContent = 'X';

    // EventHandelr for Delete Button
    monsterDeleteBtn.addEventListener('click', () => {
        dbMonsterService.deleteMonsterTrackerEntity(container.dataset.key); // Use the key from the data attribute to delete the entity
    });


    let monsterSaveBtn = document.createElement('button');
    monsterSaveBtn.classList.add('monster-save-btn');
    monsterSaveBtn.textContent = 'Save';

    // EventHandelr for Save Button
    monsterSaveBtn.addEventListener('click', () => {
        const monsterKey = container.dataset.key; // Retrieve the key from the data attribute
        const monsterData = {
            name: container.querySelector('.monster-name-input').value,
            health: container.querySelector('.monster-health-input').value,
            armor: container.querySelector('.monster-armor-input').value,
            focus: container.querySelector('.monster-focuspoints-input').value,
            move: container.querySelector('.monster-movingpoints-input').value
        };
        dbMonsterService.updateMonsterTrackerEntity(monsterKey, monsterData);
    });


    container.appendChild(monsterIcon);
    container.appendChild(monsterNameInput);
    container.appendChild(monsterHealthInput);
    container.appendChild(monsterArmorInput);
    container.appendChild(monsterFocuspointsInput);
    container.appendChild(monsterMovingPointsInput);
    container.appendChild(monsterSaveBtn);
    container.appendChild(monsterDeleteBtn);

    return container;
}


export function createMonsterTrackerControlFromMonsterEntity(monsterTrackerEntity) {
    const container = createMonsterTrackerControl();
    container.dataset.key = monsterTrackerEntity.key; // Set the data-key attribute for easier access
    container.querySelector('.monster-name-input').value = monsterTrackerEntity.name;
    container.querySelector('.monster-health-input').value = monsterTrackerEntity.health;
    container.querySelector('.monster-armor-input').value = monsterTrackerEntity.armor;
    container.querySelector('.monster-focuspoints-input').value = monsterTrackerEntity.focus;
    container.querySelector('.monster-movingpoints-input').value = monsterTrackerEntity.move;
    return container;
}