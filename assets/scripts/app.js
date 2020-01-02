const ATTACK_VALUE = 10;
const STRONG_ATTACK_VALUE = 17;
const MONSTER_ATTACK_VALUE = 14;
const HEAL_VALUE = 20;

// CONSTANTS MODE 
const MODE_ATTACK = 'ATTACK'; // MODE_ATTACK = 0
const MODE_STRONG_ATTACK = 'STRONG_ATTACK'; // MODE_STRONG_ATTACK = 1

// CONSTANTS LOGS
const LOG_EVENT_PLAYER_ATTACK = 'PLAYER_ATTACK';
const LOG_EVENT_PLAYER_STRONG_ATTACK = 'PLAYER_STRONG_ATTACK';
const LOG_EVENT_MONSTER_ATTACK = 'MONSTER_ATTACK';
const LOG_EVENT_PLAYER_HEAL = 'PLAYER_HEAL';
const LOG_EVENT_GAME_OVER = 'GAME_OVER';

function getMaxLifeValues() {
    const enteredValue = prompt('Life', '100');

    const parsedValue = parseInt(enteredValue);
    if(isNaN(parsedValue) || parsedValue <= 0) {
        throw {message: 'Invalid user input, not a number'};
    }
    return parsedValue;
}

let chosenMaxLife = getMaxLifeValues();

let currentMonsterHealth = chosenMaxLife;
let currentPlayerHealth = chosenMaxLife;

let hasBonusLife = true;
let battleLog = [];
let lastLoggedEntry;

adjustHealthBars(chosenMaxLife);

function writeLog(event, value, monsterHealth, playerHealt) {
    let logEntry = {
        event: event,
        value: value,
        finalMonsterHealth: monsterHealth,
        finalPlayerHealth: playerHealt
    };

    // SWITCH CASE - LOGS
    switch (event) {
        case LOG_EVENT_PLAYER_ATTACK:
            logEntry.target = 'MONSTER';
            break;
        case LOG_EVENT_PLAYER_STRONG_ATTACK:
            logEntry = {
                event: event,
                value: value,
                target: 'MONSTER',
                finalMonsterHealth: monsterHealth,
                finalPlayerHealth: playerHealt
            };
            break;
        case LOG_EVENT_MONSTER_ATTACK:
            logEntry = {
                event: event,
                value: value,
                target: 'PLAYER',
                finalMonsterHealth: monsterHealth,
                finalPlayerHealth: playerHealt
            };
            break;
        case LOG_EVENT_PLAYER_HEAL:
            logEntry = {
                event: event,
                value: value,
                target: 'PLAYER',
                finalMonsterHealth: monsterHealth,
                finalPlayerHealth: playerHealt
            };
            break;
        case LOG_EVENT_GAME_OVER:
            logEntry = {
                event: event,
                value: value,
                finalMonsterHealth: monsterHealth,
                finalPlayerHealth: playerHealt
            };
        break;
        default:
            logEntry = {};
    }
    // IF AND ELSE IF - LOGS

    /* if(event === LOG_EVENT_PLAYER_ATTACK) {
        logEntry.target = 'MONSTER'
    } else if (event === LOG_EVENT_PLAYER_STRONG_ATTACK) {
        logEntry = {
            event: event,
            value: value,
            target: 'MONSTER',
            finalMonsterHealth: monsterHealth,
            finalPlayerHealth: playerHealt
        }
    } else if (event === LOG_EVENT_MONSTER_ATTACK) {
        logEntry = {
            event: event,
            value: value,
            target: 'PLAYER',
            finalMonsterHealth: monsterHealth,
            finalPlayerHealth: playerHealt
        }
    } else if (event === LOG_EVENT_PLAYER_HEAL) {
        logEntry = {
            event: event,
            value: value,
            target: 'PLAYER',
            finalMonsterHealth: monsterHealth,
            finalPlayerHealth: playerHealt
        }
    } else if (event === LOG_EVENT_GAME_OVER) {
        logEntry = {
            event: event,
            value: value,
            finalMonsterHealth: monsterHealth,
            finalPlayerHealth: playerHealt
        }
    } */
    battleLog.push(logEntry);
}

function reset() {
    currentMonsterHealth = chosenMaxLife; // 100 pts
    currentPlayerHealth = chosenMaxLife; // 100 pts
    hasBonusLife = true;
    resetGame(chosenMaxLife);
}

