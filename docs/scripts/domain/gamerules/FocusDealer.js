export class FocusDealer{
    
     static useFocusPoints(monsterTrackerEntity,amount){
        // Input Check
        if(monsterTrackerEntity.focus===undefined || monsterTrackerEntity.focus===null){monsterTrackerEntity.focus = 0;}
        // Lowering Health. No Minus Values allowed
        let newFocusValue = monsterTrackerEntity.focus - amount;
        if(newFocusValue<0){newFocusValue=0;}
        monsterTrackerEntity.focus = newFocusValue;
        return monsterTrackerEntity;
    }   

}