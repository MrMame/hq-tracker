import {dbMonsterService} from '../../domain/persistent/monsterTrackerDb.js';
import {MonsterTrackerEntity} from '../../domain/models/monsterTrackerEntity.js';


export function createTrackerWizard() {
    const htmlString = `
        <dialog id="trackerWizard" class="tracker-wizard">
            <div id="imageSelectContainer" class="image-select-container">
                <div class="imageSelectorRow">
                    <img class="monster-icon selected" src="img/monster-icon-Goblin.png" data-image="img/monster-icon-Goblin.png">
                    <img class="monster-icon" src="img/monster-icon-Orc.png" data-image="img/monster-icon-Orc.png">
                    <img class="monster-icon" src="img/monster-icon-ChaosWarrior.png" data-image="img/monster-icon-ChaosWarrior.png">
                </div>
                <div class="imageSelectorRow">
                    <img class="monster-icon" src="img/monster-icon-FimirAbomination.png" data-image="img/monster-icon-FimirAbomination.png">
                    <img class="monster-icon" src="img/monster-icon-Gargoyle.png" data-image="img/monster-icon-Gargoyle.png">
                    <img class="monster-icon" src="img/monster-icon-Mummy.png" data-image="img/monster-icon-Mummy.png">
                </div>
                <div class="imageSelectorRow">
                    <img class="monster-icon" src="img/monster-icon-Skeleton.png" data-image="img/monster-icon-Skeleton.png">
                    <img class="monster-icon" src="img/monster-icon-Zombie.png" data-image="img/monster-icon-Zombie.png">
                    <img class="monster-icon" src="img/monster-icon-Hexer.png" data-image="img/monster-icon-Hexer.png">
                </div>
            </div>
                <div id="templatebuttonContainer" class="button-container">
                    <button id="wizard-template-easy-btn" class="template-button">Easy</button>
                    <button id="wizard-template-normal-btn" class="template-button selected">Normal</button>
                    <button id="wizard-template-hard-btn" class="template-button">Hard</button>
                    <button id="wizard-template-elite-btn" class="template-button">Elite</button>
                </div>
            <div id="colorSelectContainer" class="color-select-container">
                <div class="color-option selected" data-color="#FF0000" style="background-color: #FF0000;"></div>
                <div class="color-option" data-color="#0084ff" style="background-color: #0084ff;"></div>
                <div class="color-option" data-color="#002900" style="background-color: #002900;"></div>
                <div class="color-option" data-color="#ff83f5" style="background-color: #ff83f5;"></div>
                <div class="color-option" data-color="#ffffff" style="background-color: #ffffff;"></div>
                <div class="color-option" data-color="#ffbf6c" style="background-color: #ffbf6c;"></div>
                <div class="color-option" data-color="#b48400" style="background-color: #b48400;"></div>
                <div class="color-option" data-color="#720042" style="background-color: #720042;"></div>
                
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
            <div id="buttonContainer" class="button-container">
                <button id="wizard-create-btn">Create</button>
                <button id="wizard-cancel-btn">Cancel</button>
            </div>
        </dialog>
    `;

    const element = document.createRange().createContextualFragment(htmlString).firstElementChild;


    element.style.backgroundColor = "lightgray";
    // Dialog Refresh -----------------------------------------------------------
    // Refresh the dialog each time it is clicked to ensure the selected image and color are reset
    element.addEventListener('click', () => {
        console.log('Tracker Wizard clicked');
        // Get Selected Color from Colorselection 
        let selectedColor = element.querySelector('.color-option.selected')?.style.backgroundColor;
        // Set Background of the selected image to the selected color
        element.querySelectorAll('.monster-icon').forEach(i => i.style.backgroundColor =  "transparent"); // Reset all images to transparent
        element.querySelectorAll('.template-button').forEach(i => i.style.backgroundColor =  "lightgrey"); // Reset all images to transparent
        element.querySelector('.monster-icon.selected').style.backgroundColor = selectedColor;
        element.querySelector('.template-button.selected').style.backgroundColor = selectedColor;
        
    });
    // Buttons -----------------------------------------------------------
    element.querySelector('#wizard-cancel-btn').addEventListener('click', () => element.close());
    element.querySelector('#wizard-create-btn').addEventListener('click', () => {
        const name = element.querySelector('#wizard-name-input').value;
        const selectedImage = element.querySelector('.monster-icon.selected')?.getAttribute('data-image') || 'img/monster-icon-abscheulichkeit.png';
        const color = element.querySelector('.color-option.selected')?.style.backgroundColor
        const health = parseInt(element.querySelector('#wizard-health-input').value, 10);
        const armor = parseInt(element.querySelector('#wizard-armor-input').value, 10);
        const focus = parseInt(element.querySelector('#wizard-focuspoints-input').value, 10);
        const move = parseInt(element.querySelector('#wizard-movingpoints-input').value, 10);
        const newMonsterTrackerEntity = new MonsterTrackerEntity(null, selectedImage,color, name, health, armor, focus, move);
        dbMonsterService.addMonsterTrackerEntity(newMonsterTrackerEntity);
        element.close();
    });
    element.querySelectorAll('.monster-icon').forEach(icon => {
        icon.addEventListener('click', () => {
            element.querySelectorAll('.monster-icon').forEach(i => i.classList.remove('selected'));
            icon.classList.add('selected');
        });
    });
    element.querySelectorAll('.color-option').forEach(colorOption => {
        colorOption.addEventListener('click', () => {
            element.querySelectorAll('.color-option').forEach(c => c.classList.remove('selected'));
            colorOption.classList.add('selected');
            const selectedColor = colorOption.getAttribute('data-color');
        });
    });
    element.querySelectorAll('.template-button').forEach(tmpB => {
        tmpB.addEventListener('click',()=>{
            element.querySelectorAll('.template-button').forEach(tmpB => {tmpB.classList.remove('selected')});
            tmpB.classList.add('selected');
        })
    });


    return element;
}