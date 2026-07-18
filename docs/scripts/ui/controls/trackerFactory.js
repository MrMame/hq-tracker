import {dbMonsterService} from '../../domain/persistent/monsterTrackerDb.js';



export function createMonsterTrackerControl(elMonsterTrackerEventDialog) {
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

    

    element.addEventListener('click',(el) => {
        dbMonsterService.getMonsterTrackerEntity(element.dataset.key).then(monsterTrackerEntity => {
            elMonsterTrackerEventDialog.loadMonster(monsterTrackerEntity);
            elMonsterTrackerEventDialog.showDialog();
        })
    });



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




export function createMonsterTrackerControlFromMonsterEntity(elMonsterTrackerEventDialog, monsterTrackerEntity) {
    const container = createMonsterTrackerControl(elMonsterTrackerEventDialog);
    container.dataset.key = monsterTrackerEntity.key; // Set the data-key attribute for easier access
    container.querySelector('.monster-icon').src = monsterTrackerEntity.image;
    container.style.backgroundColor = monsterTrackerEntity.color;
    container.querySelector('.monster-name-input').value = monsterTrackerEntity.name;
    container.querySelector('.monster-health-input').value = monsterTrackerEntity.health;
    container.querySelector('.monster-armor-input').value = monsterTrackerEntity.armor;
    container.querySelector('.monster-focuspoints-input').value = monsterTrackerEntity.focus;
    container.querySelector('.monster-movingpoints-input').value = monsterTrackerEntity.move;

    // container.querySelectorAll('.color-option').forEach(cp=>{
    //     if(cp.style.backgroundColor===monsterTrackerEntity.color){
    //         cp.classList.add('selected');
    //     }
    // });


    return container;
}