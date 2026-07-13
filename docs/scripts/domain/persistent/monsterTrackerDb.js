import * as storage from '../../system/persistent/localStorage.js';



class MonsterDbService extends EventTarget{


    async addMonsterTrackerData(monsterData) {
        storage.save(monsterData);

    // 3. Das Event erstellen und die Daten in "detail" packen
        const event = new CustomEvent('eintragGespeichert', {
            detail: monsterData
        });

        // 4. Das Event abfeuern
        this.dispatchEvent(event);
        
        return monsterData;

    }


}


// Eine einzige Instanz exportieren (Singleton-Muster)
export const dbMonsterService = new MonsterDbService();