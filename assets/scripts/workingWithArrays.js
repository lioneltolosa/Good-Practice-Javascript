/* const numbers = [1, 2, 3];
console.log(numbers);

// const moreNumbers = Array(5, 2);
// console.log(moreNumbers);

// const yetMoreNumbers = Array.of(1, 2);
// console.log(yetMoreNumbers);

const listItems = document.querySelectorAll('li');
console.log(listItems);

const arrayListItems = Array.from(listItems);
console.log(arrayListItems); */





// SPLICE

/* 
const hobbies = ['Coding', 'Fishing', 'Cooking'];

hobbies.push('Running', 'Holis');

hobbies.splice(1, 0, 'Good Food', 'Jolis');

hobbies.splice(0, 1) // Elimina el primer item del array

hobbies.splice(0); // Elimina todos los items del array

hobbies.push('Running', 'Holis');

hobbies.splice(1);

hobbies.push('Uno', 'Dos', 'Tres');

hobbies.splice(0, 1);

hobbies.splice(1); // Elimina todos desde el primer item del array y solo queda Uno

hobbies.push('Uno', 'Dos', 'Tres');

hobbies.splice(-1, 1); // Elimina el ultimo item del array;

hobbies.splice(0);

hobbies.push('Uno', 'Dos', 'Tres');

hobbies.push(-2, 1);

hobbies.splice(0)

hobbies.push('Uno', 'Dos', 'Tres');

hobbies.splice(-2, 1); // Elimina en este caso el Dos

hobbies.splice(0)

hobbies.push('Uno', 'Dos', 'Tres');

hobbies.splice(-2, 2);

console.log('Hobbies', hobbies);
 */




// SLICE

/* const testResult = [1, 2, 5.3, 10.99, -5, 10];

const storeResults = testResult.slice(0, 10);

testResult.push(888);

console.log(testResult);

console.log(storeResults) */

/* console.log('Slice', testResult.slice()); */





// CONCAT

/* const testResult = [1, 2, 3, 4, 5];

const storeResult = testResult.concat([6, 7, 8, 9, 10]);

testResult.push(555);

console.log(testResult)

console.log(storeResult) */






// IndexOf and lastIndexOf

/* const testResult = [1, 2, 3, 4, 5];

console.log(testResult.indexOf(5)) 

const persons = [
    {name: 'Lionel'},
    {name: 'Mateo'},
    {name: 'Andrea'}
]

console.log(persons)

const finding = persons.find((person, idx, persons) => {
    return person.name === 'Lionel';
})

finding.name = 'Tolosa';

console.log(finding, persons)

const indexTolosa = persons.findIndex((person, idx, persons) => {
    return person.name === 'Tolosa'
})

console.log(indexTolosa) */




// INCLUDE

/* const testResultInclude = [1, 2, 3, 4, 5];

console.log('Include', testResultInclude.includes(3)) */




// FOR EACH

/* const price = [100, 25000];
const iva = 21;
const totalPriceIva = []

price.forEach((price, index) => {
    const priceObj = { index: index, priceIva: (price * iva)/100 }
    totalPriceIva.push(priceObj);
})

console.log('Total precio con Iva', totalPriceIva) */





// MAP()

/* const price = [100, 25000];
const iva = 21;

const taskAjustedPrices = price.map((price, index) => {
    const priceObj = { index: index, priceIva: (price * iva)/100 }
   return priceObj;
})

console.log(price, taskAjustedPrices) */





const testResultInclude = [1, 2, 3, 4, 5];

const filterArray = testResultInclude.filter((price, index, prices) => {
    return index;
});

const filterArrayShort = testResultInclude.filter(price => price > 3);

console.log(filterArray, filterArrayShort)





// SPREAD OPERATOR

const persons = [
    {name: 'Lionel', age: 32},
    {name: 'Andrea', age: 32},
    {name: 'Mateo', age: 2}
];

const copiePersons = [
    ...persons.map((person) => ({ name: person.name, age: person.age }))];

persons.push({name: 'Valentina', age: 30});

persons[0].age = 90;

console.log('Origi Persons', persons);
console.log('Copie Persons', copiePersons);