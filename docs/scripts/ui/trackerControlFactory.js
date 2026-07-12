export function createMonsterTrackerControl() {
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
        container.remove();
    });

    
    container.appendChild(monsterIcon);
    container.appendChild(monsterNameInput);
    container.appendChild(monsterHealthInput);
    container.appendChild(monsterArmorInput);
    container.appendChild(monsterFocuspointsInput);
    container.appendChild(monsterMovingPointsInput);
    container.appendChild(monsterDeleteBtn);

    return container;
}