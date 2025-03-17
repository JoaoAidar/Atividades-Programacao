/*
//EX01
let p = 10;
let q = 3;
let r = 6;

let resultado = (p % q === 1) && (r * 2 > p) || (q + r < p);
console.log(resultado);

const valores = [3, 6, 9, 12, 15];
let produto = 1;

for (let j = 0; j < valores.length; j++) {
  produto *= valores[j];
}

console.log("O produto dos valores é:", produto);
*/
/*
function analisarCredito1() {
    var compras = [2500, 1200, 800, 100];
    var totalCompras = compras[0];
    var limite = 5000;
    var status = 'aprovado';
    var saldoDisponivel = 0;
    var i = 1;

    do {
        totalCompras += compras[i];
        i++;
    } while (limite >= totalCompras && i < compras.length);

    saldoDisponivel = limite - totalCompras;

    if (saldoDisponivel < 0) {
        status = 'negado';
    }
    console.log(`01: Seu crédito foi ${status}. Saldo disponível: ${saldoDisponivel}.`);
}

function analisarCredito2() {
    var compras = [2500, 1200, 800, 100];
    var totalCompras = compras[0];
    var limite = 5000;
    var status = 'aprovado';
    var saldoDisponivel = 0;
    var i = 1;

    while (limite >= totalCompras && i < compras.length) {
        totalCompras += compras[i];
        i++;
    }

    saldoDisponivel = limite - totalCompras;

    if (saldoDisponivel < 0) {
        status = 'negado';
    }
    console.log(`02: Seu crédito foi ${status}. Saldo disponível: ${saldoDisponivel}.`);
}
analisarCredito1();
analisarCredito2();

*/
/*
var energiaDisponivel = 1200;
var bateriaExtra = 400;
var consumoDispositivos = [300, 600, 500, 200, 400];

for (var i = 0; i < consumoDispositivos.length; i++) {
    var consumo = consumoDispositivos[i];

    if (consumo <= energiaDisponivel) {
        console.log("Dispositivo " + (i+1) + " ligado. Energia restante: " + (energiaDisponivel - consumo));
        energiaDisponivel -= consumo;
    } else if (consumo <= energiaDisponivel + bateriaExtra) {
        console.log("Dispositivo " + (i+1) + " ligado com bateria extra. Energia restante: " + ((energiaDisponivel + bateriaExtra) - consumo));
        energiaDisponivel = 0;
        bateriaExtra -= (consumo - energiaDisponivel);
    } else {
        console.log("Dispositivo " + (i+1) + " não pode ser ligado. Energia insuficiente.");
    }
}
*/

/*
function CalcularSomaDeMatrizes(matrizA, matrizB){
    let mA = matrizA;
    let mB = matrizB;
   
    if(matrizA.length != matrizB.length) {
    console.log("As matrizes tem tamanho diferente,cancelando operação");
    return;
    } else {
        let linhas = mA.length;
        let colunas = mA[0].length;
        let mC = Array.from({length: colunas}, () => new Array(linhas));
        for(let i = 0; i < linhas; i++){
            for(let j = 0; j < colunas; j++){
                mC[i][j] = mA[i][j] + mB[i][j];
            }
        }
        return mC;
    }
}

//EXEMPLO DE USO
let a = 
[[2,3,4],
[2,3,4],
[2,3,4]];

let b = [[3,4,5],
[3,4,5],
[3,4,5]];
console.log(CalcularSomaDeMatrizes(a,b));

*/

class Veiculo {
    constructor(modelo, ano){
        this.quilometragem = 1000;
        this.ano = ano;
        this.modelo = modelo;
    }
    
    CalcularConsumo(){
        return (quilometragem/kmPorLitro)
    }
}

class Carro extends Veiculo {
    constructor(modelo,ano, eficiência){
    super(modelo,ano);
    this.quilometragem = 1000;
    this.eficiência = eficiência;
    this.kmPorLitro_Fabrica = 13
    }
    
    
    CalcularConsumo(){
        console.log(this.quilometragem/this.kmPorLitro_Fabrica*this.eficiência);
    }
}

class Moto extends Veiculo {
    constructor(modelo,ano, eficiência){
        super(modelo,ano);
        this.quilometragem = 1000;
        this.eficiência = eficiência;
        this.kmPorLitro_Fabrica = 17;
        }
        
        
        CalcularConsumo(){
            console.log(this.quilometragem/this.kmPorLitro_Fabrica*this.eficiência);
        }
}

let carro = new Carro("modelo genérico", "ano", .8);
carro.CalcularConsumo();
let moto = new Moto('modelo genérico', 'ano', .8);
moto.CalcularConsumo();