export class DamageDealer{
    
    // Normal damage applies to armor first, then health
    static hitNormalDamage(monsterTrackerEntity,damageAmount){
        // Input Check
        if(monsterTrackerEntity.armor===undefined || monsterTrackerEntity.armor===null){monsterTrackerEntity.armor = 0;}
        if(monsterTrackerEntity.health===undefined || monsterTrackerEntity.health===null){monsterTrackerEntity.health = 0;}

        // Before lowering health, armor will be damaged    
        let healthDamage=0;
        let newArmorValue = monsterTrackerEntity.armor - damageAmount;
        // If Damage was greater than actual armor, the difference lowers health instantly
        if(newArmorValue<0){
            healthDamage = Math.abs(newArmorValue);
            newArmorValue = 0;  // New Armor Value may never lower as 0
        }
        // Set new Values
        monsterTrackerEntity.armor = newArmorValue;
        let newHealthValue = monsterTrackerEntity.health - healthDamage;
        if(newHealthValue<0){newHealthValue=0;}
        monsterTrackerEntity.health = newHealthValue;

        return monsterTrackerEntity;
    }   

    // Critical damage applies directly to health.
     static hitCriticalDamage(monsterTrackerEntity,damageAmount){
        // Input Check
        if(monsterTrackerEntity.health===undefined || monsterTrackerEntity.health===null){monsterTrackerEntity.health = 0;}
        // Lowering Health. No Minus Values allowed
        let newHealthValue = monsterTrackerEntity.health - damageAmount;
        if(newHealthValue<0){newHealthValue=0;}
        monsterTrackerEntity.health = newHealthValue;
        return monsterTrackerEntity;
    }   

}