function endRound() {
    const initialPlayerHealth = currentPlayerHealth;
    const playerDamage = dealPlayerDamage(MONSTER_ATTACK_VALUE)
    currentPlayerHealth -= playerDamage

    writeLog(
        LOG_EVENT_MONSTER_ATTACK, 
        playerDamage, 
        currentMonsterHealth, 
        currentPlayerHealth
    );

    if (currentPlayerHealth <= 0 && hasBonusLife) {
        hasBonusLife = false;
        removeBonusLife();
        currentPlayerHealth = initialPlayerHealth;
        setPlayerHealth(initialPlayerHealth)
        alert('You would be dead but the bonus life saved')
    }

    if (currentMonsterHealth <= 0 && currentPlayerHealth > 0) {
        alert('You Won');
        writeLog(
            LOG_EVENT_GAME_OVER, 
            'PLAYER WON', 
            currentMonsterHealth, 
            currentPlayerHealth
        );
        reset();
    } else if (currentPlayerHealth <= 0 && currentMonsterHealth > 0) {
        alert('You Lost');
        writeLog(
            LOG_EVENT_GAME_OVER, 
            'MONSTER WON', 
            currentMonsterHealth, 
            currentPlayerHealth
        );
        reset();
    } else if(currentMonsterHealth <= 0 && currentPlayerHealth <= 0) {
        alert('You have a draw');
        writeLog(
            LOG_EVENT_GAME_OVER, 
            'A DRAW', 
            currentMonsterHealth, 
            currentPlayerHealth
        );
        reset();
    }
    /* if ( currentMonsterHealth <= 0 || currentPlayerHealth <=0) {
        reset();
    } */
}

function attackHandlerGeneric (mode) {
    let maxDamage = mode === MODE_ATTACK ? ATTACK_VALUE : STRONG_ATTACK_VALUE;
    let logEvent =  mode === MODE_ATTACK ? LOG_EVENT_PLAYER_ATTACK : LOG_EVENT_PLAYER_STRONG_ATTACK;
    /* if(mode === MODE_ATTACK) {
        maxDamage = ATTACK_VALUE;
        logEvent = LOG_EVENT_PLAYER_ATTACK;
    } else if (mode === MODE_STRONG_ATTACK) {
        maxDamage = STRONG_ATTACK_VALUE;
        logEvent = LOG_EVENT_PLAYER_STRONG_ATTACK;
    } */

    const damage = dealMonsterDamage(maxDamage);
    currentMonsterHealth -= damage;

    writeLog(
        logEvent, 
        damage, 
        currentMonsterHealth, 
        currentPlayerHealth
    );

    endRound();
}

function attackHandler() {
    attackHandlerGeneric(MODE_ATTACK)
}

function strongAttackHandler() {
    attackHandlerGeneric(MODE_STRONG_ATTACK)
}

function healPlayerHandler() {  
    let healValue;
    if(currentPlayerHealth >= chosenMaxLife - HEAL_VALUE) {
        alert('You cant heal to more than your initial max health');
        healValue = chosenMaxLife - currentPlayerHealth
        console.log('if', healValue);
        } else {
        healValue = HEAL_VALUE;
        console.log('else', healValue)
    }

    increasePlayerHealth(healValue)
    currentPlayerHealth += healValue;
    writeLog(
        LOG_EVENT_PLAYER_HEAL, 
        healValue, 
        currentMonsterHealth, 
        currentPlayerHealth
    );
    endRound();
}

function printLogHandler() {
    for(let i = 0; i < battleLog.length; i++) {
        console.log('----------')
    }

    let j = 0
    outherWhile: do {  // Labeled Statements
        console.log('Outer', j)
        innerFor: for(let k = 0; k < 5; k++) { // Labeled Statements
            if (k === 3) {
                break outherWhile;
                // continue outherWhile  // This is dangerous - Infinite Loop!
            }
            console.log('Inner', k)
        }
        j++;
    } while (j < 3);

    let i = 0;
    /* for(const logEntry of battleLog) {
        console.log('For OF lopp', logEntry)
        console.log('For OF lopp', i)
    }

    for(const key in battleLog) {
        console.log('For in loop', key);
        console.log('For in loop', battleLog[key]);
    } */

    for(const logEntry of battleLog) {
        if(!lastLoggedEntry && lastLoggedEntry !== 0 || lastLoggedEntry < i) {
            console.log(`#${i}`);
            for(const key in logEntry) {
                console.log(`${key} => ${logEntry[key]}`) 
            }
            lastLoggedEntry = i;
            break;
        }
        i++
    }
}

attackBtn.addEventListener('click', attackHandler);
strongAttackBtn.addEventListener('click', strongAttackHandler);
healBtn.addEventListener('click', healPlayerHandler);
logBtn.addEventListener('click', printLogHandler);
