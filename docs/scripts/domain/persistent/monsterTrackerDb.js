import * as storage from '../../system/persistent/localStorage.js';



class MonsterDbService extends EventTarget{


    async addMonsterTrackerData(monsterData) {
        let key = storage.save(monsterData);
        const monsterSavedEvent = new CustomEvent('monsterSaved', {
            detail: monsterData
        });
        const monsterDbUpdatedEvent = new CustomEvent('monsterUpdated', {
            detail: storage.getAllData()
        });
        // 4. Das Event abfeuern
        this.dispatchEvent(monsterSavedEvent);
        this.dispatchEvent(monsterDbUpdatedEvent);
    }


    async clearMonsterTrackerData() {
        storage.clearAllData();
        const monsterDbUpdatedEvent = new CustomEvent('monsterUpdated', {
            detail: storage.getAllData()
        });
        this.dispatchEvent(monsterDbUpdatedEvent);
    }

    async updateMonsterTrackerData(monsterData) {
        // Update the data in localStorage
        storage.save(monsterData);  
    }

}


// Eine einzige Instanz exportieren (Singleton-Muster)
export const dbMonsterService = new MonsterDbService();