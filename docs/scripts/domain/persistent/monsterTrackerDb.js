import * as storage from '../../system/persistent/localStorage.js';



class MonsterDbService extends EventTarget{


    async addMonsterTrackerEntity(monsterTrackerEntity) {
        let key = storage.save(monsterTrackerEntity);
        const monsterSavedEvent = new CustomEvent('monsterSaved', {
            detail: monsterTrackerEntity
        });
        const monsterDbUpdatedEvent = new CustomEvent('monsterDbUpdated', {
            detail: storage.getAllKeyValuePairs()
        });
        // 4. Das Event abfeuern
        this.dispatchEvent(monsterSavedEvent);
        this.dispatchEvent(monsterDbUpdatedEvent);
    }


    async clearMonsterTrackerEntities() {
        storage.clearAllData();
        const monsterDbUpdatedEvent = new CustomEvent('monsterDbUpdated', {
            detail: storage.getAllKeyValuePairs()
        });
        this.dispatchEvent(monsterDbUpdatedEvent);
    }

    async updateMonsterTrackerEntities(monsterTrackerEntity) {
        // Update the data in localStorage
        storage.save(monsterTrackerEntity);  
    }

    async deleteMonsterTrackerEntity(key) {
        storage.deleteKeyValuePair(key);
        const monsterDbUpdatedEvent = new CustomEvent('monsterDbUpdated', {
            detail: storage.getAllKeyValuePairs()
        });
        this.dispatchEvent(monsterDbUpdatedEvent);
    }

    async updateMonsterTrackerEntity(key, updatedData) {
        // Retrieve the existing entity from localStorage
        const existingEntity = storage.getKeyValuePair(key);
        if (existingEntity) {
            // Update the properties of the existing entity with the new data
            Object.assign(existingEntity, updatedData);
            // Save the updated entity back to localStorage
            storage.save(existingEntity);
        }
}
}

// Eine einzige Instanz exportieren (Singleton-Muster)
export const dbMonsterService = new MonsterDbService();