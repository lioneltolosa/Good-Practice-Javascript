const ATTACK_VALUE = 10;
const STRONG_ATTACK_VALUE = 17;
const MONSTER_ATTACK_VALUE = 14;
const HEAL_VALUE = 20;


let chosenMaxLife = 100;
let currentMonsterHealth = chosenMaxLife;
let currentPlayerHealth = chosenMaxLife;
let hasBonusLife = true;

adjustHealthBars(chosenMaxLife);

function reset() {
    currentMonsterHealth = chosenMaxLife;
    currentPlayerHealth = chosenMaxLife;
    resetGame(chosenMaxLife);
}

function endRound() {
    const initialPlayerHealth = currentPlayerHealth;
    const playerDamage = dealPlayerDamage(MONSTER_ATTACK_VALUE)
    currentPlayerHealth -= playerDamage

    if (currentPlayerHealth <= 0 && hasBonusLife) {
        hasBonusLife = false;
        removeBonusLife();
        currentPlayerHealth = initialPlayerHealth;
        setPlayerHealth(initialPlayerHealth)
        alert('You would be dead but the bonus life saved')
    }

    if (currentMonsterHealth <= 0 && currentPlayerHealth > 0) {
        alert('You Won')
        // reset()
    } else if (currentPlayerHealth <= 0 && currentMonsterHealth > 0) {
        alert('You Lost')
        // reset()
    } else if(currentMonsterHealth <= 0 && currentPlayerHealth <= 0) {
        alert('You have a draw')
        // reset()
    }

    if ( currentMonsterHealth <= 0 || currentPlayerHealth <=0) {
        reset();
    }
}

function attackHandlerGeneric (mode){
    let maxDamage;
    if(mode === 'ATTACK') {
        maxDamage = ATTACK_VALUE
    } else if (mode === 'STRONG_ATTACK') {
        maxDamage = STRONG_ATTACK_VALUE
    }

    const damage = dealMonsterDamage(maxDamage);
    currentMonsterHealth -= damage;

    endRound();
}

function attackHandler() {
    attackHandlerGeneric('ATTACK')
}

function strongAttackHandler() {
    attackHandlerGeneric('STRONG_ATTACK')
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

    increasePlayerHealth(HEAL_VALUE)
    currentPlayerHealth += HEAL_VALUE;
    endRound();
}

attackBtn.addEventListener('click', attackHandler);
strongAttackBtn.addEventListener('click', strongAttackHandler);
healBtn.addEventListener('click', healPlayerHandler);