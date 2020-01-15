/* const ids = new Set(['Hi', 'Lion']);
console.log(ids.add('Miguel'));

ids.delete('Hi')

for(const entries of ids.entries()) {
    console.log(entries[1])
} */

/* const person1 = {name: 'Lionel'};
const person2 = {name: 'Miguel'};

const personData = new Map([[person1, [{date: 'Monday', time: '4:00 PM'}]]]);

personData.set(person2, [{date: 'Other', time: '10:00 AM'}])


console.log(personData);

console.log(personData.get(person1))

for (const entry of personData.entries()) {
    console.log(entry)
}

for (const [key, value] of personData.entries()) {
    console.log(key, value)
}

for (const key of personData.keys()) {
    console.log(key)
} */



function writeLogs(event, value) {
    /* let logEntries = {
        event: event,
        value: value,
        monster: monster,
        player: player
    } */
    return event * value;
}

const result = writeLogs(2, 2);
console.log(result)
