import {dbMonsterService} from '../../domain/persistent/monsterTrackerDb.js';
import {MonsterTrackerEntity} from '../../domain/models/monsterTrackerEntity.js';
import { DamageDealer } from '../../domain/gamerules/DamageDealer.js';
import { FocusDealer } from '../../domain/gamerules/FocusDealer.js';



export class MonsterTrackerEventDialog{

    
    constructor() {
       this._elHtml =  this.createHtmlElement();
       this._monsterTrackerEntity = null;
    }


    getHtmlElement(){
       return this._elHtml;
    }

    loadMonster(monsterTrackerEntity){
        this._monsterTrackerEntity = monsterTrackerEntity;
        this._elHtml.querySelector('#tracker-event-dialog-health-input').value = monsterTrackerEntity.health;
        this._elHtml.querySelector('#tracker-event-dialog-armor-input').value = monsterTrackerEntity.armor;
        this._elHtml.querySelector('#tracker-event-dialog-focuspoints-input').value = monsterTrackerEntity.focus;

    }

    showDialog(){
        this._elHtml.showModal();
    }

    createHtmlElement(){
        const htmlString = `
            <dialog id="trackerEvent" class="tracker-event-dialog" closedby="any">


                <span>Normal Hit Damage Taken</span>
                <div id="buttonContainerNormalHitTaken" class="button-container">
                    <button class="normal-hit-damage-btn" data-value="1">1</button>
                    <button class="normal-hit-damage-btn" data-value="2">2</button>
                    <button class="normal-hit-damage-btn" data-value="3">3</button>
                    <button class="normal-hit-damage-btn" data-value="4">4</button>
                    <button class="normal-hit-damage-btn" data-value="5">5</button>
                    <button class="normal-hit-damage-btn" data-value="6">6</button>
                    <button class="normal-hit-damage-btn" data-value="7">7</button>
                    <button class="normal-hit-damage-btn" data-value="8">8</button>
                    <button class="normal-hit-damage-btn" data-value="9">9</button>
                    <button class="normal-hit-damage-btn" data-value="10">10</button>
                </div>

                <span>CRITICAL Hit Damage Taken</span>
                <div id="buttonContainerCriticalHitTaken" class="button-container">
                    <button class="critical-hit-damage-btn" data-value="1">1</button>
                    <button class="critical-hit-damage-btn" data-value="2">2</button>
                    <button class="critical-hit-damage-btn" data-value="3">3</button>
                    <button class="critical-hit-damage-btn" data-value="4">4</button>
                    <button class="critical-hit-damage-btn" data-value="5">5</button>
                    <button class="critical-hit-damage-btn" data-value="6">6</button>
                    <button class="critical-hit-damage-btn" data-value="7">7</button>
                    <button class="critical-hit-damage-btn" data-value="8">8</button>
                    <button class="critical-hit-damage-btn" data-value="9">9</button>
                    <button class="critical-hit-damage-btn" data-value="10">10</button>
                </div>

                <span>FOCUS Points used</span>
                <div id="buttonContainerFocusPointsUsed" class="button-container">
                    <button class="focus-points-used-btn" data-value="1">1</button>
                    <button class="focus-points-used-btn" data-value="2">2</button>
                    <button class="focus-points-used-btn" data-value="3">3</button>
                    <button class="focus-points-used-btn" data-value="4">4</button>
                    <button class="focus-points-used-btn" data-value="5">5</button>
                    <button class="focus-points-used-btn" data-value="6">6</button>
                    <button class="focus-points-used-btn" data-value="7">7</button>
                    <button class="focus-points-used-btn" data-value="8">8</button>
                    <button class="focus-points-used-btn" data-value="9">9</button>
                    <button class="focus-points-used-btn" data-value="10">10</button>
                </div>


                <div id="statsInputContainer" class="stats-input-container">
                    <label>Health
                        <input id="tracker-event-dialog-health-input" type="number" placeholder="Health">
                    </label>
                    <label>Armor
                        <input id="tracker-event-dialog-armor-input" type="number" placeholder="Armor">
                    </label>
                    <label>Focus
                        <input id="tracker-event-dialog-focuspoints-input" type="number" placeholder="Focus">
                    </label>
                </div>
            </dialog>
        `;

        const elDialog = document.createRange().createContextualFragment(htmlString).firstElementChild;


        elDialog.style.backgroundColor = "lightgray";
        // Dialog Refresh -----------------------------------------------------------
        // Refresh the dialog each time it is clicked to ensure the selected image and color are reset
        elDialog.addEventListener('click', (el) => {
            el.stopPropagation();
        });
        // Buttons -----------------------------------------------------------
        elDialog.querySelectorAll('.normal-hit-damage-btn').forEach(el=>{
            el.addEventListener('click',(el)=>{
               el.stopPropagation();
                let normalHitDamage = el.target.dataset.value;
                console.log("Hit taken : " + normalHitDamage);
                DamageDealer.hitNormalDamage(this._monsterTrackerEntity,normalHitDamage);
                dbMonsterService.updateMonsterTrackerEntity(this._monsterTrackerEntity.key,this._monsterTrackerEntity);
                this._elHtml.close();
            });
        });

        elDialog.querySelectorAll('.critical-hit-damage-btn').forEach(el=>{
            el.addEventListener('click',(el)=>{
               el.stopPropagation();
                let criticalHitDamage = el.target.dataset.value;
                console.log("Critical Hit taken : " + criticalHitDamage);
                DamageDealer.hitCriticalDamage(this._monsterTrackerEntity,criticalHitDamage);
                dbMonsterService.updateMonsterTrackerEntity(this._monsterTrackerEntity.key,this._monsterTrackerEntity);
                this._elHtml.close();
            });
        });

        elDialog.querySelectorAll('.focus-points-used-btn').forEach(el=>{
            el.addEventListener('click',(el)=>{
               el.stopPropagation();
                let focusPointsUsed = el.target.dataset.value;
                console.log("Focus Points used : " + focusPointsUsed);
                FocusDealer.useFocusPoints(this._monsterTrackerEntity,focusPointsUsed);
                dbMonsterService.updateMonsterTrackerEntity(this._monsterTrackerEntity.key,this._monsterTrackerEntity);
                this._elHtml.close();
            });
        });

        elDialog.querySelector('#tracker-event-dialog-health-input').addEventListener('change',(el) => {
            let newVal = el.target.value;
            if(newVal<0){newVal=0;}
            this._monsterTrackerEntity.health = newVal;
            dbMonsterService.updateMonsterTrackerEntity(this._monsterTrackerEntity.key,this._monsterTrackerEntity);
        });
         elDialog.querySelector('#tracker-event-dialog-armor-input').addEventListener('change',(el) => {
            let newVal = el.target.value;
            if(newVal<0){newVal=0;}
            this._monsterTrackerEntity.armor = newVal;
            dbMonsterService.updateMonsterTrackerEntity(this._monsterTrackerEntity.key,this._monsterTrackerEntity);
        });
         elDialog.querySelector('#tracker-event-dialog-focuspoints-input').addEventListener('change',(el) => {
            let newVal = el.target.value;
            if(newVal<0){newVal=0;}
            this._monsterTrackerEntity.focus = newVal;
            dbMonsterService.updateMonsterTrackerEntity(this._monsterTrackerEntity.key,this._monsterTrackerEntity);
        });

        return elDialog;
    }




}