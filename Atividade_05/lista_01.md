# Instruções
- Faça uma cópia deste arquivo .md para um repositório próprio
- Resolva as 8 questões objetivas assinalando a alternativa correta e **justificando sua resposta.**
- Resolva as 2 questões dissertativas escrevendo no próprio arquivo .md
- Lembre-se de utilizar as estruturas de código como ``esta aqui com ` ``ou
```javascript
//esta aqui com ```
let a = "olá"
let b = 10
print(a)
```
- Resolva as questões com uso do Visual Studio Code ou ambiente similar.
- Teste seus códigos antes de trazer a resposta para cá.
- Cuidado com o uso de ChatGPT (e similares), pois entregar algo só para ganhar nota não fará você aprender. Não seja dependente da máquina!
- Ao final, publique seu arquivo lista_01.md com as respostas em seu repositório, e envie o link pela Adalove. 

# Questões objetivas
**1) Considerando a execução do código abaixo, indique a alternativa correta e justifique sua resposta.**
```javascript
console.log(x);
var x = 5;
console.log(y);
let y = 10;
```

CORRETA É: A

Justificativa: Quando setamos x usando var, garantimos que ela terá um espaço indexado na memória. Porém, quando usamos console.log() antes de atribuir um valor a x, o output será undefined. O let é uma variável de uso local e alocada dinamicamente, então quando tentamos acessar y pelo console.log(), teremos um erro.

a) A saída será undefined seguido de erro 

b) A saída será 5 seguido de 10

c) A saída será undefined seguido de undefined

d) A saída será erro em ambas as linhas que utilizam console.log


**2) O seguinte código JavaScript tem um erro que impede sua execução correta. Analise e indique a opção que melhor corrige o problema. Justifique sua resposta.**

```javascript
function soma(a, b) {
    if (a || b === 0) {
        return "Erro: número inválido";
    }
    return a + b;
}
console.log(soma(2, 0));
```

CORRETA É:D

Justificativa: O zero é o elemento neutro da adição e da subtração, portanto, somar ou não por zero não afeta o resultado final.

a) Substituir if (a || b === 0) por if (a === 0 || b === 0)

b) Substituir if (a || b === 0) por if (a === 0 && b === 0)

c) Substituir if (a || b === 0) por if (a && b === 0)

d) Remover completamente a verificação if (a || b === 0)

______
**3) Ao executar esse código, qual será a saída no console? Indique a alternativa correta e justifique sua resposta.**
```javascript
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
```
Correta é: B 
A cláusula de eletrônicos no switch não tem um break, fazendo preço ser igual a próxima linha (200). 

a) O código imprime 1000.

b) O código imprime 200.

c) O código imprime 50.

d) O código gera um erro.

______
**4) Ao executar esse código, qual será a saída no console? Indique a alternativa correta e justifique sua resposta.**


```javascript
let numeros = [1, 2, 3, 4, 5];

let resultado = numeros.map(x => x * 2).filter(x => x > 5).reduce((a, b) => a + b, 0);

