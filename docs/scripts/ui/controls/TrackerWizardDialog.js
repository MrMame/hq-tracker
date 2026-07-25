import { MonsterEntityService } from '../../domain/services/MonsterEntityService.js';
import * as MonsterTemplateNames from '../../domain/models/monsterTemplateNames.js'
import * as MonsterColors from '../../domain/models/monsterColors.js'
import {MonsterTrackerEntity} from '../../domain/models/monsterTrackerEntity.js'
import { MonsterTypeChaosWarrior, MonsterTypeFimir, MonsterTypeGargoyle, MonsterTypeGoblin, MonsterTypeHexer, MonsterTypeMummy, MonsterTypeOrc, MonsterTypeSkeleton, MonsterTypeUnknown, MonsterTypeZombie } from '../../domain/models/monsterTypes.js';
import { MonsterNameService } from '../../domain/services/MonsterNameService.js';
import {dbMonsterService} from '../../domain/persistent/monsterTrackerDb.js';

export class TrackerWizardDialog{
    
    
    constructor(initMonsterEntity){
        this._dialogMonsterEntity = initMonsterEntity;
        this._elHtml =  this.createHtmlElement();
    }

    getHtmlElement(){
       return this._elHtml;
    }

    showDialog(){
        this._elHtml.showModal();
    }

    getMonsterEntityInWizard(){
        return this.createMonsterEntityFromWizardSettings();
    }

