//Primeiro exercício
/*
console.log(x);
var x = 5;
console.log(y);
let y = 10;
*/
//Resultado: Undefined e erro em seguida

/*
function soma(_numbers) {
    var numbers = [..._numbers];
    var sum = 0;
    for(let i = 0; i < numbers.length; i++){
        sum+=numbers[i];
    }

    return sum;
}
console.log(soma([2,0,4,5,2,23,4]));

*/
/*
function calcularPreco(tipo) {
    let preco;

    switch(tipo) {
        case "eletrônico":
            preco = 1000;
        case "vestuário":
            preco = 200;
            break;
        case "alimento":
            preco = 50;
            break;
        default:
            preco = 0;
    }

    return preco;
}

console.log(calcularPreco("eletrônico"));
*/
/*
let numeros = [1, 2, 3, 4, 5];

let resultado = numeros.map(x => x * 2).filter(x => x > 5).reduce((a, b) => a + b, 0);

console.log(resultado);

let lista = ["banana", "maçã", "uva", "laranja"];
lista.splice(1, 2, "abacaxi", "manga");
console.log(lista);
*/
/*
class Pessoa {
    constructor(nome, idade) {
      this.nome = nome;
      this.idade = idade;
    }
  
    apresentar() {
      console.log(`Olá, meu nome é ${this.nome} e tenho ${this.idade} anos.`);
    }
  }
  
  class Funcionario extends Pessoa {
    constructor(nome, idade, salario) {
      super(nome, idade);
      this.salario = salario;
    }
  
    apresentar() {
      super.apresentar();
      console.log(`Meu salário é R$ ${this.salario}.`);
    }
}

let func = new Funcionario();
func.apresentar();

function somaArray(numeros) {
    let soma = 0;
    for (i = 0; i < numeros.length; i++) {
        soma += 2*numeros[i];
    }
    return soma;
}
console.log(somaArray([1, 2, 3, 4]));

*/

class Product{
    constructor(name,price){
    this.name = name;
    this.price = price;
    this.discount = .1;
    }

    //Criamos o método applyDiscount(), que alterará o preço atual. Seria possível também passar o preço como argumento do método e dar um return do novo valor. 
    applyDiscount(){
      this.price = this.price*(1-this.discount);
      console.log("O novo preço do(a) " + this.name.toLowerCase() + " será: " + this.price);
    }
}
//Criamos a classe child "Book", que vai herdar os métodos de Product
class Book extends Product{
    constructor(name, price) {
      super(name,price);
      this.discount = .2;
    }
  
}

 //Exemplo de uso
 //Instanciamos um novo livro e aplicamos o desconto uma vez.
  let bk = new Book('Livro',10);
  bk.applyDiscount();