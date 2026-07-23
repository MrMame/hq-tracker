import * as GobNames from './../models/monsterNamesGoblin.js';
import * as GargNames from './../models/monsterNamesGargoyle.js'
import * as HexNames from './../models/monsterNamesHexer.js'
import * as MummNames from './../models/monsterNamesMummy.js'
import * as OrcNames from './../models/monsterNamesOrcs.js'
import * as SkelNames from './../models/monsterNamesSkeleton.js'
import * as ZombNames from './../models/monsterNamesZombie.js'
import * as FimNames from './../models/monsterNamesFimir.js'

export class MonsterNameService{
    static getGoblinName()          {return this.getRandomName(GobNames);}
    static getOrcName()             {return this.getRandomName(OrcNames);}
    static getChaosWarriorName()    {}
    static getFimirName()           {return this.getRandomName(FimNames);}
    static getGargoyleName()        {return this.getRandomName(GargNames);}
    static getHexerName()           {return this.getRandomName(HexNames);}
    static getMummyName()           {return this.getRandomName(MummNames);}
    static getSkeletonName()        {return this.getRandomName(SkelNames);}
    static getZombieName()          {return this.getRandomName(ZombNames);}
    static getUnknownName()         {}



    static getRandomName(NameObject){
        const firstNames = NameObject.first_names;
        const lastNames = NameObject.last_names;

        // Erzeuge einen zufälligen Index basierend auf der Array-Länge
        const randomFirst = firstNames[Math.floor(Math.random() * firstNames.length)];
        const randomLast = lastNames[Math.floor(Math.random() * lastNames.length)];

        // Kombiniere die Namen mit einem Leerzeichen dazwischen
        return `${randomFirst} ${randomLast}`;

    }
}