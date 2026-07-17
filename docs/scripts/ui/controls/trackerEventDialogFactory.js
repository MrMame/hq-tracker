import {dbMonsterService} from '../../domain/persistent/monsterTrackerDb.js';
import {MonsterTrackerEntity} from '../../domain/models/monsterTrackerEntity.js';


export function createTrackerEventDialog() {
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
    elDialog.addEventListener('click', () => {
        console.log('Tracker Event Dialog clicked');
        // Get Selected Color from Colorselection 
        let selectedColor = elDialog.querySelector('.color-option.selected')?.style.backgroundColor;
        // Set Background of the selected image to the selected color
        elDialog.querySelectorAll('.monster-icon').forEach(i => i.style.backgroundColor =  "transparent"); // Reset all images to transparent
        elDialog.querySelectorAll('.template-button').forEach(i => i.style.backgroundColor =  "lightgrey"); // Reset all images to transparent
        elDialog.querySelector('.monster-icon.selected').style.backgroundColor = selectedColor;
        elDialog.querySelector('.template-button.selected').style.backgroundColor = selectedColor;
        
    });
    // Buttons -----------------------------------------------------------
    elDialog.querySelectorAll('.normal-hit-damage-btn').forEach(el=>{
        el.addEventListener('click',(el)=>{
            let normalHitDamage = el.target.dataset.value;
            console.log("Hit taken : " + normalHitDamage);
            throw new error ("not implememted";)
        });
    });

    return elDialog;
}