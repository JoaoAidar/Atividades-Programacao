//Importamos o módulo readline para poder fazer perguntas ao usuário
const readline = require("readline");

//Criamos uma interface para poder fazer perguntas ao usuário
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

//Criamos um array de frutas com o nome e o preço de cada uma
const fruits = [
    ['maçã', 2],
    ['banana', 1.5],
    ['laranja', 3],
    ['pera', 2.5]
];

//Variáveis para guardar o recibo e o total da compra
let recibo = "";
let total = 0;
let i = 0;

//Função para fazer a pergunta ao usuário
function askQuestion() {
    if (i < fruits.length) {
        rl.question(`Quantas ${fruits[i][0]}s você quer? `, function (number) {
            number = parseInt(number);
            //Calculamos o subtotal e adicionamos ao total
            let price = fruits[i][1];
            let subtotal = price * number;
            total += subtotal;
            recibo += `${fruits[i][0]} - ${number} - R$ ${subtotal}\n`;
            i++;
            askQuestion();
        });
    } else {
        //Quando o usuário terminar de responder todas as perguntas, mostramos o recibo
        recibo += `Total: R$ ${total}`;
        console.log("Recibo: ");
        console.log(recibo);
        rl.close();
    }
}
//Quando o usuário fecha o programa, finalizamos o processo
rl.on("close", function () {
    //console.log("Programa finalizado");
    process.exit(0);
});
//Chamamos a função para fazer a pergunta ao usuário
askQuestion();