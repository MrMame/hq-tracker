import {dbMonsterService} from '../../domain/persistent/monsterTrackerDb.js';
import {MonsterTrackerEntity} from '../../domain/models/monsterTrackerEntity.js';
import { MonsterTypeChaosWarrior, MonsterTypeFimir, MonsterTypeGargoyle, MonsterTypeGoblin, MonsterTypeHexer, MonsterTypeMummy, MonsterTypeOrc, MonsterTypeSkeleton, MonsterTypeUnknown, MonsterTypeZombie } from '../../domain/models/monsterTypes.js';
import { MonsterNameService } from '../../domain/services/MonsterNameService.js';
import { MonsterEntityService } from '../../domain/services/MonsterEntityService.js';


export function createTrackerWizard() {
   


    const htmlString = `
        <dialog id="trackerWizard" class="tracker-wizard" closedby="any">
            <div id="imageSelectContainer" class="image-select-container">
                <div class="imageSelectorRow">
                    <img class="monster-icon " src="img/monster-icon-Goblin.png" data-image="img/monster-icon-Goblin.png">
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
                    <button id="wizard-template-easy-btn" class="template-button easy">Easy</button>
                    <button id="wizard-template-normal-btn" class="template-button normal">Normal</button>
                    <button id="wizard-template-hard-btn" class="template-button hard">Hard</button>
                    <button id="wizard-template-elite-btn" class="template-button elite">Elite</button>
                </div>
            <div id="colorSelectContainer" class="color-select-container">
                <div class="color-option" data-color="#FF0000" style="background-color: #FF0000;"></div>
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
    // const initMonster = MonsterEntityService.createGoblinEntity("easy");
    const initMonster = MonsterEntityService.createGoblinEntity("normal");
    // const initMonster = MonsterEntityService.createGoblinEntity("hard");
    // const initMonster = MonsterEntityService.createGoblinEntity("elite");

    // Init Monster Laden
    loadMonsterEntityInWizard(element,initMonster);



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
        const selectedImage = element.querySelector('.monster-icon.selected')?.getAttribute('data-image') || 'img/monster-icon-abscheulichkeit.png';
        const monsterType = MonsterTrackerEntity.getMonsterTypeFromImagePath(selectedImage);
        const name = element.querySelector('#wizard-name-input').value;
        const color = element.querySelector('.color-option.selected')?.style.backgroundColor
        const health = parseInt(element.querySelector('#wizard-health-input').value, 10);
        const armor = parseInt(element.querySelector('#wizard-armor-input').value, 10);
        const focus = parseInt(element.querySelector('#wizard-focuspoints-input').value, 10);
        const move = parseInt(element.querySelector('#wizard-movingpoints-input').value, 10);
        const newMonsterTrackerEntity = new MonsterTrackerEntity(null, selectedImage,color, name, health, armor, focus, move, monsterType);
        dbMonsterService.addMonsterTrackerEntity(newMonsterTrackerEntity);
        element.close();
    });
    element.querySelectorAll('.monster-icon').forEach(icon => {
        icon.addEventListener('click', () => {
            element.querySelectorAll('.monster-icon').forEach(i => i.classList.remove('selected'));
            icon.classList.add('selected');
            let selectedImage = element.querySelector('.monster-icon.selected')?.getAttribute('data-image') || 'img/monster-icon-abscheulichkeit.png';
            const monsterType = MonsterTrackerEntity.getMonsterTypeFromImagePath(selectedImage);
            if(monsterType.TYPENAME===MonsterTypeGoblin.TYPENAME){element.querySelector('#wizard-name-input').value = MonsterNameService.getGoblinName();}
            if(monsterType.TYPENAME===MonsterTypeOrc.TYPENAME){element.querySelector('#wizard-name-input').value = MonsterNameService.getOrcName();}
            if(monsterType.TYPENAME===MonsterTypeChaosWarrior.TYPENAME){element.querySelector('#wizard-name-input').value = MonsterNameService.getChaosWarriorName();}
            if(monsterType.TYPENAME===MonsterTypeFimir.TYPENAME){element.querySelector('#wizard-name-input').value = MonsterNameService.getFimirName();}
            if(monsterType.TYPENAME===MonsterTypeGargoyle.TYPENAME){element.querySelector('#wizard-name-input').value = MonsterNameService.getGargoyleName();}
            if(monsterType.TYPENAME===MonsterTypeHexer.TYPENAME){element.querySelector('#wizard-name-input').value = MonsterNameService.getHexerName();}
            if(monsterType.TYPENAME===MonsterTypeMummy.TYPENAME){element.querySelector('#wizard-name-input').value = MonsterNameService.getMummyName();}
            if(monsterType.TYPENAME===MonsterTypeSkeleton.TYPENAME){element.querySelector('#wizard-name-input').value = MonsterNameService.getSkeletonName();}
            if(monsterType.TYPENAME===MonsterTypeZombie.TYPENAME){element.querySelector('#wizard-name-input').value = MonsterNameService.getZombieName();}
            if(monsterType.TYPENAME===MonsterTypeUnknown.TYPENAME){element.querySelector('#wizard-name-input').value = MonsterNameService.getUnknownName();}
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


function loadMonsterEntityInWizard(element,monsterEntity){
    // Select image
    element.querySelectorAll('.monster-icon').forEach(c => c.classList.remove('selected'));
    element.querySelector(`.monster-icon[src="${monsterEntity.image}"]`).classList.add('selected');
    // Select Template-Button
    element.querySelectorAll('.template-button').forEach(c => c.classList.remove('selected'));
    element.querySelector(`.template-button.${monsterEntity.templateLevel}`).classList.add('selected');
    // Select Color
    element.querySelectorAll(`.color-option.selected`).forEach(c => { c.classList.remove('selected');});
    element.querySelector(`.color-option[data-color="${monsterEntity.color}"]`).classList.add('selected');
    // Set Monster Name
    element.querySelector(`#wizard-name-input`).value = monsterEntity.name;
    // Set Health
    element.querySelector(`#wizard-health-input`).value = monsterEntity.health;
    // Set Armor
    element.querySelector(`#wizard-armor-input`).value = monsterEntity.armor;
    // Set Focuspoints
    element.querySelector(`#wizard-focuspoints-input`).value = monsterEntity.focus;
    // Set MovingPoints
    element.querySelector(`#wizard-movingpoints-input`).value = monsterEntity.move;
}