console.log(resultado);
```

Correta é: D

Justificativa: Aplicando as funções ao input numeros, temos a seguinte progressão:

Inicialmente, a array é [1,2,3,4,5]
Aplicando a primeira função, iteramos por todos os itens e os multiplicamos por 2. Logo, temos como output [2,4,6,8,10].
Em seguida, filtramos os itens menores que 5 e somamos os itens remanescentes. [6,8,10] que somados dão 24.
a) 0

b) 6

c) 18

d) 24
______
**5) Qual será o conteúdo do array lista após a execução do código? Indique a alternativa correta e justifique sua resposta.**

```javascript
let lista = ["banana", "maçã", "uva", "laranja"];
lista.splice(1, 2, "abacaxi", "manga");
console.log(lista);
```
CORRETA É: C. 
Justificativa: O método .splice() vai substituir os valores dos indexes 1 e 2 por "abacaxi" e "manga" respectivamente.

a) ["banana", "maçã", "uva", "abacaxi", "manga", "laranja"]

b) ["banana", "abacaxi", "manga"]

c) ["banana", "abacaxi", "manga", "laranja"]

d) ["banana", "maçã", "uva", "abacaxi", "manga"]
______
**6) Abaixo há duas afirmações sobre herança em JavaScript. Indique a alternativa correta e justifique sua resposta**

I. A herança é utilizada para compartilhar métodos e propriedades entre classes em JavaScript, permitindo que uma classe herde os métodos de outra sem a necessidade de repetir código.  
II. Em JavaScript, a herança é implementada através da palavra-chave `extends`.

CORRETA É: B
As duas afirmações são verdadeiras independentes uma da outra. 

a) As duas afirmações são verdadeiras, e a segunda justifica a primeira.

b) As duas afirmações são verdadeiras, mas a segunda não justifica a primeira.

c) A primeira afirmação é verdadeira, e a segunda é falsa.

d) A primeira afirmação é falsa, e a segunda é verdadeira.
______
**7) Dado o seguinte código. Indique a alternativa correta e justifique sua resposta.**

```javascript
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
```


I) A classe Funcionario herda de Pessoa e pode acessar os atributos nome e idade diretamente.  
II) O método `apresentar()` da classe Funcionario sobrepõe o método `apresentar()` da classe Pessoa, mas chama o método da classe pai usando `super`.  
III) O código não funciona corretamente, pois Funcionario não pode herdar de Pessoa como uma classe, já que o JavaScript não suporta herança de classes.

Quais das seguintes afirmações são verdadeiras sobre o código acima?

CORRETA É: A

Justificativa: 
I-Verdadeira. Se os campos forem públicos, a classe Funcionário consegue acessar os valores.
II-Verdadeira. Quando setamos um método homônimo na classe filha, o método do parent é sobrescrito. Podemos ainda acessá-lo com super. 
III-Falso. JavaScript suporta herança de classes, logo, a afirmação é incorreta

a) I e II são verdadeiras.

b) I, II e III são verdadeiras.

c) Apenas II é verdadeira.

d) Apenas I é verdadeira.

______

**8) Analise as afirmações a seguir. Indique a alternativa correta e justifique sua resposta.**

**Asserção:** O conceito de polimorfismo em Programação Orientada a Objetos permite que objetos de diferentes tipos respondam à mesma mensagem de maneiras diferentes.  
**Razão:** Em JavaScript, o polimorfismo pode ser implementado utilizando o método de sobrecarga de métodos em uma classe.

CORRETA É: B

A asserção está correta: O conceito de polimorfismo em Programação Orientada a Objetos (POO) realmente permite que objetos de diferentes tipos respondam à mesma mensagem (método) de maneiras diferentes. Isso pode ser alcançado por meio de polimorfismo de subtipo (quando classes derivadas sobrescrevem métodos da classe base) ou polimorfismo de interfaces (quando classes implementam a mesma interface com comportamentos diferentes).

A razão está incorreta: Em JavaScript, não existe suporte direto para sobrecarga de métodos como em linguagens como Java ou C++. JavaScript permite sobrescrita de métodos (um método de uma subclasse pode substituir um método da superclasse), mas não suporta sobrecarga baseada em assinaturas de métodos (ou seja, métodos com o mesmo nome, mas parâmetros diferentes).


a) A asserção é falsa e a razão é verdadeira.

b) A asserção é verdadeira e a razão é falsa.

c) A asserção é verdadeira e a razão é verdadeira, mas a razão não explica a asserção.

d) A asserção é verdadeira e a razão é verdadeira, e a razão explica a asserção.

______

# Questões dissertativas
9) O seguinte código deve retornar a soma do dobro dos números de um array, mas contém erros. Identifique os problema e corrija o código para que funcione corretamente. Adicione comentários ao código explicado sua solução para cada problema.

```javascript
function somaArray(numeros) {

    for (i = 0; i < numeros.size; i++) {
        soma = 2*numeros[i];
    }
    return soma;
}
console.log(somaArray([1, 2, 3, 4]));
```
RESPOSTA:
```javascript
function somaArray(numeros) {
    //Setamos a variável soma
    let soma = 0;

    //Também corrigimos o .size para .length
    for (i = 0; i < numeros.length; i++) {
        //Trocamos = 2*numeros[i] para += 2*numeros[i] a fim de somar ao invés de igualar o valor
        soma += 2*numeros[i];
    }
    return soma;
}

console.log(somaArray([1, 2, 3, 4]));
```
______
10) Crie um exemplo prático no qual você tenha duas classes:

- Uma classe `Produto` com atributos `nome` e `preco`, e um método `calcularDesconto()` que aplica um desconto fixo de 10% no preço do produto.
- Uma classe `Livro` que herda de `Produto` e modifica o método `calcularDesconto()`, aplicando um desconto de 20% no preço dos livros.

Explique como funciona a herança nesse contexto e como você implementaria a modificação do método na classe `Livro`.

``` javascript
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
```