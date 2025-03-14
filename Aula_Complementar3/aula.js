/*
//Contar de 1 até 5

for(let i = 0; i <= 5; i++){
    console.log(i);
}

var ar = ['a','b'];
for(let i = 0; i < ar.length; i++){
    console.log(ar[i]);
}

//Setamos as arrays de pares e ímpares
var evens = [];
var odds = [];

//Iteramos entre os números entre 0 e 10, e checamos se são pares ou ímpares
for(let i = 0; i <= 10; i++){ 
    //Adicionamos os números em suas respectivas listas
    if(i % 2 === 0) {
        evens.push(i);
    } else {
        odds.push(i);
    }
}

*/

const Fruits = Object.freeze({ 
    Apple : 'Apple',
    Orange : 'Orange',
    Banana : 'Banana'
})

var shopInventory = [];

function addFruit(fruit, price) {
    shopInventory.push([fruit,price]);
}

addFruit(Fruits.Apple,3)
addFruit(Fruits.Banana,1)
console.table(shopInventory);
