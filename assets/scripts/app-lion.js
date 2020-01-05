const ATTACK_VALUE = 10;
const STRONG_ATTACK_VALUE = 15

const MODE_ATTACK = 'ATTACK'; // MODE_ATTACK = 0
const MODE_STRONG_ATTACK = 'STRONG_ATTACK'; // MODE_STRONG_ATTACK = 1

let chosenMaxLife = 100;
let currentMonsterHealth = chosenMaxLife;
let currentPlayerHealth = chosenMaxLife;

adjustHealthBars(chosenMaxLife);

function genericAttackHandler(mode) {
    const maxDamage = mode === MODE_ATTACK ? ATTACK_VALUE : STRONG_ATTACK_VALUE;

    /* if(mode === MODE_ATTACK) {
        maxDamage = ATTACK_VALUE;
    } else if (mode === MODE_STRONG_ATTACK) {
        maxDamage = STRONG_ATTACK_VALUE;
    } */

    const damage = dealMonsterDamage(maxDamage);
    currentMonsterHealth = dealMonsterDamage - damage;
    const damagePlayer = dealPlayerDamage(maxDamage);
    currentPlayerHealth = dealPlayerDamage - damagePlayer;

    if(currentMonsterHealth <= 0 && currentPlayerHealth > 0) {
        alert('You Win')
    } else if (currentPlayerHealth <= 0 && currentMonsterHealth > 0) {
        alert('You Lost')
    }
}

function attackHandler() {
    genericAttackHandler(MODE_ATTACK);
}

function attackHandlerMonster() {
    genericAttackHandler(MODE_STRONG_ATTACK);
}

attackBtn.addEventListener('click', attackHandler);
strongAttackBtn.addEventListener('click', attackHandlerMonster);