   createHtmlElement(){
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
                        <button id="wizard-template-easy-btn" class="template-button ${MonsterTemplateNames.Easy.toLowerCase()}">${MonsterTemplateNames.Easy}</button>
                        <button id="wizard-template-normal-btn" class="template-button ${MonsterTemplateNames.Normal.toLowerCase()}">${MonsterTemplateNames.Normal}</button>
                        <button id="wizard-template-hard-btn" class="template-button ${MonsterTemplateNames.Hard.toLowerCase()}">${MonsterTemplateNames.Hard}</button>
                        <button id="wizard-template-elite-btn" class="template-button ${MonsterTemplateNames.Elite.toLowerCase()}">${MonsterTemplateNames.Elite}</button>
                    </div>
                <div id="colorSelectContainer" class="color-select-container">
                    <div class="color-option" data-color=${MonsterColors.Red} style="background-color: ${MonsterColors.Red};"></div>
                    <div class="color-option" data-color=${MonsterColors.Blue} style="background-color: ${MonsterColors.Blue};"></div>
                    <div class="color-option" data-color=${MonsterColors.Green} style="background-color: ${MonsterColors.Green};"></div>
                    <div class="color-option" data-color=${MonsterColors.Pink} style="background-color: ${MonsterColors.Pink};"></div>
                    <div class="color-option" data-color=${MonsterColors.White} style="background-color: ${MonsterColors.White};"></div>
                    <div class="color-option" data-color=${MonsterColors.Yellow} style="background-color: ${MonsterColors.Yellow};"></div>
                    <div class="color-option" data-color=${MonsterColors.Gold} style="background-color: ${MonsterColors.Gold};"></div>
                    <div class="color-option" data-color=${MonsterColors.Purple} style="background-color: ${MonsterColors.Purple};"></div>
                    
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

        const elDialog = document.createRange().createContextualFragment(htmlString).firstElementChild;
       



        elDialog.style.backgroundColor = "lightgray";
        // Dialog Refresh -----------------------------------------------------------
        // Refresh the dialog each time it is clicked to ensure the selected image and color are reset
        elDialog.addEventListener('click', () => {
            console.log('Tracker Wizard clicked');
            // Get Selected Color from Colorselection 
            // let selectedColor = elDialog.querySelector('.color-option.selected')?.style.backgroundColor;
            // Set Background of the selected image to the selected color
            // elDialog.querySelectorAll('.monster-icon').forEach(i => i.style.backgroundColor =  "transparent"); // Reset all images to transparent
            // elDialog.querySelectorAll('.template-button').forEach(i => i.style.backgroundColor =  "lightgrey"); // Reset all images to transparent
            // elDialog.querySelector('.monster-icon.selected').style.backgroundColor = selectedColor;
            // elDialog.querySelector('.template-button.selected').style.backgroundColor = selectedColor;
            
        });
        // Buttons -----------------------------------------------------------
        elDialog.querySelector('#wizard-cancel-btn').addEventListener('click', () => elDialog.close());
        elDialog.querySelector('#wizard-create-btn').addEventListener('click', () => {
            const selectedImage = elDialog.querySelector('.monster-icon.selected')?.getAttribute('data-image') || 'img/monster-icon-abscheulichkeit.png';
            const monsterType = MonsterTrackerEntity.getMonsterTypeFromImagePath(selectedImage);
            const name = elDialog.querySelector('#wizard-name-input').value;
            const color = elDialog.querySelector('.color-option.selected')?.style.backgroundColor
            const health = parseInt(elDialog.querySelector('#wizard-health-input').value, 10);
            const armor = parseInt(elDialog.querySelector('#wizard-armor-input').value, 10);
            const focus = parseInt(elDialog.querySelector('#wizard-focuspoints-input').value, 10);
            const move = parseInt(elDialog.querySelector('#wizard-movingpoints-input').value, 10);
            const newMonsterTrackerEntity = new MonsterTrackerEntity(null, selectedImage,color, name, health, armor, focus, move, monsterType);
            dbMonsterService.addMonsterTrackerEntity(newMonsterTrackerEntity);
            elDialog.close();
        });
        elDialog.querySelectorAll('.monster-icon').forEach(icon => {
            icon.addEventListener('click', () => {
                // Select clicked image
                elDialog.querySelectorAll('.monster-icon').forEach(i => i.classList.remove('selected'));
                icon.classList.add('selected');
                let selectedImage = elDialog.querySelector('.monster-icon.selected')?.getAttribute('data-image') || 'img/monster-icon-abscheulichkeit.png';
                // Change Monster values
                this._dialogMonsterEntity.image = selectedImage;
                this._dialogMonsterEntity.monsterType = MonsterTrackerEntity.getMonsterTypeFromImagePath(selectedImage);
                // Random Name generation
                if(this._dialogMonsterEntity.monsterType.TYPENAME===MonsterTypeGoblin.TYPENAME){elDialog.querySelector('#wizard-name-input').value = MonsterNameService.getGoblinName();}
                if(this._dialogMonsterEntity.monsterType.TYPENAME===MonsterTypeOrc.TYPENAME){elDialog.querySelector('#wizard-name-input').value = MonsterNameService.getOrcName();}
                if(this._dialogMonsterEntity.monsterType.TYPENAME===MonsterTypeChaosWarrior.TYPENAME){elDialog.querySelector('#wizard-name-input').value = MonsterNameService.getChaosWarriorName();}
                if(this._dialogMonsterEntity.monsterType.TYPENAME===MonsterTypeFimir.TYPENAME){elDialog.querySelector('#wizard-name-input').value = MonsterNameService.getFimirName();}
                if(this._dialogMonsterEntity.monsterType.TYPENAME===MonsterTypeGargoyle.TYPENAME){elDialog.querySelector('#wizard-name-input').value = MonsterNameService.getGargoyleName();}
                if(this._dialogMonsterEntity.monsterType.TYPENAME===MonsterTypeHexer.TYPENAME){elDialog.querySelector('#wizard-name-input').value = MonsterNameService.getHexerName();}
                if(this._dialogMonsterEntity.monsterType.TYPENAME===MonsterTypeMummy.TYPENAME){elDialog.querySelector('#wizard-name-input').value = MonsterNameService.getMummyName();}
                if(this._dialogMonsterEntity.monsterType.TYPENAME===MonsterTypeSkeleton.TYPENAME){elDialog.querySelector('#wizard-name-input').value = MonsterNameService.getSkeletonName();}
                if(this._dialogMonsterEntity.monsterType.TYPENAME===MonsterTypeZombie.TYPENAME){elDialog.querySelector('#wizard-name-input').value = MonsterNameService.getZombieName();}
                if(this._dialogMonsterEntity.monsterType.TYPENAME===MonsterTypeUnknown.TYPENAME){elDialog.querySelector('#wizard-name-input').value = MonsterNameService.getUnknownName();}
                this.updateMonsterInWizard();
            });
        });
        elDialog.querySelectorAll('.color-option').forEach(colorOption => {
            colorOption.addEventListener('click', () => {
                elDialog.querySelectorAll('.color-option').forEach(c => c.classList.remove('selected'));
                colorOption.classList.add('selected');
                const selectedColor = colorOption.getAttribute('data-color');
                this._dialogMonsterEntity.color = selectedColor;
                this.updateMonsterInWizard();
            });
        });
        elDialog.querySelectorAll('.template-button').forEach(tmpB => {
            tmpB.addEventListener('click',()=>{
                // Select clicked Template Button
                elDialog.querySelectorAll('.template-button').forEach(tmpB => {tmpB.classList.remove('selected')});
                tmpB.classList.add('selected');
                // Read Target Template Name
                let selectedMonsterTemplateName = MonsterTemplateNames.parse(tmpB.innerText);
                let selectedMonstertype = this._dialogMonsterEntity.monsterType;
                // this._dialogMonsterEntity.templateLevel = selectedMonsterTemplateName;
                // this._dialogMonsterEntity = MonsterEntityService.createGoblinEntity(selectedMonsterTemplateName)
                this._dialogMonsterEntity = MonsterEntityService.CreateMonsterEntity(selectedMonstertype,selectedMonsterTemplateName);
                this.updateMonsterInWizard();
            })
        });


        elDialog.querySelector('#wizard-name-input').addEventListener('change',(ev)=>{
            this._dialogMonsterEntity.name = ev.target.value;
            this.updateMonsterInWizard();
        })
        elDialog.querySelector('#wizard-health-input').addEventListener('change',(ev)=>{
            this._dialogMonsterEntity.health = ev.target.value;
            this.updateMonsterInWizard();
        })
        elDialog.querySelector('#wizard-armor-input').addEventListener('change',(ev)=>{
            this._dialogMonsterEntity.armor = ev.target.value;
            this.updateMonsterInWizard();
        })
        elDialog.querySelector('#wizard-focuspoints-input').addEventListener('change',(ev)=>{
            this._dialogMonsterEntity.focus = ev.target.value;
            this.updateMonsterInWizard();
        })
        elDialog.querySelector('#wizard-movingpoints-input').addEventListener('change',(ev)=>{
            this._dialogMonsterEntity.move = ev.target.value;
            this.updateMonsterInWizard();
        })
        // Load Monster at the end to trigger all necessary events
         // Init Monster Laden
        this.loadMonsterEntityInWizard(elDialog,this._dialogMonsterEntity);
        return elDialog;
    }

    updateMonsterInWizard(){
        this.loadMonsterEntityInWizard(this._elHtml,this._dialogMonsterEntity);
    }


    loadMonsterEntityInWizard(element,monsterEntity){
        console.log("loading Monster in Wizard:",monsterEntity)
        // Select Color
        element.querySelectorAll(`.color-option.selected`).forEach(c => { c.classList.remove('selected');});
        element.querySelector(`.color-option[data-color="${monsterEntity.color}"]`).classList.add('selected');
        // Select image
        element.querySelectorAll('.monster-icon').forEach(c => c.classList.remove('selected'));
        let elImage = element.querySelector(`.monster-icon[src="${monsterEntity.image}"]`)
        elImage.classList.add('selected');
        // elImage.style.backgroundColor = monsterEntity.color;
        // Select and colorize Template-Button 
        element.querySelectorAll('.template-button').forEach(c => c.classList.remove('selected'));
        let elTmpBt = element.querySelector(`.template-button.${monsterEntity.templateLevel.toLowerCase()}`)
        elTmpBt.classList.add('selected');
        // elTmpBt.style.backgroundColor = monsterEntity.color;
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

}